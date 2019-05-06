import React from 'react';
import Message from './Message';
import rootStore from "../../store/RootStore";
import {observer} from "mobx-react";
import {Scrollbars} from 'react-custom-scrollbars';
import '../../css/IOS.css'
import {Hidden} from "@material-ui/core";

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%',
        overflow: 'auto',
        paddingTop: 15,
    },
    listMessages: {
        //marginLeft: 40,
        // marginBottom: 205,
        // marginTop: 23,
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
        this.messageList = React.createRef();
        this.accountStore = accountStore;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        if (prevProps.messages.length < this.props.messages.length) {
            const list = this.messageList.current;
            return list.scrollHeight - list.scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            const list = this.messageList.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }
    }

    componentDidMount() {
        const target = this.messageList.current;
        if (target != null) {
            target.onscroll = this.props.scrollHandler(target);
        }
    }


    componentWillUnmount() {
        const target = this.messageList.current;
        if (target != null) {
            target.onscroll = null;
        }
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

        const avatar_images = this.props.chatUsers.map(chatUser =>
            rootStore.imageService.images.find(elem => elem.userId === chatUser.id) || null
        );
        avatar_images.push(rootStore.imageService.images.find(elem => elem.userId === myUserId) || null)

        const messages = this.props.messages.map((message, i) => {
            let fromMe = message.from === myUserId;//int == string !!!
            const user = this.props.chatUsers.find(user => message.from === user.id);
            const avatar = avatar_images.find(elem => elem && elem.userId === message.from) || null;
            return (
                <Message
                    key={i}
                    userInfo={fromMe ? this.props.myselfUser : user}
                    message={message.message}
                    messageInfo={message}
                    fromMe={fromMe}
                    avatar={avatar}/>
            );
        });

        return (

            <div className={"scroll scrollMessageArea"} id='messageList' ref={this.messageList}>
                {messages}
                <div ref={this.messagesEnd}/>
            </div>

        );
    }
}

//export default withStyles(styles)(MessageList);

export default MessageList