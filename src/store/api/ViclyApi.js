import {BACKEND_URL} from "../../common";
import {autorun, reaction} from "mobx";

export default class ViclyApi {

    accountStore = null;

    constructor(RootStore) {
        this.accountStore = RootStore.accountStore;
    };

    async fetchChats() {
        return await fetch(BACKEND_URL + "/user/list", {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
            }
        });
    }


    async getGroupChatMessagesAfter(chatId, messageId) {
        return await fetch(BACKEND_URL + `/message/chat/group/from/${chatId}/${messageId}`, {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            }
        });
    }

    async getUserChatMessagesAfter(userId, messageId) {
        return await fetch(BACKEND_URL + `/message/chat/user/from/${userId}/${messageId}`, {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            }
        });
    }

    async getGroupChatMessages(chatId, page) {
        return await fetch(BACKEND_URL + `/message/chat/group/${chatId}/${page}`, {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            }
        });
    }

    async getUserChatMessages(userId, page) {
        return await fetch(BACKEND_URL + `/message/chat/user/${userId}/${page}`, {
            method: 'GET',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            }
        });
    }

    async postMessageInGroupChat(message, attachments, chatId) {
        return await fetch(BACKEND_URL + "/message/postnewchat", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "chat_id": chatId,
                "message": message,
                "attachments": attachments
            })
        });
    }

    async postMessageToUser(message, attachments, userId) {
        return await fetch(BACKEND_URL + "/message/postnewuser", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "chat_id": userId,
                "message": message,
                "attachments": attachments
            })
        });
    }

    async deliveryMessage(messageId) {
        return await fetch(BACKEND_URL + "/message/deliverynew", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "message_id": messageId
            })
        });
    }

    async readMessage(messageId) {
        return await fetch(BACKEND_URL + "/message/readnew", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "message_id": messageId
            })
        });
    }

    async messageDeleteSoft(messageId) {
        return await fetch(BACKEND_URL + "/message/delete", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "mode": 1,
                "id": messageId
            })
        });
    }

    async messageChange(messageId, newText) {
        return await fetch(BACKEND_URL + "/message/change", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "message": newText,
                "id": messageId
            })
        });
    }
}