import React from 'react';
import Message from './Message';
import '../css/MessageList.css'

import rootStore from "../store/RootStore";
import {observer} from "mobx-react";

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    listMessages: {
        marginLeft: 40,
        marginBottom: 205,
        marginTop: 23,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

@observer
class MessageList extends React.Component {
    constructor(props) {
        super(props);
        //console.log("messages:"+props.messages)
        this.messagesEnd = React.createRef();
        this.accountStore = accountStore;
    }

    componentDidUpdate() {
        // There is a new message in the state, scroll to bottom of list
        // const objDiv = document.getElementById('messageList');
        // objDiv.scrollTop = objDiv.scrollHeight;
        /*this.scrollToEnd();*/
    }

    scrollToEnd(smooth = false) {
        this.messagesEnd.current.scrollIntoView({behavior: smooth ? "smooth" : "instant"});
        // this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight;
    };

    render() {
        const {classes} = this.props;
        // Loop through all the messages in the state and create a Message component
        const myUserId = this.accountStore.userId;
        console.log("myUserId:" + myUserId);

        const messages = this.props.messages.map((message, i) => {
            let fromMe = message.from == myUserId;//int == string !!!
            return (
                <Message
                    key={i}
                    userInfo={fromMe ? this.props.myselfUser : this.props.chatUser}
                    message={message.message}
                    messageInfo={message}
                    fromMe={fromMe}/>
            );
        });

        return (
            <div>
                <div id='messageList'>
                    {messages}
                </div>
                <div ref={this.messagesEnd}/>
            </div>
        );
    }
}

//export default withStyles(styles)(MessageList);

export default MessageList