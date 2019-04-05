import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import SendMessageBar from "./SendMessageBar";
import MessageList from "./MessageList";
import ChatBar from "./ChatBar";
import chatsStore from "../store/ChatsStore";
import messagesStore from "../store/MessagesStore"
import {observer} from "mobx-react";
import accountStore from "../store/AccountStore";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
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
    empty: {},
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    list: {
        [theme.breakpoints.down('xs')]: {
            paddingTop: 65,
        },
        paddingTop: 6,
        paddingBottom: 55,
    },

});

@observer
class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.chatsStore = chatsStore;
        this.messagesStore = messagesStore;
        this.accountStore = accountStore;
        this.messageList = React.createRef();
    }

    equalMessages = (msg1, msg2) => {
        return msg1.id === msg2.id;
    };

    equalMsgArrays = (arr1, arr2) => {
        if (arr1.length !== arr2.length)
            return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].id !== arr2[i].id)
                return false;
        }
    };

    componentDidMount() {
        console.log("componentDidMount chatWindow");
        console.log("props:" + this.props);

        // if (this.messagesEnd.current) {
        //     this.scrollToBottom();
        // }
    }


    handleSendMessage = (message) => {
        console.log("send message!!!");
        this.messagesStore.postMessage(message.message, this.chatsStore.currentChatId);
        this.scrollToBottom();
    };

    scrollToBottom = () => {
        //this.messagesEnd.current.scrollIntoView({behavior: "smooth"});
        //TODO scroll child
        if (this.messageList.current) {
            this.messageList.current.scrollToEnd();
        }
    };

    componentWillMount() {
        //this.messagesStore.getAllMessagesByChatId(this.chatsStore.currentChatId);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // Need update ChatsStore too
        // I THINK FIXED
        // const router_chat_id = parseInt(this.props.match.params.chat_id, 10);
        // if (router_chat_id !== this.chatsStore.currentChatId) {
        //     this.chatsStore.currentChatId = router_chat_id;
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesStore.loadMessagesByChatId(this.chatsStore.currentChatId, 'user');
        let messages = this.messagesStore.messages.find(elem => elem.chatId === this.chatsStore.currentChatId);
        let self = this;
        if (messages) {
            messages.messages.forEach((elem) => {
                if (elem.from !== self.accountStore.userId) {
                    if (!elem.timestamp_delivery) {
                        self.messagesStore.deliveryMessage(elem.id, 1, 'user');
                    }
                    if (!elem.timestamp_read) {
                        self.messagesStore.readMessage(elem.id, 'user');

                    }
                }
            });
            if (messages.messages.length) {
                this.scrollToBottom();
            }
        }

        // if(this.props.chatMessages){
        //     let props = this.props;
        //     this.props.chatMessages.forEach((msg, i, arr) => {
        //         if(!msg.timestamp_read){
        //             props.markAsRead(msg.id, this.props.userId);
        //         }
        //     })
        // }

        //this.props.getAllMessages(this.props.userId);
    };

    render() {
        const {classes} = this.props;
        const myselfUser = {
            fullName: this.accountStore.fullName,
            userId: this.accountStore.userId
        };
        if (this.chatsStore.currentChatId) {
            let chatUser = this.chatsStore.userChats.find((elem) => elem.user.id === this.chatsStore.currentChatId);
            let messages = null;
            if (chatUser) {
                chatUser = chatUser.user;
                chatUser.fullName = chatUser.first_name + " " + chatUser.last_name;
                messages = this.messagesStore.messages.find((elem) => elem.chatId === this.chatsStore.currentChatId);
            }
            return (
                <div className={classes.chat}>
                    <ChatBar handleDrawerToggle={this.props.handleDrawerToggle}/>

                    {
                        messages && messages.messages.length > 0 ? (
                            <div className={classes.list}>

                                <MessageList
                                    myselfUser={myselfUser}
                                    chatUser={chatUser}
                                    messages={messages}
                                    ref={this.messageList}/>
                            </div>
                        ) : (
                            <div className={classes.emptyChat}>
                                <Typography className={classes.text} variant="h5">История сообщения
                                    пуста...</Typography>
                            </div>
                        )
                    }

                    <SendMessageBar handleSendMessage={this.handleSendMessage.bind(this)}/>
                </div>
            )
        } else {
            return (
                <div className={classes.emptyChat}>
                    <div className={classes.empty}>
                        <Typography variant="h5" className={classes.text}>Выберите диалог...</Typography>
                    </div>
                </div>
            );
        }
    }
}

const styledWindow = withStyles(styles, {withTheme: true})(ChatWindow);

export default styledWindow;
