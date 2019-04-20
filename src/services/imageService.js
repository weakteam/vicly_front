import {BACKEND_URL} from "../common";
import {observable} from "mobx";

export default class ImageService {
    rootStore = null;
    images = [];
    @observable avatars = [];

    constructor(RootStore) {
        this.rootStore = RootStore;
    }

    loadFromInput(onChangeEvent, onloadHandler) {
        if (onChangeEvent.target.files && onChangeEvent.target.files[0]) {
            onloadHandler(URL.createObjectURL(onChangeEvent.target.files[0]));
            // const reader = new FileReader();
            // reader.onload = (e) => {
            //     onloadHandler(e.target.result, onChangeEvent.target.files[0]);
            // };
            // reader.readAsDataURL(onChangeEvent.target.files[0]);
        }
    }

    async getAvatar(userId) {
        let avatar = this.avatars.find(elem => elem.userId === userId);
        if (avatar)
            return avatar;
        const response = await fetch(`${BACKEND_URL}/attachment/download_avatar/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': this.rootStore.accountStore.token
            }
        });
        if (!response.ok) {
            console.log("There are no avatar for user:"+userId);
        }else {
            avatar = {
                userId: userId,
                blob: URL.createObjectURL(await response.blob())
            };
            this.avatars.push(avatar);
        }
        return avatar;
    }

    uploadAvatar(file, progressHandler, completeHandler, errorHandler) {
        const innerProgressHandler = (event) => {
            return (event.loaded / event.total) * 100;
        };
        var formdata = new FormData();
        formdata.append("file", file);
        let ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", innerProgressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.open("POST", BACKEND_URL + "/attachment/upload_avatar");
        ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        ajax.send(formdata);
    }

}