import {observable} from "mobx";

export default class User {

    @observable archive = null;
    @observable avatar = null;
    @observable first_name = null;
    @observable group_id = null;
    id = null;
    @observable is_active = null;
    join_time = null;
    @observable last_activity = null;
    @observable last_name = null;
    @observable login = null;
    @observable position = null;
    role_id = null;
    @observable surname = null;
    _id = null;

    constructor(userObject) {
        this._id = userObject._id;
        this.first_name = userObject.first_name;
        this.surname = userObject.surname;
        this.last_name = userObject.last_name;
        this.archive = userObject.archive;
        this.avatar = userObject.avatar;
        this.group_id = userObject.group_id;
        this.id = userObject.id;
        this.is_active = userObject.is_active;
        this.join_time = userObject.join_time;
        this.last_activity = userObject.last_activity;
        this.login = userObject.login;
        this.role_id = userObject.role_id;
        this.position = userObject.position;
    }
}