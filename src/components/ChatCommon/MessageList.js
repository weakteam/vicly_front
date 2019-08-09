import React from 'react';
import Message from './Message';
import rootStore from "../../store/RootStore";
import {observer} from "mobx-react";
import '../../css/IOS.css'
import '../../css/scrollbar.css'
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
        this.messageEnd = React.createRef();
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
        const {chat} = this.props;
        if (list && list.scrollTop + list.offsetHeight === list.scrollHeight)
            return null; // FIXME return null if was been at bottom!!!
        else if (chat.messages.length !== chat.prevMessageLength) {
            return {
                direction: chat.direction,
                scrollT: list.scrollTop,
                scrollH: list.scrollHeight,
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const list = this.messageList.current;
        if (messagesStore.isChatChanged()) {
            list.scrollTop = list.scrollHeight;
            // this.scrollToBottom();
        }
        if (snapshot) {
            if (snapshot.direction === "append" && snapshot.scrollT === snapshot.scrollH) {
                list.scrollTop = list.scrollHeight;
            }
            if (snapshot.direction === "prepend"){
                list.scrollTop += list.scrollHeight - snapshot.scrollH;
            }
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

    scrollToBottom() {
        if (this.lastMessamessageEndge.current) {
            this.messageEnd.current.scrollIntoView({behavior: "instant"});
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
        const {chat} = this.props;
        // Loop through all the messages in the state and create a Message component
        const myUserId = this.accountStore.userId;
        //FIXME group chats and user chats
        const avatar_images = [chat.user].map(chatUser =>
            rootStore.imageService.images.find(elem => elem.userId === chatUser.id) || null
        );
        avatar_images.push(rootStore.imageService.images.find(elem => elem.userId === myUserId) || null);

        const messages = chat.messages.map((message, i, arr) => {
            const user = [chat.user].find(user => message.from === user.id);
            const avatar = avatar_images.find(elem => elem && elem.userId === message.from) || null;
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
        });

        return (
            <div style={{WebkitOverflowScrolling: 'touch'}} className="scrollbarMessages" id="style-2"
                 ref={this.messageList}>
                <div className={"scroll scrollMessageArea"} id='messageList'>
                    {messages}
                    {/*<div ref={this.messageEnd}/>*/}
                </div>
                <MyMenu menuId={menuId}/>
                {/*<div>*/}
                {/*    <Typography variant="h5">*/}
                {/*        История сообщения пуста...*/}
                {/*    </Typography>*/}
                {/*</div>*/}
            </div>

        );
    }
}

export default MessageList
