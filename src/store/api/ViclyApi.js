import {BACKEND_URL} from "../../common";
import {autorun, reaction} from "mobx";

export default class ViclyApi {

    accountStore = null;

    constructor(RootStore) {
        this.accountStore = RootStore.accountStore;
    };

    async fetchChats() {
        const userListResponse = await fetch(BACKEND_URL + "/user/list", {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
            }
        });
        if (!userListResponse.ok) {
            console.log("fetch chats failed");

        }
        return await userListResponse.json();
    }


    async getGroupChatMessagesAfter(chatId, messageId) {
        const response = await fetch(BACKEND_URL + `/message/chat/group/from/${chatId}/${messageId}`, {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log("fetch messages failed")
        }
        return await response.json();
    }

    async getUserChatMessagesAfter(userId, messageId) {
        const response = await fetch(BACKEND_URL + `/message/chat/user/from/${userId}/${messageId}`, {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log("fetch messages failed");
        }
        return await response.json();
    }

    async getGroupChatMessages(chatId, page) {
        const response = await fetch(BACKEND_URL + `/message/chat/group/${chatId}/${page}`, {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log("fetch group chat messages failed");
        }
        return await response.json();
    }

    async getUserChatMessages(userId, page) {
        const response = await fetch(BACKEND_URL + `/message/chat/user/${userId}/${page}`, {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log("fetch user chat messages failed");
        }
        return await response.json();
    }

    async postMessageInGroupChat(message, chatId) {
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
            console.log("post message failed");
        }
    }

    async postMessageToUser(message, userId) {
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
            console.log("post message failed");
        }
    }

    async deliveryMessage(messageId, chatId) {
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
    }

    async readMessage(messageId) {
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
    }
}