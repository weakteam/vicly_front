import {observable} from "mobx";
import Message from "./Message";

export default class Chat {
    chatId = null;
    groupId = null;
    // user or group
    chatType = null;
    userIds = null;
    last = null;
    unread = 0;
    // Array of Message objects
    messages = [];
    page = 0;

    constructor(chatObject, chatType, usersNew) {
        this.chatType = chatType;
        // Messages objects init
        this.last = chatObject.last ? new Message(chatObject.last) : null;
        if (chatObject.messages && chatObject.messages.length) {
            this.messages = chatObject.messages.map(message => new Message(message))
        }
        this.unread = chatObject.unread;
    }
}