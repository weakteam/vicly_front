import React from 'react';
import {withStyles} from '@material-ui/styles';
import 'typeface-roboto';
import SendMessageBar from "../ChatCommon/SendMessageBar";
import MessageList from "../ChatCommon/MessageListH";
import ChatBar from "./ChatBar";
import {observer} from "mobx-react";
import rootStore from "../../store/RootStore";
import ThreadWindow from "../ChatCommon/ThreadWindow";
import GroupChatBar from "../ChatGroup/GroupChatBar";

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
        // overflow: 'hidden',
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

@observer
class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
        this.accountStore = accountStore;
        this.messageList = React.createRef();
        this.messagesEnd = React.createRef();
    }

    state = {
        fakeUpdated: false,
        chat: null
    };

    handleSendMessage = (message) => {
        this.props.chat.postMessage(message.message, message.attachments);
    };

    updateCount = 0;
    fakeUpdater = () => {
        const chat = rootStore.messagesStore.getCurrentChatNew();
        if (chat && !chat.fake) {
            this.setState({
                fakeUpdated: true,
                chat: chat
            });
            return;
        }
        if (this.updateCount++ < 10) {
            setTimeout(this.fakeUpdater, 500);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (messagesStore.isChatChanged() && this.messagesEnd.current) {
        //     this.messagesEnd.current.scrollIntoView({behavior: "smooth"});
        // }
        if (this.props.chat.fake && !this.state.chat) {
            this.fakeUpdater();
        }
    };

    componentDidMount() {
        if (this.props.chat.fake && !this.state.chat) {
            this.fakeUpdater();
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

        return (
            <div className={classes.chatWindow}>
                <ThreadWindow/>
                {
                    chat.chatType === "user" ?
                        <ChatBar match={chat.user.id} chat={chat}/>
                        :
                        <GroupChatBar chat={chat} match={chat.chatId}
                                      handleDrawerToggle={this.props.handleDrawerToggle}/>
                }
                {/*<ChatBar match={chat.user.id} chat={chat}/>*/}
                <MessageList
                    myselfUser={myselfUser}
                    chat={chat}
                    scrollHandler={this.scrollHandler}
                    messageEnd={this.messagesEnd}
                    ref={this.messageList}/>
                <SendMessageBar handleSendMessage={this.handleSendMessage}/>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true, index: 1})(ChatWindow);
