import {computed, observable, action, runInAction} from "mobx";
import {BACKEND_URL} from "../common";

export default class AccountStore {
    @observable fullName = "";
    @observable token = "";
    @observable login = "";
    userId = null;
    groupId = null;
    @observable status = "unauthed";
    err_message = "";

    constructor(RootStore) {
        this.fullName = sessionStorage.getItem("fullName");
        this.token = sessionStorage.getItem("token");
        this.userId = parseInt(sessionStorage.getItem("userId"), 10);
        this.groupId = parseInt(sessionStorage.getItem("groupId"), 10);
        this.login = sessionStorage.getItem("login");
        if (this.token) {
            this.status = "authed";
        }
        this.rootStore = RootStore;
        if(this.token)
            this.rootStore.webSocketService.run(this.token);
    }

    async loginUser(login, password) {
        try {
            const response = await fetch(BACKEND_URL + "/user/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "login": login,
                    "password": password
                })
            });
            if (!response.ok) {
                runInAction("Auth failed", () => {
                    this.status = "failed";
                    this.err_message = response.error();
                });
            }
            const content = await response.json();

            runInAction("Auth success", () => {
                this.fullName = content.first_name + " " + content.last_name;
                this.token = content.token;
                this.login = login;
                this.status = "authed";
                this.userId = content.id;
                this.groupId = content.group_id;
                this.saveInLocalStorage(this.fullName, this.token, this.userId, this.groupId, this.login);
            });
            this.rootStore.webSocketService.run(this.token);
        } catch (err) {
            console.log(err);
            runInAction("Auth failed", () => {
                this.status = "failed";
                this.err_message = err;
            });
        }
    };

    saveInLocalStorage(fullName, token, userId, groupId, login) {
        sessionStorage.setItem("fullName", fullName);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("groupId",groupId);
        sessionStorage.setItem("login",login);
    }

    @action
    unauth() {
        this.fullName = null;
        this.token = null;
        this.login = null;
        this.status = "unauthed";
        sessionStorage.clear();
    }
}
