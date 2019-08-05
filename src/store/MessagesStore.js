import {BACKEND_URL} from "../common";
import {autorun, observable, reaction, runInAction, when} from "mobx";
import toastService from "../services/toastService";
import api from "./api/ViclyApi";
import User from "./models/User";
import Chat from "./models/Chat";
import UserChat from "./models/UserChat";
import GroupChat from "./models/GroupChat";
import Message from "./models/Message";

export default class MessagesStore {
    @observable.shallow groups = [];
    @observable foundedGroups = [];
    @observable foundedUserChats = [];
    @observable foundedGroupChats = [];
    @observable searchActive = false;
    users = [];
    @observable.shallow userChatsNew = [];
    @observable.shallow groupChatsNew = [];
    @observable fetchFail = false;
    @observable currentChatId = null;
    previousCurrentChatId = null;
    @observable isCurrentChatForUser = null;
    previousIsCurrentChatForUser = null;
    @observable chatsFetched = false;
    err_message = "";
    @observable messagesLoading = false;

    invalidate() {
        this.groupChats = [];
        this.groups = [];
        this.users = [];
        this.userChats = [];
        this.fetchFail = false;
        this.currentChatId = null;
        this.isCurrentChatForUser = null;
        this.chatsFetched = false;
        this.err_message = "";
        this.messagesLoading = false;
    }

    constructor(RootStore) {
        this.rootStore = RootStore;
        this.accountStore = RootStore.accountStore;
        autorun(
            () => {
                if (this.accountStore.token === null) {
                    this.invalidate();
                }
            }
        );
        autorun(
            () => {
                if (this.accountStore.token) {
                    this.fetchChats()
                }
            }
        );
        reaction(
            () => {
                if (this.chatsFetched) {
                    return [this.currentChatId, this.isCurrentChatForUser]
                } else return null;

            },
            (args) => {
                if (!args) return;
                const [currentChatId, isCurrentChatForUser] = args;
                if (currentChatId) {
                    // If opened user chat
                    let currentChat = this.getCurrentChatNew();
                    let previousChat = this.getPreviousChatNew();
                    if (!currentChat.wasFetched) {
                        currentChat.loadMessages(currentChat.page);
                    } else {
                        if (currentChat.messages.length) {
                            const lastMessage = currentChat.messages[currentChat.messages.length - 1];
                            currentChat.loadMessagesAfter(lastMessage.id);
                        }
                    }
                    currentChat.setSelected(true);
                    previousChat.setSelected(false);
                }
            },
            {fireImmediately: true}
        );
    };

    // START SEARCH PLACE
    uniq(a) {
        return Array.from(new Set(a));
    }

    searchChat = (pattern) => {
        let foundedUserChats = this.userChatsNew.filter(chat => {
            const name = chat.user.first_name + " " + chat.user.last_name;
            return name.includes(pattern);
        });
        let foundedGroupChats = this.groupChatsNew.filter(chat => chat.title.includes(pattern));
        let foundedGroups = this.groups.filter(group => group.name.includes(pattern));

        let groupIds = foundedUserChats.map(chat => chat.groupId)
            .concat(
                this.foundedGroupChats.map(chat => chat.groupId)
            );
        foundedGroups = foundedGroups.concat(
            this.groups.filter(group => groupIds.includes(group.id))
        );
        this.foundedGroups = this.uniq(foundedGroups);
        this.foundedUserChats = this.uniq(foundedUserChats);
        this.foundedGroupChats = this.uniq(foundedGroupChats);
        this.searchActive = true;
    };

    invalidateSearch = () => {
        this.foundedGroups = [];
        this.foundedUserChats = [];
        this.foundedGroupChats = [];
        this.searchActive = false;
    };

    // END   SEARCH PLACE

    async fetchChats() {
        try {
            const userListResponse = await this.rootStore.api.fetchChats();

            if (!userListResponse.ok) {
                alert("fetch chats failed");
                runInAction("Failed fetch users info", () => {
                    this.fetchFail = true;
                    this.err_message = userListResponse.error();
                });
            }
            const content = await userListResponse.json();

            runInAction("Update users info", () => {
                this.groups = content.with_group.map(elem => elem.group);

                this.users_new = content.with_group
                    .flatMap((elem => elem.users))
                    .map(elem => new User(elem.user));

                this.userChatsNew = content.with_group
                    .flatMap((elem => elem.users))
                    .map(userObject => {
                        const user = this.users_new.find(user => user.id === userObject.user.id);
                        return new UserChat(userObject, user);
                    });

                this.groupChatsNew = content.with_group
                    .flatMap((elem => elem.group_chats))
                    .map(groupChatObject => {
                        const users = this.users_new.filter(user => groupChatObject.chat.user_ids.includes(user.id));
                        return new GroupChat(groupChatObject, users);
                    })
                    .filter(chat => !chat.archive);
                this.chatsFetched = true;
            });

            this.userChatsNew.map(userChat => {
                this.rootStore.imageService.getAvatarThumbnail(userChat.user.id);
            });
        } catch (err) {
            runInAction("Failed fetch users info", () => {
                this.fetchFail = true;
                this.err_message = err;
            });
        }
    }


