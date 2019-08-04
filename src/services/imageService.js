import {BACKEND_URL} from "../common";
import {observable} from "mobx";
import Attachment from "../store/models/Attachment";

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
    images = [];

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
        try {
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
        } catch (e) {
            console.log("cant load avatar for user:" + userId);
            return null;
        }
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
    async getImage(attachment) {
        if (!attachment instanceof Attachment) {
            throw Error("It's not Attachment instance");
        }
        if (attachment.fullSrc) {
            return
        }
        // let image = this.images.get(attachment.id);
        // if (image)
        //     return image;


        let ajax = new XMLHttpRequest();

        const innerProgressHandler = (event) => {
            attachment.onLoadFullProgress((event.loaded / event.total) * 100);
        };

        const innerLoadEnd = (event) => {
            const image = {
                id: attachment.id,
                isAvatar: false,
                userId: null,
                small: null,
                big: URL.createObjectURL(new Blob([ajax.response], {type: attachment.mime}))
            };
            this.images.push(image);
            attachment.onFullLoaded(image);
        };

        ajax.onprogress = innerProgressHandler;
        ajax.onload = innerLoadEnd;
        ajax.onerror = attachment.onLoadError;
        ajax.onabort = attachment.onLoadError;
        ajax.responseType = "arraybuffer";
        ajax.open("GET", `${BACKEND_URL}/attachment/download/${attachment.id}`, true);
        ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        ajax.send();
    }

    async getImagePreview(attachment, isPreviewBig = false) {
        if (!attachment instanceof Attachment) {
            throw Error("It's not Attachment instance");
        }
        let ajax = new XMLHttpRequest();
        const innerProgressHandler = (event) => {
            let progress = (event.loaded / event.total) * 100;
            if (progress === 0) {
                progress = 2;
            }
            if (progress >= 100) {
                progress = 100;
            }
            attachment.onLoadPreviewProgress(progress);
        };

        const innerLoadEnd = (event) => {
            //this.images.push(image);
            if (isPreviewBig) {
                attachment.onPreviewBigLoaded(URL.createObjectURL(new Blob([ajax.response], {type: attachment.mime})));
            } else {
                attachment.onPreviewSmallLoaded(URL.createObjectURL(new Blob([ajax.response], {type: attachment.mime})));
            }

        };

        ajax.onreadystatechange = function () {
            if (ajax.readyState === 2) {
                if (ajax.status === 200) {
                    ajax.responseType = "blob";
                } else {
                    ajax.responseType = "text";
                }
            }
        };
        ajax.onprogress = innerProgressHandler;
        ajax.onload = innerLoadEnd;
        ajax.onerror = attachment.onLoadError;
        ajax.onabort = attachment.onLoadError;
        ajax.open("GET", `${BACKEND_URL}/attachment/download/${attachment.id}/${isPreviewBig ? "preview_big" : "preview_small"}`, true);
        ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        ajax.send();
    }

    uploadAvatar(file, progressHandler, completeHandler, errorHandler) {
        const innerProgressHandler = (event) => {
            return (event.loaded / event.total) * 100;
        };
        var formdata = new FormData();
        formdata.append("file", file);
        let ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progressFull", innerProgressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.open("POST", BACKEND_URL + "/attachment/upload_avatar");
        ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        ajax.send(formdata);
    }

}