import React from 'react';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessagePush from "../components/ChatCommon/MessagePush";

class ToastService {
    toasts = toast;
    queue = [];

    toastNewMessage(title, message, url, avatarSrc) {
        this.toast(<MessagePush title={title} message={message} url={url} avatar={avatarSrc}/>);
    }

    toast(component) {
        this.queue.push(this.toasts(
            component,
            {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: true,
                draggable: true,
                // Close directly after the enter transition
                autoClose: 100000,

            }
        ));
        if (this.queue.length>5){
            this.toasts.dismiss(this.queue.shift());
        }
    }
}

export default new ToastService()