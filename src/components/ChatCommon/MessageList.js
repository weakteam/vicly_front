import React from 'react';
import Message from './Message';
import rootStore from "../../store/RootStore";
import {observer} from "mobx-react";
import '../../css/IOS.css'
import '../../css/scrollbar.css'
import VisibilitySensor from "react-visibility-sensor";
import {contextMenu, Item, Menu} from "react-contexify";
import Typography from "@material-ui/core/Typography";

const {accountStore, messagesStore} = rootStore;

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
        this.messageList = React.createRef();
        this.accountStore = accountStore;
        this.state = {
            messageLength: 0
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        // if (prevProps.messages.length < this.props.messages.length) {
        const list = this.messageList.current;
        if (list && list.scrollTop + list.offsetHeight === list.scrollHeight)
            return null; // FIXME return null if was been at bottom!!!
        else {
            return {
                scrollT: list.scrollTop,
                scrollH: list.scrollHeight,
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const list = this.messageList.current;
        if (snapshot) {
            console.log(JSON.stringify(snapshot));
        } else {
            list.scrollTop = list.scrollHeight;
        }
    }

    componentDidMount() {
        const target = this.messageList.current;
        if (target != null) {
            target.onscroll = this.scrollHandler(target);
        }
        console.log("MessageList mounted #:");
    }


    componentWillUnmount() {
        const target = this.messageList.current;
        if (target != null) {
            target.onscroll = null;
        }
    }

    scrollToEnd() {
        this.messageList.current.scrollTop = this.messageList.current.scrollHeight;
    };

    scrollToLastMessage(smooth = false) {
        if (this.lastMessage.current) {
            this.lastMessage.current.scrollIntoView({behavior: smooth ? "smooth" : "instant"});
        } else {
            console.log("scroll failed !)?");
        }
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
        const {classes, chat} = this.props;
        // Loop through all the messages in the state and create a Message component
        const myUserId = this.accountStore.userId;
        //FIXME group chats and user chats
        const avatar_images = [chat.user].map(chatUser =>
            rootStore.imageService.images.find(elem => elem.userId === chatUser.id) || null
        );
        avatar_images.push(rootStore.imageService.images.find(elem => elem.userId === myUserId) || null);

        const messages = this.props.messages.map((message, i, arr) => {
            const user = [chat.user].find(user => message.from === user.id);
            const avatar = avatar_images.find(elem => elem && elem.userId === message.from) || null;
            if (!message.fromMe && !message.timestamp_read) {
                return (
                    <VisibilitySensor active={true}
                                      onEnterViewport={message.onViewport}
                                      onChange={message.onViewport}>
                        <Message
                            key={message.id}
                            userInfo={message.fromMe ? this.props.myselfUser : chat.user}
                            message={message.message}
                            messageInfo={message}
                            fromMe={message.fromMe}
                            avatar={avatar}
                            // onContextMenu={this.handleContextMenu(message)}
                            ref={i === arr.length - 1 ? this.lastMessage : null}/>
                    </VisibilitySensor>
                );
            } else {
                return (
                    <Message
                        key={message.id}
                        userInfo={message.fromMe ? this.props.myselfUser : user}
                        message={message.message}
                        messageInfo={message}
                        fromMe={message.fromMe}
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
                    <div ref={this.props.messagesEnd}/>
                </div>
                <MyMenu menuId={menuId}/>
                /////////////////////
                <div className={classes.emptyChat}>
                    <Typography className={classes.text} variant="h5">
                        История сообщения пуста...
                    </Typography>
                </div>
            </div>

        );
    }
}

export default MessageList
