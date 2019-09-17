import {observable, runInAction} from "mobx";
import Message from "./Message";
import Chat from "./Chat";
import rootStore from "../RootStore";
import {BACKEND_URL} from "../../common";

export default class UserChat extends Chat {
    user = null;

    constructor(chatObject, user) {
        super(chatObject, "user", user);
        if (chatObject.fake) {

            this.chatId = chatObject.chatId;
            this.fake = true;
        }
        this.chatId = chatObject.user_chat ? chatObject.user_chat.id : null;
        this.userIds = chatObject.user_chat ? chatObject.user_chat.user_ids : null;
        // usersNew must be instance of User
        this.user = user;
        this.groupId = chatObject.user && chatObject.user.group_id;
    }

    updateFields(chat) {
        this.user = chat.user;
        this.chatId = chat.chatId;
        this.groupId = chat.groupId;
        this.chatType = chat.chatType;
        this.userIds = chat.userIds;
        this.unread = chat.unread;
        this.messages = chat.messages;
        this.last = chat.last;
        this.prevMessageLength = chat.prevMessageLength;
        this.direction = chat.direction;
        this.page = chat.page;
        this.selected = chat.selected;
        this.fetching = chat.fetching;
        this.wasFetched = chat.wasFetched;
        this.lastFetchedPage = chat.lastFetchedPage;
        this.lastFetchedCount = chat.lastFetchedCount;
        this.fake = undefined;
    }

    async postMessage(message, attachments = []) {
        try {
            const response = await rootStore.api.postMessageToUser(message, attachments, this.user.id);
            if (!response.ok) {
                alert("post message failed")
            }
        } catch (err) {
            console.log(err);
            // return dispatch(setChatList(err))
        }
    }

    async loadMessages(page) {
        super.loadMessages();
        try {
            const response = await rootStore.api.getUserChatMessages(this.user.id, page);
            if (!response.ok) {
                alert("fetch messages failed")
            }
            let messages = await response.json();
            runInAction("getAllMessagesById", () => {
                this.fetching = false;
                this.wasFetched = true;
                this.lastFetchedPage = page;
                this.lastFetchedCount = messages.length;
                this.prependChat(messages);
            });
        } catch (err) {
            this.fetching = false;
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

    genereteChatUrl() {
        return "/home/chat/user/" + this.user.id;
    }

    getChatEventName() {
        return this.user.first_name + " " + this.user.last_name;
    }

    getAvatarSrc() {
        return rootStore.imageService.images.find(elem => elem.userId === this.user.id);
    }

    processNewMessage(message) {
        if (message.from !== rootStore.accountStore.userId && message.from === this.user.id === rootStore.messagesStore.currentChatId) {
            rootStore.toastService.toastNewMessage(this.getChatEventName(), message.message, this.genereteChatUrl(), this.getAvatarSrc());
        }
    }

}