    // //@action
    // //TO ONLY WS USING
    addMessageToEnd(message) {
        //TODO for websocket push
        const myselfUserId = this.accountStore.userId;
        let chat;
        if (message.chat.chat_type === "user") {
            const userIds = this.uniq(message.chat.user_ids);
            if (userIds.length === 1 && userIds.includes(this.accountStore.userId)) {
                chat = this.findUserChatNew(userIds[0])
            } else {
                let userId = message.chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
                chat = this.findUserChatNew(userId)
            }
        } else {
            let chatId = message.chat.id;
            chat = this.findGroupChatNew(chatId);
        }
        // WE MUST ALWAYS FIND CHAT!!!
        if (chat) {
            chat.addMessageToEnd(new Message(message));
        } else {
            // TODO FETCH CHAT INFO
        }
    }

    onDeliveryMessage(ws_event) {
        let innerChat = null;
        if (ws_event.chat.chat_type === "user") {
            let userId = ws_event.chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
            innerChat = this.findUserChatNew(userId)
        } else {
            innerChat = this.findGroupChatNew(ws_event.chat.id);
        }
        if (innerChat) {
            innerChat.messageDelivered(ws_event.message);
        } else {
            console.log("MessageStore onDeliveryMessage:cant find chat!!!");
        }
    }

    // WS event  object
    // message = {
    //     "event": 5,
    //     "message": {
    //         "message_id": "5cd37faca7b11b0001870d13",
    //         "chat": {"id": 5, "user_ids": [1, 11], "chat_type": "user"},
    //         "message": {
    //             "id": "5cd37faca7b11b0001870d13",
    //             "from": 1,
    //             "key": "",
    //             "message": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZXh0IjoiaSB3YW50IFdTISJ9.qaj4DPJADWyo9VJsoMp5RGcaTmZ8ujXXOjWpRH0WJ4Q",
    //             "reply_for": null,
    //             "timestamp_post": {"timestamp": 1557364652496, "zone": "UTC+0"},
    //             "timestamp_change": null,
    //             "timestamp_delivery": {"timestamp": 1557364653484, "zone": "UTC+0"},
    //             "timestamp_read": {"timestamp": 1557364653484, "zone": "UTC+0"},
    //             "attachments": []
    //         }
    //     }
    // };

    onReadMessage(ws_event) {
        let innerChat = null;
        if (ws_event.chat.chat_type === "user") {
            let userId = ws_event.chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
            innerChat = this.findUserChatNew(userId)
        } else {
            innerChat = this.findGroupChatNew(ws_event.chat.id);
        }
        if (innerChat) {
            innerChat.messageReaded(ws_event.message);
        } else {
            console.log("MessageStore onReadMessage:cant find chat!!!");
        }
    }

    findGroupChatNew(chatId) {
        return this.groupChatsNew.find(chat => chat.chatId === chatId);
    }


    findUserChatNew(userId) {
        return this.userChatsNew.find(elem => elem.user.id === userId);
    }

    findMessage(messageId, chatId, chatType) {
        const chat = this.findChat(chatId, chatType);
        chat.messages.find(elem => elem.id === messageId);
    }

    findUserByIdNew(userId) {
        const user = this.users_new.find(
            user => user.id === userId
        );
        return user || null;
    }

    getCurrentChatNew() {
        return this.isCurrentChatForUser ? this.findUserChatNew(this.currentChatId) : this.findGroupChatNew(this.currentChatId);
    }

    getPreviousChatNew() {
        return this.previousIsCurrentChatForUser ? this.findUserChatNew(this.previousCurrentChatId) : this.findGroupChatNew(this.previousCurrentChatId);
    }


    nextPage(chatType, chatId) {
        let chat = null;
        if (chatType === "user") {
            chat = this.findUserChat(chatId)
        } else {
            chat = this.findGroupChat(chatId);
        }
        if (chat) {
            chat.page++;
            if (chatType === "user") {
                this.getUserChatMessages(chatId, chat.page);
            } else {
                this.getGroupChatMessages(chatId, chat.page);
            }
        }
    }

    setCurrentChatId(newCurrentChatId, isNewCurrentChatForUser) {
        this.previousIsCurrentChatForUser = this.isCurrentChatForUser;
        this.isCurrentChatForUser = isNewCurrentChatForUser;
        this.previousCurrentChatId = this.currentChatId;
        this.currentChatId = newCurrentChatId;
    }

    isChatChanged() {
        return this.currentChatId !== this.previousCurrentChatId || this.isCurrentChatForUser !== this.previousIsCurrentChatForUser;
    }

    invalidateChatChanged() {
        this.previousIsCurrentChatForUser = this.isCurrentChatForUser;
        this.previousCurrentChatId = this.currentChatId;
    }

    addGroupChat(message) {

    };
}
