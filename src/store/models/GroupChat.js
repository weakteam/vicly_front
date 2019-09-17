import {observable, runInAction} from "mobx";
import Message from "./Message";
import Chat from "./Chat";
import rootStore from "../RootStore";


export default class GroupChat extends Chat {

    title = "";
    ownerId = null;
    archive = null;
    purpose = "";
    // Array of User objects
    users = [];

    constructor(chatObject, users) {
        super(chatObject, "group", users);
        // usersNew must be ARRAY!!!! instances of User
        this.users = users;
        this.chatId = chatObject.chat.id;
        this.groupId = chatObject.chat.group_id;
        this.user_ids = chatObject.chat.user_ids;

        this.title = chatObject.chat.name;
        this.ownerId = chatObject.chat.owner;
        this.purpose = chatObject.chat.purpose;
        this.archive = chatObject.chat.archive;
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
        super.loadMessages();
        try {
            const response = await rootStore.api.getGroupChatMessages(this.chatId, page);
            if (!response.ok) {
                alert("fetch messages failed")
            }
            let messages = await response.json();
            runInAction("getAllMessagesById1", () => {
                this.fetching = false;
                this.wasFetched = true;
                this.lastFetchedPage = page;
                this.lastFetchedCount = messages.length;
                this.prependChat(messages);
            })
        } catch (err) {
            this.fetching = false;
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    async loadMessagesAfter(messageId) {
        try {
            const response = await rootStore.api.getGroupChatMessagesAfter(this.chatId, messageId);
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

    genereteChatUrl() {
        return "/home/chat/group/" + this.chatId;
    }

    getChatEventName() {
        return this.title;
    }

    getAvatarSrc() {
        return null;
    }

}