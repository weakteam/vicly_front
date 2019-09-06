import {IP} from "../common";
import toastService from "./toastService";
import {autorun} from "mobx";

const NEW_MESSAGE = 0;
const DELETE_MESSAGE_HARD = 1;
const MARK_DELIVERY = 4;
const MARK_READ = 5;
const USER_ACTIVITY = 10;
const USER_ONLINE = 11;
const USER_OFFLINE = 12;
const NEW_GROUP_CHAT = 21;


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
            case NEW_MESSAGE:
                this.rootStore.messagesStore.addMessageToEnd(payload.message.message);
                break;
            case DELETE_MESSAGE_HARD:
                let chat = this.rootStore.messagesStore.findChatById(payload.message.chat.id);
                chat && chat.messageDelete(payload.message.id);
                break;
            case USER_ONLINE:
                this.rootStore.accountStore.showOnline(payload.message.id);
                break;
            case USER_OFFLINE:
                this.rootStore.accountStore.showOffline(payload.message.id);
                break;
            case MARK_DELIVERY:
                this.rootStore.messagesStore.onDeliveryMessage(payload.message);
                break;
            case MARK_READ:
                this.rootStore.messagesStore.onReadMessage(payload.message);
                break;
            case NEW_GROUP_CHAT:
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