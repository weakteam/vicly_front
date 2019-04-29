import {observable, runInAction} from "mobx";
import Message from "./Message";
import Chat from "./Chat";
import rootStore from "../RootStore";
import {BACKEND_URL} from "../../common";


export default class UserChat extends Chat {
    user = null;

    constructor(chatObject, user) {
        super(chatObject, "user", user);
        this.chatId = chatObject.user_chat ? chatObject.user_chat.id : null;
        this.userIds = chatObject.user_chat ? chatObject.user_chat.user_ids : null;
        // usersNew must be instance of User
        this.user = user;
        this.groupId = chatObject.user.group_id;
    }

    async postMessage(message) {
        try {
            const response = await rootStore.api.postMessageToUser(message, this.user.id);
            if (!response.ok) {
                alert("post message failed")
            }
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    async loadMessages(page) {
        try {
            const response = this.rootStore.api.getUserChatMessages(this.user.id, page);
            if (!response.ok) {
                alert("fetch messages failed")
            }
            let messages = await response.json();
            runInAction("getAllMessagesById", () => {
                this.updateChat(messages);
            });
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    async loadMessagesAfter(messageId) {
        try {
            const response = await rootStore.api.getUserChatMessagesAfter(this.user.id, messageId);
            if (!response.ok) {
                alert("fetch messages failed")
            }
            let messages = await response.json();
            runInAction("getAllMessagesById", () => {
                this.updateChat(messages);
            })
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

}