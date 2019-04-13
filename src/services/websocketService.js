import {IP} from "../common";
import toastService from "./toastService";

const NEW_MESSAGE = 0;
const USER_ACTIVITY = 10;

let websocket_url = `ws://${IP}/ws/`;

export default class WebsocketService {
    socket;
    token;
    running = false;

    constructor(RootStore) {
        this.rootStore = RootStore;
    }


    run(token) {
        if (this.running)
            return;
        websocket_url += !!token ? token : "";
        // if (token) {
        //     throw Error("Cannot create websocket connection in unath session");
        // }
        this.running = true;
        this.token = token;

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
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения');
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
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
                toastService.toastNewMessage(payload.message.message);
                break;
            default:
                break;
        }
    };

    onError = (error) => {
        console.log(error);
    };

    updateMessageInChat = (chatId) => {
        // getAllMessages(chatId);
    };

    updateUserList = () => {
        // fetchChats();
    };

}