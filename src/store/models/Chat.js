import {computed, observable} from "mobx";
import Message from "./Message";
//import toastService from "../../services/toastService";
import rootStore from "../RootStore";
//import {BACKEND_URL} from "../../common";

export default class Chat {
    chatId = null;
    groupId = null;
    // user or group
    chatType = null;
    userIds = null;
    @observable last = null;
    @observable unread = 0;
    // Array of Message objects
    @observable.shallow messages = [];
    prevMessageLength = 0;
    direction = null;
    page = 0;
    @observable selected = false;
    @observable fetching = false;
    wasFetched = false;
    lastFetchedPage = null;
    lastFetchedCount = 0;

    constructor(chatObject, chatType, usersNew) {
        this.chatType = chatType;
        // Messages objects init
        this.last = chatObject.last ? new Message(chatObject.last) : null;
        if (chatObject.messages && chatObject.messages.length) {
            this.messages = chatObject.messages.map(message => new Message(message))
        }
        this.unread = chatObject.unread;
        // chatObject.userIds.map(userId => {
        //
        // });
    }

    // @computed messageLength() {
    //     return this.messages.length
    // }

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
        this.prevMessageLength = this.messages.length;
        this.direction = "append";
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

    genereteChatUrl() {
        //REALLY ABSTRACT
    }

    getAvatarSrc() {
        //REALLY ABSTRACT
    }

    getChatEventName() {
        //REALLY ABSTRACT
    }

    addMessageToEndPost(message) {
        //MUST BE CALLED IN CHILD!
        if (rootStore.messagesStore.currentChatId === this.id) {
            message.readMessage();
        } else {
            this.unread++;
            rootStore.toastService.toastNewMessage(this.getChatEventName(), message.message, this.genereteChatUrl(), this.getAvatarSrc());
        }
    }

    updateChat(newMessages) {
        if (newMessages.length > 0 && this.messages.find(elem => elem.id === newMessages[0].id) && this.messages.find(elem => elem.id === newMessages[newMessages.length - 1].id)) {
            return;
        }
        this.prevMessageLength = this.messages.length;
        this.direction = "append";
        newMessages = newMessages.map(message => new Message(message));
        this.messages = this.messages.concat(newMessages).sort((a, b) => a.timestamp_post.timestamp - b.timestamp_post.timestamp);
        this.last = this.messages[this.messages.length - 1];
        // FIXME we can't trust this shit! need to retrieve this info from backend
        // let unread = 0;
        // for (let message of newMessages) {
        //     if (message.from !== rootStore.accountStore.userId && !message.timestamp_read) {
        //         unread++;
        //     }
        // }
        // this.unread += unread;
    }

    prependChat(newMessages) {
        newMessages = newMessages.map(message => new Message(message));
        this.direction = "prepend";
        this.prevMessageLength = this.messages.length;
        this.messages = this.messages.unshift(...newMessages);//this.messages.concat(newMessages).sort((a, b) => a.timestamp_post.timestamp - b.timestamp_post.timestamp);
    }

    postMessage() {
        //ABSTRACT
    }

    loadMessages(page) {
        //ABSTRACT
        this.fetching = true;
    }

    loadMessagesAfter(messageId) {
        //ABSTRACT
        this.fetching = true;
    }

    nextPage() {
        rootStore.messagesStore.invalidateChatChanged();
        if (this.lastFetchedCount > 0) {
            this.loadMessages(++this.page);
        }
    }

    postMessage(message) {
        // ABSTRACT
    }

    messageDelivered(messageObject) {
        let innerMessage = this.messages.find(mess => mess.id === messageObject.id);
        if (innerMessage) {
            innerMessage.timestamp_delivery = messageObject.timestamp_delivery;
        }
    }

    messageReaded(messageObject) {
        let innerMessage = this.messages.find(mess => mess.id === messageObject.id);
        if (innerMessage) {
            innerMessage.timestamp_delivery = messageObject.timestamp_delivery;
            innerMessage.timestamp_read = messageObject.timestamp_read;
            if (messageObject.from !== rootStore.accountStore.userId) {
                this.unread--;
            }
        }
    }

    messageChanged(messageObject) {

    }

}