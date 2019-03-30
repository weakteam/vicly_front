import {observable, reaction, runInAction} from "mobx";
import {BACKEND_URL} from "../common";
import accountStore from "./AccountStore";
import messagesStore from "./MessagesStore";


class ChatsStore {
    @observable groups = [];
    @observable userChats = [];
    @observable groupChats = [];
    @observable fetchFail = false;
    @observable currentChatId = null;
    err_message = "";



    async fetchChats() {
        try {
            const userListResponse = await fetch(BACKEND_URL + "/user/list", {
                method: 'GET',
                headers: {
                    'Authorization': accountStore.token,
                }
            });
            // TODO fetching group chats
            // const groupChatsResponse =  await fetch(api + "/user/list", {
            //     method: 'GET',
            //     headers: {
            //         'Authorization': accountStore.getToken(),
            //     }
            // });
            if (!userListResponse.ok) {
                alert("fetch chats failed");
                runInAction("Failed fetch users info", () => {
                    this.fetchFail = true;
                    this.err_message = userListResponse.error();
                });
            }
            const content = await userListResponse.json();
            runInAction("Update users info", () => {
                this.userChats = content.with_group.flatMap((elem => elem.users));
                this.userChats = this.userChats.map(chat => {
                    messagesStore.createOrUpdateChatMessagesObjByUnreadedMessages(chat.user.id,  "user", chat.unread, chat.last);
                    chat.chat_type = "user";
                    return chat;
                });
                this.groupChats = content.with_group.flatMap((elem => elem.group_chats));
                this.groups = content.with_group.map(elem => {
                    return elem.group;
                });
            });
        } catch (err) {
            console.log(err);
            runInAction("Failed fetch users info", () => {
                this.fetchFail = true;
                this.err_message = err;
            });
        }
    }
}

const store = new ChatsStore();

export default store;
