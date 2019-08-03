import React from 'react';
import Message from './Message';
import rootStore from "../../store/RootStore";
import {observer} from "mobx-react";
import '../../css/IOS.css'
import '../../css/scrollbar.css'
import VisibilitySensor from "react-visibility-sensor";
import {contextMenu, Item, Menu} from "react-contexify";

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

const menuId = 'awesome';

const MyMenu = ({menuId, message}) => {
    console.log(JSON.stringify(message, null, 2));

    return (<Menu id={menuId}>
        <Item onClick={() => alert("lol")}>
            <span>🔷</span>
            Ответить
        </Item>
        <Item onClick={() => alert('red')}>
            <span>🛑</span>
            Изменить
        </Item>
        <Item onClick={() => alert('red')}>
            <span>🛑</span>
            Удалить
        </Item>
    </Menu>)
};


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
        // if (prevProps.messages.length < this.props.messages.length) {
        const list = this.messageList.current;
        if (list && list.scrollTop + list.offsetHeight === list.scrollHeight)
            return null;
        if (this.props.messages.length !== prevProps.messages.length) {
            if (this.props.messages[0] !== prevProps.messages[0]) {
                return {
                    isUpper: true,
                    scrollT: list.scrollTop,
                    scrollH: list.scrollHeight,
                }
            } else {
                return {
                    isUpper: false,
                    scrollT: list.scrollTop,
                    scrollH: list.scrollHeight,
                }
            }
        }
        return {
            scrollT: list.scrollTop,
            scrollH: list.scrollHeight,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const list = this.messageList.current;
        if (snapshot) {
            if (snapshot.isUpper === true) {
                list.scrollTop += list.scrollHeight - snapshot.scrollH;
            } else if (snapshot.isUpper === false) {
                list.scrollTop = snapshot.scrollT;
            } else if (snapshot.scrollH === list.scrollHeight) {
                return;
            }
        } else {
            list.scrollTop = list.scrollHeight;
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
        // this.messagesEnd.current.scrollIntoView({behavior: smooth ? "smooth" : "instant"});
        this.messageList.current.scrollTop = this.messageList.current.scrollHeight;
        // this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight;
    };

    scrollToLastMessage(smooth = false) {
        if (this.lastMessage.current) {
            this.lastMessage.current.scrollIntoView({behavior: smooth ? "smooth" : "instant"});
        } else {
            console.log("scroll failed !)?");
        }
    }

    // Here come the magic
    handleContextMenu = (message) => (e) => {
        // always prevent default behavior
        e.preventDefault();

        // Don't forget to pass the id and the event and voila!
        contextMenu.show({
            id: menuId,
            event: e,
            message: message
        });
    };

    render() {
        const {classes} = this.props;
        // Loop through all the messages in the state and create a Message component
        const myUserId = this.accountStore.userId;
        const avatar_images = this.props.chatUsers.map(chatUser =>
            rootStore.imageService.images.find(elem => elem.userId === chatUser.id) || null
        );
        avatar_images.push(rootStore.imageService.images.find(elem => elem.userId === myUserId) || null);

        const messages = this.props.messages.map((message, i, arr) => {
            let fromMe = message.from === myUserId;
            const user = this.props.chatUsers.find(user => message.from === user.id);
            const avatar = avatar_images.find(elem => elem && elem.userId === message.from) || null;
            if (!fromMe && !message.timestamp_read) {
                return (
                    <VisibilitySensor active={!fromMe && !message.timestamp_read}
                                      onEnterViewport={message.onViewport}
                                      onChange={message.onViewport}>
                        <Message
                            key={message.id}
                            userInfo={fromMe ? this.props.myselfUser : user}
                            message={message.message}
                            messageInfo={message}
                            fromMe={fromMe}
                            avatar={avatar}
                            onContextMenu={this.handleContextMenu(message)}
                            ref={i === arr.length - 1 ? this.lastMessage : null}/>
                    </VisibilitySensor>
                );
            } else {
                return (
                    <Message
                        key={message.id}
                        userInfo={fromMe ? this.props.myselfUser : user}
                        message={message.message}
                        messageInfo={message}
                        fromMe={fromMe}
                        avatar={avatar}
                        onContextMenu={this.handleContextMenu(message)}
                        ref={i === arr.length - 1 ? this.lastMessage : null}/>
                )
            }

        });


        return (
            <div style={{WebkitOverflowScrolling: 'touch'}} className="scrollbarMessages" id="style-2"
                 ref={this.messageList}>
                <div className={"scroll scrollMessageArea"} id='messageList'>
                    {messages}
                    <div ref={this.messagesEnd}/>
                </div>
                <MyMenu menuId={menuId}/>
            </div>

        );
    }
}

//export default withStyles(styles)(MessageList);

export default MessageList