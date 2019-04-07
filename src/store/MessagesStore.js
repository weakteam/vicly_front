import {BACKEND_URL} from "../common";
import {autorun, observable, reaction, runInAction} from "mobx";

export default class MessagesStore {
    @observable groups = [];
    @observable userChats = [];
    @observable groupChats = [];
    @observable fetchFail = false;
    @observable currentChatId = null;
    err_message = "";
    @observable messagesLoading = false;

    constructor(RootStore) {
        this.accountStore = RootStore.accountStore;
        autorun(() => {
            this.fetchChats();
        });
        reaction(
            () => this.currentChatId,
            (currentChatId) => {
                if (currentChatId) {
                    this.loadMessagesByChatId(this.currentChatId, 'user');
                    const chat = this.userChats.find(elem => elem.chatId === currentChatId);
                    chat.messages.forEach((elem) => {
                        if (elem.from !== this.accountStore.userId) {
                            if (!elem.timestamp_delivery) {
                                this.deliveryMessage(elem.id, 1, 'user');
                            }
                            if (!elem.timestamp_read) {
                                this.readMessage(elem.id, 'user');

                            }
                        }
                    });
                }
            },
            {fireImmediately: true}
        );
    };

    async fetchChats() {
        try {
            const userListResponse = await fetch(BACKEND_URL + "/user/list", {
                method: 'GET',
                headers: {
                    'Authorization': this.accountStore.token,
                }
            });
            // TODO fetching group chats
            // const groupChatsResponse =  await fetch(api + "/user/list", {
            //     method: 'GET',
            //     headers: {
            //         'Authorization': AccountStore.getToken(),
            //     }
            // });
            if (!userListResponse.ok) {
                alert("fetch chats failed");
                runInAction("Failed fetch users info", () => {
                    this.fetchFail = true;
                    this.err_message = userListResponse.error();
                });
            }
            const content = await userListResponse.json();
            runInAction("Update users info", () => {
                content.with_group
                    .flatMap((elem => elem.users))
                    .forEach(chat => {
                        this.createChatObject(chat.user, chat.user.id, "user", chat.unread, chat.last);
                        // this.updateChatInfo(chat.user,chat.user.id, "user", chat.unread, chat.last);
                    });
                this.groupChats = content.with_group.flatMap((elem => elem.group_chats));
                this.groups = content.with_group.map(elem => {
                    return elem.group;
                });
            });
        } catch (err) {
            console.log(err);
            runInAction("Failed fetch users info", () => {
                this.fetchFail = true;
                this.err_message = err;
            });
        }
    }


    async loadMessagesByChatId(chatId, chatType) {
        // this.messagesLoading = true;
        const chat = this.findChat(chatId, chatType);
        const lol = 5;
        if (chat && chat.messages && chat.messages.length) {
            console.log("Chatid " + chatId + " already loaded! need to resolve only inreaded messages");
        } else {
            await this.getAllMessagesByChatId(chatId, chatType)
        }
    }

    //@action
    //TO ONLY WS USING
    addMessageToEnd(message) {
        //TODO for websocket push
        const myselfUserId = parseInt(this.accountStore.userId, 10);
        // TODO Its fucking bullshit !!! NEED WORK ON BACKEND!!!
        const idChat = message.chat.user_ids.filter(elem=>elem!==this.accountStore.userId)[0];
        const chat = this.findChat(idChat, message.chat.chat_type);
        if (chat) {
            if (chat.chat_type === 'user') {
                if (this.currentChatId == message.from) {
                    chat.messages.push(message);
                    chat.last = message;
                    this.deliveryMessage(message.id, message.chat.id, 'user');
                    this.readMessage(message.id, 'user');
                } else {
                    chat.messages.push(message);
                    chat.unread++;
                    chat.last = message;
                    this.deliveryMessage(message.id, message.chat.id, 'user');
                }
            }
        } else {
            this.updateChatInfo(message.chat.id, message.chat.chat_type, message.chat.unread, message);
        }
    }

    async getAllMessagesByChatId(chatId, chat_type) {
        try {
            const response = await fetch(BACKEND_URL + `/message/chat/${chatId}/user/0`, {
                method: 'GET',
                headers: {
                    'Authorization': this.accountStore.token,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                alert("fetch messages failed")
            }
            let messages = await response.json();
            let countUnreaded = 0;
            let lastUnread = null;
            messages = messages.sort((a, b) => a.timestamp_post.timestamp - b.timestamp_post.timestamp);
            messages.forEach(message => {
                if (!message.timestamp_read && this.accountStore.userId == message.from) {
                    countUnreaded++;
                    lastUnread = message;
                }
            });
            runInAction("getAllMessagesById", () => {
                this.updateChatInfo(chatId, chat_type, countUnreaded, lastUnread, messages);
            })
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    //IT'S MY NAMING STYLE !!!!
    //@action("updateChatInfo")
    createChatObject(userObj, chatId, chatType, countUnread, lastUnread, newMessages) {
        const chat = this.findChat(chatId, chatType);
        if (!chat) {
            const newChat = {
                chatId: chatId,
                chat_type: chatType,
                last: lastUnread,
                unread: countUnread,
                messages: newMessages || [],
                user: userObj
            };
            this.userChats.push(newChat);
        }
    }

    updateChatInfo(chatId, chatType, countUnread, lastUnread, newMessages) {
        const chat = this.findChat(chatId, chatType);
        if (chat) {
            chat.messages = newMessages || chat.messages;
            chat.last = lastUnread;
            chat.unread = countUnread;
        }
    }


    async postMessage(message, toId) {
        try {
            const response = await fetch(BACKEND_URL + "/message/post", {
                method: 'POST',
                headers: {
                    'Authorization': this.accountStore.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": toId,
                    "type": "user",
                    "message": message
                })
            });
            if (!response.ok) {
                alert("post message failed")
            }


        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    async deliveryMessage(messageId, chatId, chatType) {
        try {
            const response = await fetch(BACKEND_URL + "/message/delivery", {
                method: 'POST',
                headers: {
                    'Authorization': this.accountStore.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": messageId,
                    "chat_id": chatId,
                    "chat_type": 'user'
                })
            });
            if (!response.ok) {
                console.log("mark delivered message failed")
            }
            const message = this.findMessage(messageId, chatId, chatType);
            // message.
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    async readMessage(messageId, chatType) {
        try {
            const response = await fetch(BACKEND_URL + "/message/read", {
                method: 'POST',
                headers: {
                    'Authorization': this.accountStore.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": messageId,
                    "chat_type": 'user'
                })
            });
            if (!response.ok) {
                console.log("mark delivered message failed")
            }

        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    findChat(chatId, chatType) {
        if (chatType === "user") {
            return this.userChats.find(elem => elem.user.id === chatId);
        } else {
            console.log("Not ready yet!");
        }
    }

    findMessage(messageId, chatId, chatType) {
        const chat = this.findChat(chatId, chatType);
        chat.messages.find(elem => elem.id === messageId);
    }

    getCurrentChat() {
        return this.findChat(this.currentChatId, "user");
    }
}
