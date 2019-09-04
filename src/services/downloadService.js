import Attachment from "../store/models/Attachment";
import {BACKEND_URL} from "../common";
import {observable} from "mobx";

class Download {
    attachmentId = null;
    @observable progress = null;
    error = "";
    // done | abort | loading | error
    @observable status = "";
    src = null;
    attachment = null;

    constructor(attachment, rootStore) {
        this.attachmentId = attachment.id;
        this.attachment = attachment;
        this.rootStore = rootStore;
    }

    start = () => {
        this.ajax = new XMLHttpRequest();
        const innerProgressHandler = (event) => {
            this.progress = (event.loaded / event.total) * 100;
        };
        const innerLoadEnd = (event) => {
            this.src = URL.createObjectURL(new Blob([this.ajax.response], {type: this.attachment.mime}));
            this.status = "done";
        };
        const innerLoadError = (err) => {
            console.log("download error:" + err);
            this.error = err.toString()
        };
        const innerLoadAbort = () => {
            this.status = "abort";
        };

        this.ajax.onprogress = innerProgressHandler;
        this.ajax.onload = innerLoadEnd;
        this.ajax.onerror = innerLoadError;
        this.ajax.onabort = innerLoadAbort;
        this.ajax.responseType = "arraybuffer";
        this.ajax.open("GET", `${BACKEND_URL}/attachment/download/${this.attachmentId}`, true);
        this.ajax.setRequestHeader('Authorization', this.rootStore.accountStore.token);
        this.ajax.send();
        this.status = "loading";
    };

    save = () => {
        if (this.status === "done" && this.src) {
            let a = document.createElement('a');
            a.style = "display: none";
            a.href = this.src;
            a.download = this.attachment.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    stop = () => {
        if (this.ajax) {
            this.ajax.abort();
        }
    }
}

export default class DownloadService {
    @observable downloads = new Map();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    downloadAttachment(attachment) {
        if (!(attachment instanceof Attachment))
            throw Error("It's not Attachment instance");
        if (this.downloads.has(attachment.id))
            return this.downloads.get(attachment.id);
        let download = new Download(attachment, this.rootStore);
        this.downloads.set(attachment.id, download);
        download.start();
        return download;
    }

    deleteDownload(attachment) {
        if (this.downloads.has(attachment.id)) {
            this.downloads.get(attachment.id).stop();
            this.downloads.delete(attachment.id);
        }
    }

    getDownload(attachmentId) {
        if (!attachmentId)
            throw new Error("attachment id is null")
        return this.downloads.get(attachmentId);
    }
}

