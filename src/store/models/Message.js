import {observable} from "mobx";


export default class Message {
    // Array of Attachment objects
    attachments = [];
    from = null;
    id = null;
    key = null;
    message = null;
    reply_for = null;
    // timestamp_delivery: {timestamp: 1556227517250, zone: "UTC+0"}
    timestamp_change = null;
    timestamp_delivery = null;
    timestamp_post = null;
    timestamp_read = null;

    constructor(messageObject) {
        this.id = messageObject.id;
        this.from = messageObject.from;
        this.key = messageObject.key;
        this.message = messageObject.message;
        this.reply_for = messageObject.reply_for;
        this.attachments = messageObject.attachments;
        this.timestamp_change = messageObject.timestamp_change;
        this.timestamp_post = messageObject.timestamp_post;
        this.timestamp_delivery = messageObject.timestamp_delivery;
        this.timestamp_read = messageObject.timestamp_read;
    }
}