import {BACKEND_URL} from "../common";
import {observable} from "mobx";
import Attachment from "../store/models/Attachment";
import rootStore from "../store/RootStore";

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
            attachment.onLoadFullProgress((event.loaded / event.total) * 100);
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

    async downloadFile(attachment) {
        if (!attachment instanceof Attachment) {
            throw Error("It's not Attachment instance");
        }
        if (attachment.canShowPreview()) {
            throw Error("This method only for non-previewable attachments!");
            // return
        }
        if(attachment.fullSrc){
            throw Error("That attachment already downloaded!!");
        }

        let ajax = new XMLHttpRequest();

        const innerProgressHandler = (event) => {
            attachment.onLoadFullProgress((event.loaded / event.total) * 100);
        };

        const innerLoadEnd = (event) => {
            const surrogate = {
                big: URL.createObjectURL(new Blob([ajax.response], {type: attachment.mime}))
            };
            attachment.onFullLoaded(surrogate);
        };

        ajax.onprogress = innerProgressHandler;
        ajax.onload = attachment.innerLoadEnd;
        ajax.onerror = attachment.onLoadError;
        ajax.onabort = attachment.onLoadError;

        ajax.open("GET", `${BACKEND_URL}/attachment/download/${attachment.id}?width=200`, true);
        ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        ajax.send();
    }

    loadAttachmentInfo(attachmentId) {
        let attachment = new Attachment({id: attachmentId});
        const innerProgressHandler = (event) => {
            attachment.onLoadFullProgress((event.loaded / event.total) * 100);
        };
        let ajax = new XMLHttpRequest();
        ajax.upload.onprogress = innerProgressHandler;
        ajax.onload = attachment.onLoadComplete;
        attachment.dataFetched = "loading";
        ajax.onerror = attachment.onLoadError;
        ajax.onabort = attachment.onLoadError;

        ajax.open("GET", BACKEND_URL + "/attachment/" + attachmentId, true);
        ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        ajax.send();

        return attachment;
    }

}