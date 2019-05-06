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
    @observable groups = [];
    @observable foundedGroups = [];
    @observable foundedUserChats = [];
    @observable foundedGroupChats = [];
    @observable searchActive = false;
    users = [];
    @observable userChatsNew = [];
    @observable groupChatsNew = [];
    @observable fetchFail = false;
    @observable currentChatId = null;
    previousCurrentChatId = null;
    isCurrentChatForUser = null;
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
                    return this.currentChatId
                } else return null;

            },
            (currentChatId) => {
                if (currentChatId) {
                    // If opened user chat
                    let currentChat = this.getCurrentChatNew(currentChatId);
                    if (!currentChat.messages.length) {
                        currentChat.loadMessages(currentChat.page);
                    } else {
                        const lastMessage = currentChat.messages[currentChat.messages.length - 1];
                        if (lastMessage) {
                            currentChat.loadMessagesAfter(lastMessage.id);
                        }
                    }

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
                    });
                this.chatsFetched = true;
            });

            this.userChatsNew.map(userChat => {
                this.rootStore.imageService.getAvatarThumbnail(userChat.user.id);
            });
        } catch (err) {
            console.log(err);
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
        // TODO Its fucking bullshit !!! NEED WORK ON BACKEND!!!
        let chat;
        if (message.chat.chat_type === "user") {
            let userId = message.chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
            chat = this.findUserChatNew(userId)
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

    onDeliveryMessage(message_id, chat, message) {
        // let innerChat = null;
        // if (chat.chatType === "user") {
        //     let userId = chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
        //     innerChat = this.findUserChat(userId)
        // } else {
        //     innerChat = this.findGroupChat(chat.id);
        // }
        // if (innerChat) {
        //     let innerMessage = innerChat.messages.find(mess => mess.id === message_id);
        //     innerMessage.timestamp_delivery = message.timestamp_delivery;
        // }
        // TODO Proxy work in Chat
    }

    onReadMessage(message_id, chat, message) {
        // let innerChat = null;
        // if (chat.chatType === "user") {
        //     let userId = chat.user_ids.filter(id => id !== this.accountStore.userId)[0];
        //     innerChat = this.findUserChat(userId)
        // } else {
        //     innerChat = this.findGroupChat(chat.id);
        // }
        // if (innerChat) {
        //     let innerMessage = innerChat.messages.find(mess => mess.id === message_id);
        //     innerMessage.timestamp_delivery = message.timestamp_delivery;
        //     innerMessage.timestamp_read = message.timestamp_read;
        //     innerChat.unread--;
        // }
        // TODO proxy work in Chat
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
        this.previousCurrentChatId = this.currentChatId;
        this.currentChatId = newCurrentChatId;
        this.previousIsCurrentChatForUser = this.isCurrentChatForUser;
        this.isCurrentChatForUser = isNewCurrentChatForUser;
    }

    isChatChanged() {
        return this.currentChatId !== this.previousCurrentChatId || this.isCurrentChatForUser !== this.previousIsCurrentChatForUser;
    }

    invalidateChatChanged() {
        this.previousIsCurrentChatForUser = this.isCurrentChatForUser;
        this.previousCurrentChatId = this.currentChatId;
    }
}
