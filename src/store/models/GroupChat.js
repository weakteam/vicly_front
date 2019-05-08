import {observable, runInAction} from "mobx";
import Message from "./Message";
import Chat from "./Chat";
import rootStore from "../RootStore";


export default class GroupChat extends Chat {

    title = "";
    ownerId = null;
    purpose = "";
    // Array of User objects
    users = [];

    constructor(chatObject, chatType, users) {
        super(chatObject, "group", users);
        // usersNew must be ARRAY!!!! instances of User
        this.users = users;
        this.chatId = chatObject.chat.id;
        this.groupId = chatObject.chat.group_id;
        this.user_ids = chatObject.chat.user_ids;

        this.title = chatObject.chat.name;
        this.ownerId = chatObject.chat.owner;
        this.purpose = chatObject.chat.purpose;

        // Messages objects init
        this.last = chatObject.last ? new Message(chatObject.last) : null;
        if (chatObject.messages && chatObject.messages.length) {
            this.messages = chatObject.messages.map(message => new Message(message))
        }
        this.unread = chatObject.unread;
    }

    async postMessage(message, attachments = []) {
        try {
            const response = await rootStore.api.postMessageInGroupChat(message, attachments, this.chatId);
            if (!response.ok) {
                alert("post message failed")
            }
        } catch (err) {
            console.log(err);
        }
    }

    async loadMessages(page) {
        try {
            const response = await rootStore.api.getGroupChatMessages(this.chatId, page);
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

    async loadMessagesAfter(messageId) {
        try {
            const response = await rootStore.api.getGroupChatMessages(this.chatId, messageId);
            if (!response.ok) {
                alert("fetch messages failed")
            }
            let messages = await response.json();
            runInAction("getAllMessagesById", () => {
                this.updateChat(messages);
            })
        } catch (err) {
            console.log(err);
        }
    }

    addMessageToEndPost(message) {
        if (rootStore.messagesStore.currentChatId === this.id) {
            message.readMessage();
        } else {
            this.unread++;
            const title = this.title;
            const url = "/home/chat/group/" + this.id;
            rootStore.toastService.toastNewMessage(title, message, url);
        }
    }

}