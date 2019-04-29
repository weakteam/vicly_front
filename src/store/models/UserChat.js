import {observable} from "mobx";
import Message from "./Message";
import Chat from "./Chat";

export default class UserChat extends Chat {
    user = null;

    constructor(chatObject, user) {
        super(chatObject,"user",user);
        this.chatId = chatObject.user_chat ? chatObject.user_chat.id : null;
        this.userIds = chatObject.user_chat ? chatObject.user_chat.user_ids : null;
        // usersNew must be instance of User
        this.user = user;
        this.groupId = chatObject.user.group_id;
    }
}