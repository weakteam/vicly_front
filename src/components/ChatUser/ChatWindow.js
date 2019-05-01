import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';
import 'typeface-roboto';
import SendMessageBar from "../ChatCommon/SendMessageBar";
import MessageList from "../ChatCommon/MessageList";
import ChatBar from "./ChatBar";
import {observer} from "mobx-react";
import rootStore from "../../store/RootStore";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import ChatWindowEmpty from "../ChatCommon/ChatLoader";
import AttachmentBar from "../ChatCommon/AttachmentBar";

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
        height: '100%',
        overflow: 'hidden',
        padding: '55px 0 58px 20px',
      [theme.breakpoints.down('md')]: {
            padding: '55px 20px 60px 20px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '111px 5px 60px 20px',
        },
    },
});

@observer
class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
        this.accountStore = accountStore;
        this.messageList = React.createRef();
    }

    componentDidMount() {
        window.onscroll = () => {
            if (window.pageYOffset === 0) {
                this.props.chat.loadMessages(++this.props.chat.page);
                //messagesStore.nextPage("user", this.messagesStore.currentChatId);
                alert('I AM AT THE TOP');
            }
        };
    };

    componentWillUnmount() {
        window.onscroll = null;
    };

    scrollHandler = (target) => {
        let scrolledOnTop = false;
        return () => {
            console.log(target.scrollTop);
            if (target.scrollTop <= 500 && !scrolledOnTop) {
                scrolledOnTop = true;
                this.props.chat.nextPage();
                alert("IAMONTOPFUCKU");
            } else if (target.scrollTop > 500 && scrolledOnTop) {
                scrolledOnTop = false;
            }
        };
    };

    handleSendMessage = (message) => {
        console.log("send message!!!");
        this.messagesStore.postMessageToUser(message.message, this.props.chat.user.id);
        this.scrollToBottom();
    };

    scrollToBottom = () => {
        //this.messagesEnd.current.scrollIntoView({behavior: "smooth"});
        //TODO scroll child
        if (this.messageList.current) {
            this.messageList.current.scrollToEnd();
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {chat} = this.props;
        if (chat !== prevProps.chat) {
            this.scrollToBottom();
        }
    };

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
            return (
                <div className={classes.chatWindow}>
                    <ChatBar match={this.props.match.params.userId} handleDrawerToggle={this.props.handleDrawerToggle}/>
                    {
                        messagesStore.messagesLoading ?
                            (
                                <Loader active inverted>Loading</Loader>
                            ) : chat && messages && messages.length > 0 ? (
                                <MessageList
                                    myselfUser={myselfUser}
                                    chatUsers={[chat.user]}
                                    messages={messages}
                                    scrollHandler={this.scrollHandler}
                                    ref={this.messageList}/>
                            ) : (
                                <div className={classes.emptyChat}>
                                    <Typography className={classes.text} variant="h5">
                                        История сообщения пуста...
                                    </Typography>
                                </div>
                            )
                    }
                    {/*   <AttachmentBar/>*/}
                    <SendMessageBar handleSendMessage={this.handleSendMessage.bind(this)}/>
                </div>
            )
        } else {
            return (<ChatWindowEmpty/>);
        }
    }
}

const styledWindow = withStyles(styles, {withTheme: true})(ChatWindow);
export default styledWindow;
