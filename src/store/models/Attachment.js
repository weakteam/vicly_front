import {observable} from "mobx";

export default class Attachment {

    _id = null;
    fid = null;
    user_id = null;
    filename = null;
    size = null;
    is_avatar = null;
    // Plain js object with any fields :(
    metadata = null;
    timestamp = null;

    constructor(attachmentObject) {
        this._id = attachmentObject._id;
        this.fid = attachmentObject.fid;
        this.user_id = attachmentObject.user_id;
        this.filename = attachmentObject.filename;
        this.size = attachmentObject.size;
        this.is_avatar = attachmentObject.is_avatar;
        this.metadata = attachmentObject.metadata;
        this.timestamp = attachmentObject.timestamp;
    }
}