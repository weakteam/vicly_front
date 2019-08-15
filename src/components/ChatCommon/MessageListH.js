import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Message from './Message';
import rootStore from "../../store/RootStore";
import {observer} from "mobx-react";
import '../../css/IOS.css'
import '../../css/scrollbar.css'
import {contextMenu, Item, Menu} from "react-contexify";
import {Virtuoso} from "react-virtuoso";
import ScrollContainer from "./ScrollContainer";

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

let top = 0;

// Here come the magic
function handleContextMenu(message) {
    return (e) => {
        // always prevent default behavior
        e.preventDefault();

        // Don't forget to pass the id and the event and voila!
        contextMenu.show({
            id: menuId,
            event: e,
            message: message
        });
    };
}

function MessageListH(props) {
    const {chat} = props;
    const virtuoso = useRef(null);
    const list = useRef(null);
    let scrollTop = useRef(0);
    let scrollHeight = useRef(0);
    let clientHeight = useRef(0);

    const scrollHandler = (event) => {
        scrollTop.current = event.target.scrollTop;
        clientHeight.current = event.target.clientHeight;
        if (event.target) {
            if (scrollTop.current <= (scrollHeight.current / 10) && !scrolledOnTop.current) {
                scrolledOnTop.current = true;
                chat.nextPage();
                //alert("IAMONTOPFUCKU");
            } else if (scrollTop.current > (scrollHeight.current / 10) && scrolledOnTop.current) {
                scrolledOnTop.current = false;
            }
        }
    };

    const ro = (entries) => {
        let elem = entries[0];
        if (!list.current) {
            list.current = elem;
        }
        clientHeight.current = elem.clientHeight;
    }

    let scroller = useRef(ScrollContainer(scrollHandler, ro));
    let scrolledOnTop = useRef(false);

    const resizeHandler = (height) => {
        console.log("full list srollHeight:" + height);
        console.log("full list srollTop:" + scrollTop.current);

        if(rootStore.messagesStore.isChatChanged()){
            // virtuoso.current.scrollToIndex({index: messages.length, align: "end"});
        }

        if (chat.direction === "append" && scrollTop.current + clientHeight.current === scrollHeight.current) {
            virtuoso.current.scrollToIndex({index: messages.length-1, align: "end"});
            list.current.target.scrollTop = height;
        }
        if (chat.direction === "prepend" && list.current) {
            list.current.target.scrollTop += scrollTop.current - scrollHeight.current;
        }
        scrollHeight.current = height
    };

    // ----------------------------------//
    const myUserId = accountStore.userId;
    //FIXME group chats and user chats
    const avatar_images = [chat.user].map(chatUser =>
        rootStore.imageService.images.find(elem => elem.userId === chatUser.id) || null
    );
    avatar_images.push(rootStore.imageService.images.find(elem => elem.userId === myUserId) || null);

    const messages = chat.messages.map(message => {
        const user = [chat.user].find(user => message.from === user.id);
        const avatar = avatar_images.find(elem => elem && elem.userId === message.from) || null;
        return {
            key: message.id,
            userInfo: message.fromMe ? props.myselfUser : user,
            messageInfo: message,
            avatar: avatar
        }
    });

    function rendererVirtuoso(index) {
        const message = messages[index];
        return (
            <Message
                key={message.id}
                userInfo={message.userInfo}
                messageInfo={message.messageInfo}
                avatar={message.avatar}
                index={index}
                onContextMenu={() => {
                }}
            />

        );
    }

    return (
        <Virtuoso
            ScrollContainer={scroller.current}
            style={{width: '100%', height: '100%', marginTop: 10, marginBottom: 10}}
            overscan={100}
            totalCount={messages.length}
            item={rendererVirtuoso}
            ref={virtuoso}
            heightCallback={resizeHandler}
        />
    );
}

export default observer(MessageListH);
