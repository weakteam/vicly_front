import React from 'react';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessagePush from "../components/MessagePush";

class ToastService {
    toasts = toast;

    toastNewMessage(message){
        this.toast(<MessagePush message={message}/>);
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