import MessagesStore from "./MessagesStore";
import AccountStore from "./AccountStore";
import WebSocketService from "../services/websocketService";

class RootStore {
    constructor() {
        this.webSocketService = new WebSocketService(this);
        this.accountStore = new AccountStore(this);
        this.messagesStore = new MessagesStore(this);
    }
}

export default new RootStore();