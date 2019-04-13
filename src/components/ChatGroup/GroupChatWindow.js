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

const {accountStore, messagesStore} = rootStore;


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
class GroupChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
        this.accountStore = accountStore;
        this.messageList = React.createRef();
    }


    componentDidMount() {
        console.log("componentDidMount chatWindow");
    }


    handleSendMessage = (message) => {
        this.messagesStore.postMessageInGroupChat(message.message, this.props.chat.chat_id);
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
        if (chat && chat.messages.length) {
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
                <div className={classes.chat}>
                    <GroupChatBar handleDrawerToggle={this.props.handleDrawerToggle}/>

                    {
                        messagesStore.messagesLoading ?
                            (
                                <Loader active inverted>Loading</Loader>
                            )
                            :
                            chat && messages && messages.length > 0 ? (
                                <div className={classes.list}>

                                    <MessageList
                                        myselfUser={myselfUser}
                                        chatUser={chat.user}
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

const styledWindow = withStyles(styles, {withTheme: true})(GroupChatWindow);

export default styledWindow;
