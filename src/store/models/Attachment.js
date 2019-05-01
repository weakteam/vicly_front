import {observable} from "mobx";

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
    // One of ["none" | "loading" | ready]
    @observable status = "none";
    @observable progress = null;

    constructor(attachmentObject) {
        this.id = attachmentObject.id || null;
        this.fid = attachmentObject.fid || null;
        this.user_id = attachmentObject.user_id || null;
        this.filename = attachmentObject.filename || null;
        this.size = attachmentObject.size || null;
        this.is_avatar = attachmentObject.is_avatar || null;
        this.metadata = attachmentObject.metadata || null;
        this.timestamp = attachmentObject.timestamp || null;
    }

    onLoadProgress(progress) {
        if(this.status!=="loading"){
            this.status = "loading";
        }
        this.progress = progress;
        console.log("upload:" + progress + "%");
    }

    onLoadComplete = (request) => (event) => {
        let jsonResponse = JSON.parse(request.responseText);
        console.log("upload complete:"+request.responseText);
        ////////////////////////////////////////////////////

        this.id = jsonResponse.id;
        this.user_id = jsonResponse.user_id;
        this.is_avatar = jsonResponse.is_avatar;
        this.timestamp = jsonResponse.timestamp;
        this.metadata = jsonResponse.metadata;
        this.status="ready";
    };

    onLoadError(err) {
        console.log("upload error:" + err);
    }

}