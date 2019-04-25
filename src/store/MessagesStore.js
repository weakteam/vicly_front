import {BACKEND_URL} from "../common";
import {autorun, observable, reaction, runInAction, when} from "mobx";
import toastService from "../services/toastService";

export default class MessagesStore {
    @observable groups = [];
    users = [];
    @observable userChats = [];
    @observable groupChats = [];
    @observable fetchFail = false;
    @observable currentChatId = null;
    isCurrentChatForUser = null;
    @observable chatsFetched = false;
    err_message = "";
    @observable messagesLoading = false;

    invalidate() {
        this.groupChats = [];
        this.groups = [];
        this.users = [];
        this.userChats = [];
        this.fetchFail = false;
        this.currentChatId = null;
        this.isCurrentChatForUser = null;
        this.chatsFetched = false;
        this.err_message = "";
        this.messagesLoading = false;
    }

    constructor(RootStore) {
        this.rootStore = RootStore;
        this.accountStore = RootStore.accountStore;
        autorun(
            () => {
                if (this.accountStore.token === null) {
                    this.invalidate();
                }
            }
        );
        autorun(
            () => {
                if (this.accountStore.token) {
                    this.fetchChats()
                }
            }
        );
        reaction(
            () => {
                if (this.chatsFetched) {
                    return this.currentChatId
                } else return null;

            },
            (currentChatId) => {
                if (currentChatId) {
                    // If opened user chat
                    if (this.isCurrentChatForUser === true) {
                        this.getAllUserChatMessages(currentChatId);
                    } else {
                        this.getAllGroupChatMessages(currentChatId);
                    }
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
            if (!userListResponse.ok) {
                alert("fetch chats failed");
                runInAction("Failed fetch users info", () => {
                    this.fetchFail = true;
                    this.err_message = userListResponse.error();
                });
            }
            const content = await userListResponse.json();
            runInAction("Update users info", () => {
                this.userChats = content.with_group
                    .flatMap((elem => elem.users))
                    .map(userObject => {
                        return {
                            chat_id: userObject.user_chat ? userObject.user_chat.id : null,
                            user_ids: userObject.user_chat ? userObject.user_chat.user_ids : null,
                            chat_type: "user",
                            user: userObject.user,
                            last: userObject.last,
                            unread: userObject.unread,
                            messages: []
                        }
                    });
                this.groupChats = content.with_group
                    .flatMap((elem => elem.group_chats))
                    .map(groupChatObject => {
                        groupChatObject.messages = [];
                        groupChatObject.name = groupChatObject.chat.name;
                        groupChatObject.chat_type = "group";
                        groupChatObject.user_ids = groupChatObject.chat.user_ids;
                        return groupChatObject;
                    });
                this.groups = content.with_group.map(elem => elem.group);
                this.users = content.with_group
                    .flatMap((elem => elem.users))
                    .map(elem => elem.user);
                this.chatsFetched = true;
            });
            this.userChats.map(userChat => {
                this.rootStore.imageService.getAvatarThumbnail(userChat.user.id);
            })
        } catch (err) {
            console.log(err);
            runInAction("Failed fetch users info", () => {
                this.fetchFail = true;
                this.err_message = err;
            });
        }
    }


    //@action
    //TO ONLY WS USING
    addMessageToEnd(message) {
        //TODO for websocket push
        const myselfUserId = this.accountStore.userId;
        // TODO Its fucking bullshit !!! NEED WORK ON BACKEND!!!
        let chat;
        if (message.chat.chat_type === "user") {
            let userId = message.chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
            chat = this.findUserChat(userId)
        } else {
            let chatId = message.chat.id;
            chat = this.findGroupChat(chatId);
        }
        // WE MUST ALWAYS FIND CHAT!!!
        if (chat) {
            if (this.accountStore.userId === message.from) {
                chat.messages.push(message);
                chat.last = message;
            } else {
                chat.messages.push(message);
                chat.last = message;
                this.deliveryMessage(message.id, message.chat.id);
                if ((this.isCurrentChatForUser && this.currentChatId === message.from) || (!this.isCurrentChatForUser && this.currentChatId === message.chat.id)) {
                    this.readMessage(message.id);
                } else {
                    chat.unread++;
                    const title = message.chat.chat_type === "user" ? chat.user.first_name + " " + chat.user.last_name : chat.chat.name;
                    const url = message.chat.chat_type === "user" ? "/home/chat/user/" + chat.user.id : "/home/chat/group/" + chat.chat.id;
                    toastService.toastNewMessage(title, message, url);
                }
            }
        } else {
            // TODO FETCH CHAT INFO
        }
    }

    onDeliveryMessage(message_id, chat, message) {
        let innerChat = null;
        if (chat.chat_type === "user") {
            let userId = chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
            innerChat = this.findUserChat(userId)
        } else {
            innerChat = this.findGroupChat(chat.id);
        }
        if (innerChat) {
            let innerMessage = innerChat.messages.find(mess => mess.id === message_id);
            innerMessage.timestamp_delivery = message.timestamp_delivery;
        }
    }

    onReadMessage(message_id, chat, message) {
        let innerChat = null;
        if (chat.chat_type === "user") {
            let userId = chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
            innerChat = this.findUserChat(userId)
        } else {
            innerChat = this.findGroupChat(chat.id);
        }
        if (innerChat) {
            let innerMessage = innerChat.messages.find(mess => mess.id === message_id);
            innerMessage.timestamp_delivery = message.timestamp_delivery;
            innerMessage.timestamp_read = message.timestamp_read;
            innerChat.unread--;
        }
    }


    async getAllGroupChatMessages(chatId) {
        //TODO messages loading
        // this.messagesLoading = true;
        // this.messagesLoading = false;
        try {
            const response = await fetch(BACKEND_URL + `/message/chat/group/${chatId}/0`, {
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
            runInAction("getAllMessagesById", () => {
                this.updateGroupChat(chatId, messages);
            })
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    async getAllUserChatMessages(userId) {
        //TODO messages loading
        // this.messagesLoading = true;
        // this.messagesLoading = false;
        try {
            const response = await fetch(BACKEND_URL + `/message/chat/user/${userId}/0`, {
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
            runInAction("getAllMessagesById", () => {
                this.updateUserChat(userId, messages);
            })
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    updateGroupChat(chatId, newMessages) {
        const chat = this.findGroupChat(chatId);
        chat.messages = newMessages || chat.messages;
        chat.last = chat.messages[chat.messages.length - 1];
        let unread = 0;
        for (let message of chat.messages) {
            if (message.from !== this.accountStore.userId && !message.timestamp_read) {
                unread++;
            }
        }
        chat.unread = unread;
    }

    updateUserChat(userId, newMessages) {
        const chat = this.findUserChat(userId);
        chat.messages = newMessages || chat.messages;
        chat.last = chat.messages[chat.messages.length - 1];
        let unread = 0;
        for (let message of chat.messages) {
            if (message.from !== this.accountStore.userId && !message.timestamp_read) {
                unread++;
            }
        }
        chat.unread = unread;
    }

    async postMessageInGroupChat(message, chatId) {
        try {
            const response = await fetch(BACKEND_URL + "/message/postnewchat", {
                method: 'POST',
                headers: {
                    'Authorization': this.accountStore.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "chat_id": chatId,
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

    async postMessageToUser(message, userId) {
        try {
            const response = await fetch(BACKEND_URL + "/message/postnewuser", {
                method: 'POST',
                headers: {
                    'Authorization': this.accountStore.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "chat_id": userId,
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

    async deliveryMessage(messageId, chatId) {
        try {
            const response = await fetch(BACKEND_URL + "/message/deliverynew", {
                method: 'POST',
                headers: {
                    'Authorization': this.accountStore.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message_id": messageId
                })
            });
            if (!response.ok) {
                console.log("mark delivered message failed")
            }
            // const message = this.findMessage(messageId, chatId);
            // message.
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    async readMessage(messageId) {
        try {
            const response = await fetch(BACKEND_URL + "/message/readnew", {
                method: 'POST',
                headers: {
                    'Authorization': this.accountStore.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message_id": messageId
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


    findGroupChat(chatId) {
        return this.groupChats.find(elem => elem.chat_id === chatId);
    }

    findUserChat(userId) {
        return this.userChats.find(elem => elem.user.id === userId);
    }

    findMessage(messageId, chatId, chatType) {
        const chat = this.findChat(chatId, chatType);
        chat.messages.find(elem => elem.id === messageId);
    }

    findUserById(userId) {
        const userChat = this.userChats.find(
            userChat => userChat.user.id === userId
        );
        return userChat ? userChat.user : null;
    }

    getCurrentChat() {
        return this.isCurrentChatForUser ? this.findUserChat(this.currentChatId) : this.findGroupChat(this.currentChatId);
    }

    chatChanged(chatType, chatId) {
        let innerChat = null;
        if (chatType === "user") {
            innerChat = this.findUserChat(chatId)
        } else {
            innerChat = this.findGroupChat(chatId);
        }
        innerChat.messages.forEach(message => {
            if (!message.timestamp_read) {
                this.readMessage(message.id);
            }
        })
    }
}
