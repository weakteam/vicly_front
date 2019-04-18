import {IP} from "../common";
import toastService from "./toastService";
import {when} from "mobx";

const NEW_MESSAGE = 0;
const USER_ACTIVITY = 10;

let websocket_url = `ws://${IP}/ws/`;

export default class WebsocketService {
    socket;
    running = false;

    constructor(RootStore) {
        this.rootStore = RootStore;
        when(
            () => this.rootStore.accountStore.token===0,
            ()=>this.disconnect(),
            {fireImmediately: true}
        );
    }


    run(tokennn) {
        if (this.running)
            return;
        let token = tokennn ? tokennn : this.rootStore.accountStore.token;
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
                alert('Обрыв соединения');
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
            default:
                break;
        }
    };

    disconnect() {
        this.socket.close(1000);
        this.running = false;
    }

}