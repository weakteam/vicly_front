import React from 'react';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessagePush from "../components/ChatCommon/MessagePush";

class ToastService {
    toasts = toast;

    toastNewMessage(title, message, url){
        this.toast(<MessagePush title={title} message={message} url={url}/>);
    }

    toast(component) {
        this.toasts(
            component,
            {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: true,
                draggable: true,
                // Close directly after the enter transition
                autoClose: 2000,

            }
        );
    }
}

export default new ToastService()