import {observable} from "mobx";
import {BACKEND_URL} from "../../common";
import rootStore from "../RootStore";
import Attachment from "./Attachment";


export default class Message {
    // Array of Attachment objects
    attachments = [];
    from = null;
    fromMe = false;
    id = null;
    key = null;
    message = null;
    reply_for = null;
    // timestamp_delivery: {timestamp: 1556227517250, zone: "UTC+0"}
    timestamp_change = null;
    @observable timestamp_delivery = null;
    timestamp_post = null;
    formatted_time = null;
    @observable timestamp_read = null;

    constructor(messageObject) {
        this.id = messageObject.id;
        this.from = messageObject.from;
        this.fromMe = this.from === rootStore.accountStore.userId;
        this.key = messageObject.key;
        this.chat_id = null;
        this.message = messageObject.message;
        this.reply_for = messageObject.reply_for;
        this.timestamp_change = messageObject.timestamp_change;
        this.timestamp_post = messageObject.timestamp_post;
        this.timestamp_delivery = messageObject.timestamp_delivery;
        this.timestamp_read = messageObject.timestamp_read;
        this.attachments = messageObject.attachments;
        this.formatted_time = this.formatTime(this.timestamp_post.timestamp);
        if (this.attachments.length) {
            this.attachments = this.attachments.map(attachOrId => {
                if (typeof attachOrId === "string")
                    return rootStore.attachmentService.loadAttachmentInfo(attachOrId);
                else
                    return new Attachment(attachOrId);
            })
        }
    }


    async deliveryMessage() {
        try {
            const response = await rootStore.api.deliveryMessage(this.id);
            if (!response.ok) {
                console.log("mark delivered message failed")
            }
            return 200;
        } catch (err) {
            console.log(err);
        }
    }

    async readMessage() {
        try {
            const response = await rootStore.api.readMessage(this.id);
            if (!response.ok) {
                console.log("mark message readed failed")
            }
            return 200;
        } catch (err) {
            console.log(err);
        }
    }


    onViewport = () => {
        if (!this.fromMe && !this.timestamp_read) {
            this.readMessage();
        }

    };

    formatTime(timestamp) {
        const now = new Date(Date.now());
        let date = new Date(timestamp);
        const today = now.toDateString() === date.toDateString();
        const mins = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        if (today) {
            return date.getHours() + ":" + mins;
        } else {
            //  return date.getHours() + ":" + mins + " " + date.getDay() + "/" + date.getMonth() + "/" + (date.getFullYear() - 2000);
            return date.getHours() + ":" + mins;
        }
    }
}