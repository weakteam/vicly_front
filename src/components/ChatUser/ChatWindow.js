import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';
import 'typeface-roboto';
import SendMessageBar from "../ChatCommon/SendMessageBar";
import MessageList from "../ChatCommon/MessageList";
import ChatBar from "./ChatBar";
import {observer} from "mobx-react";
import rootStore from "../../store/RootStore";
import ThreadWindow from "../ChatCommon/ThreadWindow";

const {accountStore, messagesStore} = rootStore;
const styles = theme => ({
    emptyChat: {
        top: 40,
        bottom: 0,
        right: 0,
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },
        left: 400,
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
    },
    chatWindow: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '59px 0 57px 20px',
        overflow: 'hidden',
        [theme.breakpoints.down('md')]: {
            // left: 280,
            padding: '60px 20px 57px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            // left: 250
        },
        [theme.breakpoints.down('xs')]: {
            //left: 0,
            //  top: 55,
            padding: '109px 5px 57px 5px',
        },
        // height: '100%',

    },
});

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
        this.accountStore = accountStore;
        this.messageList = React.createRef();
        this.messagesEnd = React.createRef();
    }

    scrollHandler = (target) => {
        let scrolledOnTop = false;
        return () => {
            if (target.scrollTop <= (target.scrollHeight / 10) && !scrolledOnTop) {
                scrolledOnTop = true;
                this.props.chat.nextPage();
                //alert("IAMONTOPFUCKU");
            } else if (target.scrollTop > (target.scrollHeight / 10) && scrolledOnTop) {
                scrolledOnTop = false;
            }
        };
    };

    handleSendMessage = (message) => {
        this.props.chat.postMessage(message.message, message.attachments);
        // this.scrollToBottom();
    };

    // scrollToBottom = () => {
    //     this.messagesEnd.current.scrollIntoView({behavior: "smooth"});
    //     //TODO scroll child
    //     // if (this.scrollMessageList.current) {
    //     //     this.scrollMessageList.current.scrollToEnd();
    //     //     // this.scrollMessageList.current.scrollToLastMessage();
    //     // }
    // };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (messagesStore.isChatChanged()) {
            // this.scrollToBottom();
        }
    };

    componentDidMount() {
        if (messagesStore.isChatChanged()) {
            // this.scrollToBottom();
        }
    }

    render() {
        const {classes, chat} = this.props;
        const myselfUser = {
            fullName: this.accountStore.fullName,
            first_name: this.accountStore.first_name,
            last_name: this.accountStore.last_name,
            userId: this.accountStore.userId
        };
        let messages = null;
        if (chat) {
            messages = chat.messages;
        }
        return (
            <div className={classes.chatWindow}>
                <ThreadWindow/>
                <ChatBar match={chat.user.id} chat={chat}/>
                <SendMessageBar handleSendMessage={this.handleSendMessage}/>
                {
                    messagesStore.messagesLoading ?
                        (<Typography>загрузачка</Typography>)
                        :
                        chat && messages && messages.length > 0 ?
                            (
                                <MessageList
                                    myselfUser={myselfUser}
                                    chatUsers={[chat.user]}
                                    messages={messages}
                                    scrollHandler={this.scrollHandler}
                                    ref={this.messageList}/>
                            )
                            :
                            (
                                <div className={classes.emptyChat}>
                                    <Typography className={classes.text} variant="h5">
                                        История сообщения пуста...
                                    </Typography>
                                </div>
                            )
                }

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true, index: 1})(ChatWindow);
