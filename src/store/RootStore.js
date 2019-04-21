import MessagesStore from "./MessagesStore";
import AccountStore from "./AccountStore";
import WebSocketService from "../services/websocketService";
import ImageService from "../services/imageService";

class RootStore {
    constructor() {
        this.imageService = new ImageService(this);
        this.accountStore = new AccountStore(this);
        this.messagesStore = new MessagesStore(this);
        this.webSocketService = new WebSocketService(this);
        this.accountStore.start();
    }
}

export default new RootStore();