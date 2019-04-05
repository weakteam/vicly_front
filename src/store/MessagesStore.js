import {BACKEND_URL} from "../common";
import {observable, runInAction} from "mobx";

export default class MessagesStore {
    @observable messages = [];

    @observable groups = [];
    @observable userChats = [];
    @observable groupChats = [];
    @observable fetchFail = false;
    @observable currentChatId = null;
    err_message = "";

    constructor(AccountStore) {
        this.accountStore = AccountStore;
    }

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
                this.userChats = content.with_group.flatMap((elem => elem.users));
                this.userChats = this.userChats.map(chat => {
                    this.createOrUpdateChatMessagesObjByUnreadedMessages(chat.user.id, "user", chat.unread, chat.last);
                    chat.chat_type = "user";
                    return chat;
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



    loadMessagesByChatId(chatId, chatType) {
        const messages = this.messages.find((elem) => elem.chatId === chatId);
        if (messages && messages.messages.length) {
            console.log("Chatid " + chatId + " already loaded! need to resolve only inreaded messages");
        } else {
            this.getAllMessagesByChatId(chatId, chatType)
        }
    }

    //@action
    //TO ONLY WS USING
    addMessageToEnd(message) {
        //TODO for websocket push
        const myselfUserId = parseInt(this.accountStore.userId, 10);
        let messages = this.messages.find((elem) => {
            if (message.chat.chat_type === 'user') {
                return message.chat.user_ids.includes(elem.chatId) && message.chat.user_ids.includes(myselfUserId);
            } else {
                return elem.chatId === message.chat.id;
            }
        });
        if (messages) {
            // TODO NEED FUCKEN REFACTORIN THIS SHIT
            if (message.chat.chat_type === 'user') {
                if (this.chatsStore.currentChatId==message.from) {
                    messages.messages.push(message);
                    this.deliveryMessage(message.id, message.chat.id, 'user');
                    this.readMessage(message.id, 'user');
                }else {
                    messages.messages.push(message);
                    messages.unread++;
                    messages.last = message;
                    this.deliveryMessage(message.id, message.chat.id, 'user');
                }
            }


        } else {
            // TODO WADAFUCK? i was drunked !?!?!
            this.createOrUpdateChatMessagesObjByUnreadedMessages(message.chat.id, message.chat.chat_type, message.chat.unread.last,[message]);
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
                if (!message.timestamp_read && this.accountStore.userId==message.from) {
                    countUnreaded++;
                    lastUnread = message;
                }
            });
            runInAction("getAllMessagesById", () => {
                // let chatMessages = {
                //     chatId: chatId,
                //     chat_type: chat_type,
                //     last: lastUnread,
                //     unread: countUnreaded,
                //     messages: messages
                // };
                // this.messages.push(chatMessages);
                this.createOrUpdateChatMessagesObjByUnreadedMessages(chatId, chat_type, countUnreaded, lastUnread, messages);
                //this.messages = messages;
            })
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    //IT'S MY NAMING STYLE !!!!
    //@action("createOrUpdateChatMessagesObjByUnreadedMessages")
    createOrUpdateChatMessagesObjByUnreadedMessages(chatId, chatType, countUnread, lastUnread, newMessages) {
        let messagesObj = this.messages.find(elem => elem.chatId == chatId);
        if (messagesObj) {
            messagesObj.messages = newMessages || messagesObj.messages;
            messagesObj.last = lastUnread;
            messagesObj.unread = countUnread;
        } else {
            let chatMessages = {
                chatId: chatId,
                chat_type: chatType,
                last: lastUnread,
                unread: countUnread,
                messages: newMessages || []
            };
            this.messages.push(chatMessages);
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
            //const content = await response.json();
            //console.log(content);
            // return dispatch(sendMessage({
            //     message: message,
            //     status: 'ok'
            //  }));
            // runInAction("postMessage", () => {
            //
            // })

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
            //const content = await response.json();
            //console.log(content);
            // return dispatch(sendMessage({
            //     message: message,
            //     status: 'ok'
            //  }));
            // runInAction("postMessage", () => {
            //
            // })

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
            //const content = await response.json();
            //console.log(content);
            // return dispatch(sendMessage({
            //     message: message,
            //     status: 'ok'
            //  }));
            // runInAction("postMessage", () => {
            //
            // })

        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }
}
