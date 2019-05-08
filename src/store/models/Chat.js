import {observable} from "mobx";
import Message from "./Message";
import toastService from "../../services/toastService";
import rootStore from "../RootStore";
import {BACKEND_URL} from "../../common";

export default class Chat {
    chatId = null;
    groupId = null;
    // user or group
    chatType = null;
    userIds = null;
    @observable last = null;
    unread = 0;
    // Array of Message objects
    @observable messages = [];
    page = 0;

    //common properties
    selected = false;

    constructor(chatObject, chatType, usersNew) {
        this.chatType = chatType;
        // Messages objects init
        this.last = chatObject.last ? new Message(chatObject.last) : null;
        if (chatObject.messages && chatObject.messages.length) {
            this.messages = chatObject.messages.map(message => new Message(message))
        }
        this.unread = chatObject.unread;
    }

    setSelected(isSelected) {
        this.selected = isSelected;
    }

    setLastMessage(lastMessage) {
        this.last = lastMessage;
    }

    // message is Message model instance
    addMessageToEnd(message) {
        const myselfUserId = rootStore.accountStore.userId;
        // WE MUST ALWAYS FIND CHAT!!!
        if (rootStore.accountStore.userId === message.from) {
            this.messages.push(message);
            this.last = message;
        } else {
            this.messages.push(message);
            this.last = message;
            message.deliveryMessage();
            this.addMessageToEndPost(message);
        }
    }

    addMessageToEndPost(message){
        //ABSTRACT
    }

    updateChat(newMessages) {
        newMessages = newMessages.map(message => new Message(message));
        this.messages = this.messages.concat(newMessages).sort((a, b) => a.timestamp_post.timestamp - b.timestamp_post.timestamp);
        this.last = this.messages[this.messages.length - 1];
        let unread = 0;
        for (let message of this.messages) {
            if (message.from !== rootStore.accountStore.userId && !message.timestamp_read) {
                this.unread++;
            }
        }
        this.unread = unread;
    }

    prependChat(newMessages) {
        newMessages = newMessages.map(message => new Message(message));
        this.messages = this.messages.unshift(...newMessages);//this.messages.concat(newMessages).sort((a, b) => a.timestamp_post.timestamp - b.timestamp_post.timestamp);
    }

    postMessage() {
        //ABSTRACT
    }

    loadMessages(page) {
        //ABSTRACT
    }

    loadMessagesAfter(messageId) {
        //ABSTRACT
    }

    nextPage() {
        rootStore.messagesStore.invalidateChatChanged();
        this.loadMessages(++this.page);
    }

    postMessage(message) {
        // ABSTRACT
    }

    messageDelivered(mesageId, messageObject) {
        let innerMessage = this.messages.find(mess => mess.id === mesageId);
        innerMessage.timestamp_delivery = messageObject.timestamp_delivery;
    }

    messageReaded(messageId, messageObject) {
        let innerMessage = this.messages.find(mess => mess.id === messageId);
        innerMessage.timestamp_delivery = messageObject.timestamp_delivery;
        innerMessage.timestamp_read = messageObject.timestamp_read;
        this.unread--;
    }

    messageChanged(messageObject) {

    }

}