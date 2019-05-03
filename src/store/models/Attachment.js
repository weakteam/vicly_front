import {observable} from "mobx";
import rootStore from "../RootStore";

export default class Attachment {

    id = null;
    fid = null;
    user_id = null;
    filename = null;
    size = null;
    is_avatar = null;
    // Plain js object with any fields :(
    metadata = null;
    timestamp = null;
    mime = null;
    // One of ["none" | "loading" | ready]
    @observable status = "none";
    @observable progress = null;
    previewSrc = null;

    constructor(attachmentObject) {
        this.id = attachmentObject.id || null;
        this.fid = attachmentObject.fid || null;
        this.user_id = attachmentObject.user_id || null;
        this.filename = attachmentObject.filename || null;
        this.size = attachmentObject.size || null;
        this.is_avatar = attachmentObject.is_avatar || null;
        this.metadata = attachmentObject.metadata || null;
        this.timestamp = attachmentObject.timestamp || null;
        this.mime = attachmentObject.mime || null;
    }

    onLoadProgress(progress) {
        if (this.status !== "loading") {
            this.status = "loading";
        }
        this.progress = progress;
        console.log("upload:" + progress + "%");
    }

    onLoadComplete = (event) => {
        let request = event.currentTarget;
        if (request.status !== 200) {
            console.log(`Request code:${request.status} ||| text:${request.statusText}`);
            this.status = "error";
            return;
        }
        let jsonResponse = JSON.parse(request.responseText);
        console.log("upload complete:" + request.responseText);
        ////////////////////////////////////////////////////

        this.id = jsonResponse.id;
        this.user_id = jsonResponse.user_id;
        this.is_avatar = jsonResponse.is_avatar;
        this.timestamp = jsonResponse.timestamp;
        this.metadata = jsonResponse.metadata;
        this.filename = jsonResponse.filename;
        this.size = jsonResponse.size;
        this.mime = jsonResponse.mime;
        // TODO download image !!!
        // if (this.mime.st) {
        //     this.previewSrc = URL.createObjectURL(file)
        // }
        if (this.metadata && this.metadata["Content-Type"] && this.metadata["Content-Type"] !== this.mime) {
            console.log("Apache Tika mime != Browser mime!!!");
        }
        this.status = "ready";
        rootStore.attachmentService.addAttachment(this);
    };

    onLoadError(err) {
        console.log("upload error:" + err);
        this.status = "error"
    }

}