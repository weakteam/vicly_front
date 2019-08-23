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
        // FIXME
        // if (this.statusPreviewSmall !== "loading") {
        //     this.statusPreviewSmall = "loading";
        // }
        this.progressPreview = progress;
        // console.log("download preview:" + progress + "%");
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
        // console.log("upload complete:" + request.responseText);
        ////////////////////////////////////////////////////

        this.id = jsonResponse.id;
        this.user_id = jsonResponse.user_id;
        this.is_avatar = jsonResponse.is_avatar;
        this.timestamp = jsonResponse.timestamp;
        this.metadata = jsonResponse.metadata;
        this.filename = jsonResponse.filename;
        this.previewSmall = jsonResponse.previewSmall && new Attachment(jsonResponse.previewSmall);
        this.previewBig = jsonResponse.previewBig && new Attachment(jsonResponse.previewBig);
        this.size = jsonResponse.size;
        this.mime = jsonResponse.mime;

        this.dataFetched = "ready";
        if (this.mime.startsWith("image/")) {
            this.type = "image";
        } else if (this.mime.startsWith("video/")) {
            this.type = "video";
        } else {
            this.type = "file";
        }
        rootStore.attachmentService.addAttachment(this);
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
        // if (this.canShowPreview()) {
        //     // rootStore.imageService.getImagePreview(this)
        //     //     .catch(err => console.log("Error while load image:" + err));
        // } else {
        //
        // }
        rootStore.attachmentService.addAttachment(this);
    };

}