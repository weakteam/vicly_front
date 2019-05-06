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
    mime = "";
    @observable dataFetched = "none";
    // One of ["none" | "loading" | ready | "error"]
    @observable statusFull = "none";
    // One of ["none" | "loading" | ready | "error"]
    @observable statusPreview = "none";
    @observable fullSrc = null;
    @observable previewSrc = null;
    // int (percent)
    @observable progressFull = null;
    // int (percent)
    @observable progressPreview = null;

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

    onUploadProgress(progress) {
        if (this.statusFull !== "loading") {
            this.statusFull = "loading";
        }
        this.progressFull = progress;
        console.log("upload:" + progress + "%");
    }

    onLoadFullProgress(progress) {
        if (this.statusFull !== "loading") {
            this.statusFull = "loading";
        }
        this.progressFull = progress;
        console.log("upload:" + progress + "%");
    }

    onLoadPreviewProgress(progress) {
        if (this.statusPreview !== "loading") {
            this.statusPreview = "loading";
        }
        this.progressPreview = progress;
        console.log("download preview:" + progress + "%");
    }

    // TODO MAYBE NEED RENAME TO onFetched!?
    onLoadComplete = (event) => {
        let request = event.currentTarget;
        if (request.status !== 200) {
            console.log(`Request code:${request.status} ||| text:${request.statusText}`);
            this.dataFetched = "error";
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

        this.dataFetched = "ready";

        if (this.canShowPreview()) {
            this.statusPreview = "loading";
            rootStore.imageService.getImagePreview(this)
                .catch(err => console.log("Error while load image:" + err));
        }
        rootStore.attachmentService.addAttachment(this);
    };

    loadFull = () => {
        this.statusFull = "loading";
        if (this.canShowPreview()) {
            rootStore.imageService.getImage(this)
                .catch(err => console.log("Error while load full image:" + err));
        } else {
            rootStore.attachmentService.downloadFile(this)
                .catch(err => console.log("Error while load full image:" + err));
        }
    };

    downloadAttachmentFromUrl() {
        if (!this.fullSrc) {
            alert("Файл еще не загружен...")
        }
        let a = document.createElement('a');
        a.style = "display: none";
        a.href = this.fullSrc;
        a.download = this.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    onPreviewLoaded(imageServiceObject) {
        this.previewSrc = imageServiceObject.small;
        this.statusPreview = "ready";
    }

    onFullLoaded(imageServiceObject) {
        this.fullSrc = imageServiceObject.big;
        this.statusFull = "ready";
    }

    onLoadError(err) {
        console.log("upload error:" + err);
        this.statusFull = "error"
    }

    canShowPreview() {
        if (this.mime && this.mime.startsWith("image/")) {
            return true;
        }
        return false;
    }

    // TODO MAYBE NEED RENAME TO onFetched!?
    onUploadComplete = (event) => {
        let request = event.currentTarget;
        if (request.status !== 200) {
            console.log(`Request code:${request.status} ||| text:${request.statusText}`);
            this.dataFetched = "error";
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


        this.dataFetched = "ready";

        this.statusPreview = "ready";
        if (this.canShowPreview()) {
            // rootStore.imageService.getImagePreview(this)
            //     .catch(err => console.log("Error while load image:" + err));
        } else {

        }
        rootStore.attachmentService.addAttachment(this);
    };

}