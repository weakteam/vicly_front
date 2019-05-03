import {BACKEND_URL} from "../common";
import {observable} from "mobx";

/*
image:{
                isAvatar:true|false
                userId: int?
                id:int(attachmentId)
                small:URL.createObjectURL()
                big: URL.createObjectURL()
}
 */
export default class ImageService {
    rootStore = null;
    @observable images = [];

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

    async getAvatarThumbnail(userId) {
        let avatar = this.images.find(elem => elem.userId === userId);
        if (avatar)
            return avatar;
        const response = await fetch(`${BACKEND_URL}/attachment/download_avatar/${userId}?width=200`, {
            method: 'GET',
            headers: {
                'Authorization': this.rootStore.accountStore.token
            }
        });
        if (!response.ok) {
            console.log("There are no avatar for user:" + userId);
        } else {
            avatar = {
                isAvatar: true,
                userId: userId,
                small: URL.createObjectURL(await response.blob()),
                big: null
            };
            this.images.push(avatar);
        }
        return avatar;
    }

    async getAvatarFull(userId) {
        let avatar = this.images.find(elem => elem.userId === userId);
        if (avatar && avatar.big)
            return avatar;
        const response = await fetch(`${BACKEND_URL}/attachment/download_avatar/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': this.rootStore.accountStore.token
            }
        });
        if (!response.ok) {
            console.log("There are no avatar for user:" + userId);
        } else if (avatar) {
            avatar.big = URL.createObjectURL(await response.blob());
        } else {
            avatar = {
                isAvatar: true,
                userId: userId,
                big: URL.createObjectURL(await response.blob()),
                small: null
            };
            this.images.push(avatar);
        }
        return avatar;
    }

    //TODO separate image thumb and full
    async getImage(attachmentId, attachment) {
        let image = this.images.find(elem => elem.id === attachmentId);
        if (image)
            return image;

        const response = await fetch(`${BACKEND_URL}/attachment/download/${attachmentId}`, {
            method: 'GET',
            headers: {
                'Authorization': this.rootStore.accountStore.token
            }
        });
        if (!response.ok) {
            console.log("There are no image:" + attachmentId);
        } else {
            image = {
                isAvatar: false,
                userId: null,
                big: URL.createObjectURL(await response.blob())
            };
            this.images.push(image);
        }
        return image;
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