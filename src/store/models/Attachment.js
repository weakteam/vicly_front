import {observable} from "mobx";
import rootStore from "../RootStore";

export default class Attachment {

    id = null;
    fid = null;
    user_id = null;
    filename = null;
    size = null;
    width = null;
    height = null;
    is_avatar = null;
    // Plain js object with any fields :(
    metadata = null;
    timestamp = null;
    mime = "";
    type = "";
    @observable dataFetched = "none";
    // One of ["none" | "loading" | ready | "error"]
    @observable statusFull = "none";
    // One of ["none" | "loading" | ready | "error"]
    @observable statusPreviewSmall = "none";
    @observable statusPreviewBig = "none";
    @observable fullSrc = null;
    previewBig = null;
    previewSmall = null;
    @observable previewSrcSmall = null;
    @observable previewSrcBig = null;
    // int (percent)
    @observable progressFull = null;
    // int (percent)
    @observable progressPreview = null;

    attachedHeigth = 180;
    attachedWidth = null;

    constructor(attachmentObject) {
        this.createInstance(attachmentObject)
    }

    createInstance(attachmentObject) {
        this.id = attachmentObject.id;
        this.user_id = attachmentObject.user_id;
        this.is_avatar = attachmentObject.is_avatar;
        this.timestamp = attachmentObject.timestamp;
        this.metadata = attachmentObject.metadata;
        this.filename = attachmentObject.filename;
        this.previewSmall = attachmentObject.previewSmall && new Attachment(attachmentObject.previewSmall);
        this.previewBig = attachmentObject.previewBig && new Attachment(attachmentObject.previewBig);
        this.size = attachmentObject.size;
        this.mime = attachmentObject.mime;
        this.width = attachmentObject.width;
        this.height = attachmentObject.height;
        if (this.height && this.width) {
            this.aspect = this.width / this.height;
            this.attachedWidth = Math.round(this.attachedHeigth * this.aspect);
        }


        this.dataFetched = "ready";
        if (this.mime) {
            if (this.mime.startsWith("image/")) {
                this.type = "image";
            } else if (this.mime.startsWith("video/")) {
                this.type = "video";
            } else {
                this.type = "file";
            }
        }
        rootStore.attachmentService.addAttachment(this);
    }

    onUploadProgress(progress) {
        if (this.statusFull !== "loading") {
            this.statusFull = "loading";
        }
        this.progressFull = progress;
        // console.log("upload:" + progress + "%");
    }

    onLoadFullProgress(progress) {
        if (this.statusFull !== "loading") {
            this.statusFull = "loading";
        }
        this.progressFull = progress;
        // console.log("upload:" + progress + "%");
    }

    onLoadPreviewProgress(progress) {
        this.progressPreview = progress;
    }

    // TODO MAYBE NEED RENAME TO onFetched!?
    onLoadComplete = (event) => {
        let request = event.currentTarget;
        if (request.status !== 200) {
            // console.log(`Request code:${request.status} ||| text:${request.statusText}`);
            this.dataFetched = "error";
            return;
        }
        let jsonResponse = JSON.parse(request.responseText);
        this.createInstance(jsonResponse);
    };

    //FIXME move to downloadService
    loadFull = () => {
        // this.statusFull = "loading";
        // if (this.canShowPreview()) {
        //     rootStore.imageService.getImage(this)
        //         .catch(err => console.log("Error while load full image:" + err));
        // } else {
        //     rootStore.attachmentService.downloadFile(this)
        //         .catch(err => console.log("Error while load full image:" + err));
        // }
    };

    onPreviewSmallLoaded(image) {
        this.previewSrcSmall = image;
        this.statusPreviewSmall = "ready";
    }

    onPreviewBigLoaded(image) {
        this.previewSrcBig = image;
        this.statusPreviewBig = "ready";
    }

    loadPreviewBig() {
        this.statusPreviewBig = "loading";
        rootStore.imageService.getImagePreview(this, true)
            .catch(err => console.log("Error while load big preview image:" + err));
    }

    loadPreviewSmall() {
        this.statusPreviewSmall = "loading";
        rootStore.imageService.getImagePreview(this, false)
            .catch(err => console.log("Error while load small preview image:" + err));
    }

    onLoadError(err) {
        console.log("upload error:" + err);
        this.statusFull = "error"
    }

    canShowPreview() {
        return this.previewSmall || this.previewBig;
    }

    isImage() {
        return this.type === "image";
    }

    isVideo() {
        return this.type === "video";
    }

    isMedia() {
        return this.isImage() || this.isVideo();
    }


    //FIXME need review
    //TODO MAYBE NEED RENAME TO onFetched!?
    onUploadComplete = (event) => {
        let request = event.currentTarget;
        if (request.status !== 200) {
            // console.log(`Request code:${request.status} ||| text:${request.statusText}`);
            this.dataFetched = "error";
            return;
        }
        let jsonResponse = JSON.parse(request.responseText);
        // console.log("upload complete:" + request.responseText);
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
        rootStore.attachmentService.addAttachment(this);
    };

}