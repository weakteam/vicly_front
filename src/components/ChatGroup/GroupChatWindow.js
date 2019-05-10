import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import SendMessageBar from "../ChatCommon/SendMessageBar";
import MessageList from "../ChatCommon/MessageList";
import {observer} from "mobx-react";
import rootStore from "../../store/RootStore";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import GroupChatBar from "./GroupChatBar"
import ChatWindowEmpty from "../ChatCommon/ChatLoader";

const {accountStore, messagesStore} = rootStore;
const styles = theme => ({
    chatWindow: {
        padding: '60px 0 57px 20px',
        [theme.breakpoints.down('md')]: {
            padding: '60px 20px 57px 20px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '115px 5px 57px 20px',
        },
        height: '100%',
        overflow: 'hidden',
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
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
});

@observer
class GroupChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
        this.accountStore = accountStore;
        this.messageList = React.createRef();
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
        this.props.chat.postMessage(message.message);
        this.scrollToBottom();
    };

    scrollToBottom = () => {
        //this.messagesEnd.current.scrollIntoView({behavior: "smooth"});
        //TODO scroll child
        if (this.messageList.current) {
            this.messageList.current.scrollToEnd();
            // this.messageList.current.scrollToLastMessage();
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {chat} = this.props;
        if (messagesStore.isChatChanged()) {
            this.scrollToBottom();
        }
    };

    componentDidMount() {
        const {chat} = this.props;
        if (messagesStore.isChatChanged()) {
            this.scrollToBottom();
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
        if (this.messagesStore.currentChatId) {
            let messages = null;
            if (chat) {
                messages = chat.messages;
            }
            let users = chat.user_ids.map(id => this.messagesStore.findUserByIdNew(id));
            return (
                <div className={classes.chatWindow}>
                    <GroupChatBar chat={this.props.chat} match={this.props.match.params.chatId} handleDrawerToggle={this.props.handleDrawerToggle}/>
                    {
                        messagesStore.messagesLoading ?
                            (
                                <Loader active inverted>Loading</Loader>
                            )
                            :
                            chat && messages && messages.length > 0 ? (
                                <MessageList
                                    myselfUser={myselfUser}
                                    chatUsers={users}
                                    messages={messages}
                                    scrollHandler={this.scrollHandler}
                                    ref={this.messageList}/>
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
                <ChatWindowEmpty />
            );
        }
    }
}

const styledWindow = withStyles(styles, {withTheme: true})(GroupChatWindow);
export default styledWindow;
