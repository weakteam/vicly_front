import MessagesStore from "./MessagesStore";
import AccountStore from "./AccountStore";
import WebSocketService from "../services/websocketService";
import ImageService from "../services/imageService";
import ViclyApi from "./api/ViclyApi";
import AttachmentService from "../services/attachmentService";
import toastService from "../services/toastService";
import DownloadService from "../services/downloadService";

class RootStore {
    constructor() {
        this.imageService = new ImageService(this);
        this.accountStore = new AccountStore(this);
        this.attachmentService = new AttachmentService(this);
        this.downloadService = new DownloadService(this);
        this.api = new ViclyApi(this);
        this.messagesStore = new MessagesStore(this);
        this.webSocketService = new WebSocketService(this);
        this.accountStore.start();
        this.toastService = toastService;
    }
}

export default new RootStore();