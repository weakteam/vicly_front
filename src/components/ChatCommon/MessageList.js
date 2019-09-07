import React from 'react';
import Message from './Message';
import rootStore from "../../store/RootStore";
import {observer} from "mobx-react";
import '../../css/IOS.css'
import '../../css/scrollbar.css'
import {contextMenu, Item, Menu} from "react-contexify";

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
        };
        this.lol = null;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        // if (prevProps.messages.length < this.props.messages.length) {
        const list = this.messageList.current;
        const {chat} = this.props;

    }

    async componentDidUpdate(prevProps, prevState) {
        const list = this.messageList.current;
        if (messagesStore.isChatChanged()) {
            list.scrollTop = list.scrollHeight;
            // this.scrollToBottom();
        }
        this.printTop("didupdate");
        if (this.lol) {
            if (this.lol.direction === "append" && this.lol.scrollT === this.lol.scrollH) {
                this.scrollToBottom();
            }
            if (this.lol.direction === "prepend") {
                list.scrollTop += list.scrollHeight - this.lol.scrollH;
            }
            console.log(JSON.stringify(this.lol));
        } else {
            this.scrollToBottom();
        }
    }

    scroll = () => {
        const list = this.messageList.current;
        if (list)
            list.scrollTop = list.scrollHeight - list.clientHeight;
    };
    scrollToBottom = () => setTimeout(this.scroll, 20);

    componentDidMount() {
        const list = this.messageList.current;
        if (list != null) {
            list.onscroll = this.scrollHandler(list);
        }

        if (this.lol) {
            if (this.lol.direction === "append") {
                this.scrollToBottom();
            }
            if (this.lol.direction === "prepend") {
                list.scrollTop += list.scrollHeight - this.lol.scrollH;
            }
            console.log(JSON.stringify(this.lol));
        } else {
            list.scrollTop = list.scrollHeight;
        }
        console.log("MessageList mounted #:");
    }


    componentWillUnmount() {
        const target = this.messageList.current;
        if (target != null) {
            target.onscroll = null;
        }
    }

    // scrollToBottom() {
    //     if (this.lastMessamessageEndge.current) {
    //         this.messageEnd.current.scrollIntoView({behavior: "instant"});
    //     } else {
    //         console.log("scroll failed !)?");
    //     }
    // }

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

    saveScrollPosition = () => {
        const {chat} = this.props;
        const list = this.messageList.current;
        if (list && list.scrollTop + list.clientHeight >= list.scrollHeight)
            this.lol = null; // FIXME return null if was been at bottom!!!
        else {
            if (list && chat.messages.length !== chat.prevMessageLength) {
                this.lol = {
                    direction: chat.direction,
                    scrollT: list.scrollTop,
                    scrollH: list.scrollHeight,
                    clientH: list.clientHeight
                }
            } else {
                this.lol = null;
            }
        }
    };

    printTop = (arg) => {
        const list = this.messageList.current;
        if (list)
            console.log(arg + " scrollHeight:" + list.scrollHeight);
        else
            console.log(arg + " now havent list");
    };

    render() {
        this.saveScrollPosition();
        const {chat} = this.props;
        this.printTop("render");

        // Loop through all the messages in the state and create a Message component
        const myUserId = this.accountStore.userId;
        //FIXME group chats and user chats
        const avatar_images = [chat.user].map(chatUser =>
            rootStore.imageService.images.find(elem => elem.userId === chatUser.id) || null
        );
        avatar_images.push(rootStore.imageService.images.find(elem => elem.userId === myUserId) || null);

        const messages = chat.messages.map(message => {
            const user = [chat.user].find(user => message.from === user.id);
            const avatar = avatar_images.find(elem => elem && elem.userId === message.from) || null;
            return (
                <Message
                    key={message.id}
                    userInfo={message.fromMe ? this.props.myselfUser : user}
                    messageInfo={message}
                    avatar={avatar}
                    onContextMenu={this.handleContextMenu(message)}
                />
            )
        });

        return (
            <div style={{WebkitOverflowScrolling: 'touch'}} className="scrollbarMessages" id="style-2"
                 ref={this.messageList}>
                <div className="scroll scrollMessageArea" id='messageList'>
                    {messages}
                    <div ref={this.messageEnd}/>
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
