import {observable} from "mobx";
import Message from "./Message";
import Chat from "./Chat";

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
}