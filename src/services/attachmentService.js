import {BACKEND_URL} from "../common";
import {observable} from "mobx";
import Attachment from "../store/models/Attachment";

export default class AttachmentService {
    rootStore = null;
    attachments = new Map();

    constructor(RootStore) {
        this.rootStore = RootStore;
    }

    uploadFile(file) {


        let attachment = new Attachment({size: file.size, filename: file.name, type: file.type,});

        if (file.type.startsWith("image/")) {
            attachment.previewSrc = URL.createObjectURL(file);
        }

        const innerProgressHandler = (event) => {
            attachment.onLoadProgress((event.loaded / event.total) * 100);
        };
        var formdata = new FormData();
        formdata.append("file", file);
        let ajax = new XMLHttpRequest();
        ajax.upload.onprogress = innerProgressHandler;
        ajax.onload = attachment.onLoadComplete;
        ajax.onerror = attachment.onLoadError;
        ajax.onabort = attachment.onLoadError;

        ajax.open("POST", BACKEND_URL + "/attachment/upload", true);
        ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        ajax.send(formdata);
        return attachment;
    }


    // async getAvatarThumbnail(userId) {
    //     let avatar = this.avatars.find(elem => elem.userId === userId);
    //     if (avatar)
    //         return avatar;
    //     const response = await fetch(`${BACKEND_URL}/attachment/download_avatar/${userId}?width=200`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': this.rootStore.accountStore.token
    //         }
    //     });
    //     if (!response.ok) {
    //         console.log("There are no avatar for user:" + userId);
    //     } else {
    //         avatar = {
    //             userId: userId,
    //             blob: URL.createObjectURL(await response.blob())
    //         };
    //         this.avatars.push(avatar);
    //     }
    //     return avatar;
    // }

}