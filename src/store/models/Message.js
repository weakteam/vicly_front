import {observable} from "mobx";
import {BACKEND_URL} from "../../common";
import rootStore from "../RootStore";


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
        if (this.attachments.length) {
            this.attachments = this.attachments.map(id => rootStore.attachmentService.loadAttachmentInfo(id))
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
        if (!this.fromMe) {
            if (!this.timestamp_read) {
                this.readMessage();
            }
        }

    }
}