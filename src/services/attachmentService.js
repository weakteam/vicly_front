import {BACKEND_URL} from "../common";
import {observable} from "mobx";
import Attachment from "../store/models/Attachment";

export default class AttachmentService {
    rootStore = null;
    attachments = new Map();

    addAttachment(attachment) {
        if (attachment instanceof Attachment) {
            this.attachments.set(attachment.id, attachment);
        } else {
            throw Error("It's not Attachment instance");
        }
    }

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

    loadAttachmentInfo(attachmentId) {
        let attachment = new Attachment({id: attachmentId});
        const innerProgressHandler = (event) => {
            attachment.onLoadProgress((event.loaded / event.total) * 100);
        };
        let ajax = new XMLHttpRequest();
        ajax.upload.onprogress = innerProgressHandler;
        ajax.onload = attachment.onLoadComplete;
        ajax.onerror = attachment.onLoadError;
        ajax.onabort = attachment.onLoadError;

        ajax.open("GET", BACKEND_URL + "/attachment/" + attachmentId, true);
        ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        ajax.send();

        return attachment;
    }

    loadAttachment(attachment) {
        if (!attachment instanceof Attachment) {
            throw Error("It's not Attachment instance");
        }

    }


}