import {IP} from "../common";
import toastService from "./toastService";
import {autorun} from "mobx";

const MESSAGE_NEW = 0;
const MESSAGE_DELETE_HARD = 1;
const MESSAGE_CHANGED = 3;
const MESSAGE_MARK_DELIVERED = 4;
const MESSAGE_MARK_READED = 5;
const USER_ACTIVITY = 10;
const USER_ONLINE = 11;
const USER_OFFLINE = 12;
const GROUP_CHAT_NEW = 21;


export default class WebsocketService {
    socket;
    running = false;
    autoDisconnectDisposer = null;

    constructor(RootStore) {
        this.rootStore = RootStore;
    }


    run(tokennn) {
        if (!this.autoDisconnectDisposer) {
            this.autoDisconnectDisposer = autorun(
                () => {
                    if (this.rootStore.accountStore.token === null) {
                        this.disconnect();
                    }
                }
            );
        }

        if (this.running)
            return;
        let token = tokennn ? tokennn : this.rootStore.accountStore.token;
        let websocket_url = `ws://${IP}/ws/`;
        websocket_url += !!token ? token : "";
        // if (token) {
        //     throw Error("Cannot create websocket connection in unath session");
        // }
        this.running = true;

        this.socket = new WebSocket(websocket_url);
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = (err) => {
            console.log("websocket error:" + err);
        };
        this.socket.onopen = () => {
            console.log("ws connection opened!");
            let interval = setInterval(() => {

                switch (this.socket.readyState) {
                    //if open - pong
                    case 1:
                        this.socket.send(JSON.stringify({}));
                        break;
                    case 2:
                    case 3:
                        clearInterval(interval);

                }
            }, 30000);
        };

        this.socket.onclose = (event) => {
            if (event.code !== 1000) {
                //alert('Обрыв соединения');
                console.log("ws was closed with bad code:" + event.code);
            } else {
                console.log("ws was closed clean!");
            }

            //alert('Код: ' + event.code + ' причина: ' + event.reason);
            if (token) {
                this.running = false;
                this.run();
            }
        };
    }

    onMessage = (message) => {
        console.log("websocket message:" + message.data);
        const payload = JSON.parse(message.data);
        if (payload === {}) {
            console.log("ws pong");
            return;
        }
        switch (payload.event) {
            case MESSAGE_NEW:
                this.rootStore.messagesStore.addMessageToEnd(payload.message.message);
                break;
            case MESSAGE_DELETE_HARD:
                var chat = this.rootStore.messagesStore.findChatById(payload.message.chat.id);
                if (chat)
                    chat.messageDelete(payload.message.id);
                break;
            case MESSAGE_CHANGED:
                var chat = this.rootStore.messagesStore.findChatById(payload.message.chat.id);
                if (chat)
                    chat.messageChanged(payload.message.id, payload.message.new_text);
                break;
            case USER_ONLINE:
                this.rootStore.accountStore.showOnline(payload.message.id);
                break;
            case USER_OFFLINE:
                this.rootStore.accountStore.showOffline(payload.message.id);
                break;
            case MESSAGE_MARK_DELIVERED:
                this.rootStore.messagesStore.onDeliveryMessage(payload.message);
                break;
            case MESSAGE_MARK_READED:
                this.rootStore.messagesStore.onReadMessage(payload.message);
                break;
            case GROUP_CHAT_NEW:
                // console.log('NEW FUCKIN GROUP CHAT!!!!!' +payload.message.id);
                this.rootStore.messagesStore.addGroupChat(payload.message.id);
                break;
            default:
                break;
        }
    };

    disconnect() {

        this.socket.close(1000);
        this.running = false;
    }

}