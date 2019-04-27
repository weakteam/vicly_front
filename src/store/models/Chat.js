import {observable} from "mobx";

export default class Chat {
    chat_id = null;
    user_ids = null;
    // Array of User objects
    @observable.ref
    users = [];
    chat_type = null;
    user = null;
    last = null;
    unread = 0;
    // Array of Message objects
    messages = [];
    page = 0;

    constructor(chatObject, usersNew) {
        this.chat_id = chatObject.chat_id;
        this.user_ids = chatObject.user_ids;
        this.chat_type = chatObject.chat_type;
        this.users = usersNew;
    }
}