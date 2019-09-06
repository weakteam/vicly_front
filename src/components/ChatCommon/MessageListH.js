import React, {useLayoutEffect, useRef, useState} from 'react';
import Message from './Message';
import rootStore from "../../store/RootStore";
import {observer} from "mobx-react";
import '../../css/IOS.css'
import '../../css/scrollbar.css'
import {contextMenu, Item, Menu} from "react-contexify";
import {Virtuoso} from "react-virtuoso";
import ScrollContainer from "./ScrollContainer";

const {accountStore} = rootStore;

const menuId = 'awesome';

const mapHeight = new Map();


function MessageListH(props) {
    const {chat} = props;
    const virtuoso = useRef(null);
    const list = useRef(null);
    let scrollTop = useRef(0);
    let oldScrollHeight = useRef(0);
    let scrollHeight = useRef(0);
    let clientHeight = useRef(0);
    const chatId = (rootStore.messagesStore.isCurrentChatForUser ? 'user' : 'group') + rootStore.messagesStore.currentChatId;
    if (!mapHeight.has(chatId))
        mapHeight.set(chatId, {scrollTop: NaN});

    const scrollHandler = (event) => {
        scrollTop.current = event.target.scrollTop;
        clientHeight.current = event.target.clientHeight;
        mapHeight.get(chatId).scrollTop = event.target.scrollTop;
        if (event.target) {
            if (scrollTop.current === 0) {
                scrolledOnTop.current = true;
                let chat1 = rootStore.messagesStore.getCurrentChatNew();
                chat1.nextPage();
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
    };

    let scroller = useRef(ScrollContainer(scrollHandler, ro));
    let scrolledOnTop = useRef(false);

    useLayoutEffect(() => {
        if (chat.direction === "append" && scrollTop.current + clientHeight.current >= oldScrollHeight.current - 40) {
            list.current.target.scrollTop = scrollHeight.current - clientHeight.current;
        }
        if (chat.direction === "prepend" && list.current && !rootStore.messagesStore.isChatChanged()) {
            list.current.target.scrollTop = scrollTop.current + scrollHeight.current - oldScrollHeight.current;
        }
    }, [scrollTop.current, clientHeight.current, scrollHeight.current]);

    useLayoutEffect(() => {
        let scrollT = mapHeight.get(chatId).scrollTop;
        if (scrollT === NaN && list.current) {
            list.current.target.scrollTop = scrollHeight.current;
        }
        if ((scrollT || scrollT === 0) && list.current) {
            list.current.target.scrollTop = scrollT
        }
        return () => {
            mapHeight.get(chatId).scrollTop = scrollTop.current
        };
    }, [rootStore.messagesStore.currentChatId, rootStore.messagesStore.isCurrentChatForUser]);

    const resizeHandler = (height) => {
        if (height === scrollHeight.current) return;
        oldScrollHeight.current = scrollHeight.current;
        scrollHeight.current = height;
    };

    // ----------------------------------//
    const myUserId = accountStore.userId;
    const users = chat.user && [chat.user] || chat.users;

    //FIXME group chats and user chats
    const avatar_images = users.map(chatUser =>
        rootStore.imageService.images.find(elem => elem.userId === chatUser.id) || null
    );
    avatar_images.push(rootStore.imageService.images.find(elem => elem.userId === myUserId) || null);

    const messages = chat.messages.map(message => {
        const user = users.find(user => message.from === user.id);
        const avatar = avatar_images.find(elem => elem && elem.userId === message.from) || null;
        return {
            key: message.id,
            userInfo: message.fromMe ? props.myselfUser : user,
            messageInfo: message,
            avatar: avatar
        }
    });

    const contexedMessage = useRef(null);

    function handleContextMenu(message) {
        return (e) => {
            e.preventDefault();

            contexedMessage.current = message;

            contextMenu.show({
                id: menuId,
                event: e
            });
        }
    }


    const MyMenu = ({menuId}) => {
        let message = contexedMessage;
        return (
            <Menu style={{zIndex: 1500}} id={menuId}>
                <Item onClick={() => (message)}>
                    Ответить
                </Item>
                <Item onClick={() => {
                    if (message.current.messageInfo.from !== rootStore.accountStore.userId) {
                        alert("You can't change foreign message!");
                    } else {
                        props.setChangingMode(message.current.messageInfo)
                    }

                }}>
                    Изменить
                </Item>
                <Item onClick={() => chat.messageDeleteHard(message.current.messageInfo)}>
                    Удалить
                </Item>
            </Menu>)
    };

    function rendererVirtuoso(index) {
        const message = messages[index];
        return (
            <Message
                key={message.messageInfo.id}
                userInfo={message.userInfo}
                messageInfo={message.messageInfo}
                avatar={message.avatar}
                changingMode={props.changingMessage && props.changingMessage.id === message.messageInfo.id}
                index={index}
                onContextMenu={handleContextMenu(message)}
            />
        );
    }

    return (
        <>
            <Virtuoso
                ScrollContainer={scroller.current}
                style={{width: '100%', height: '100%'}}
                overscan={200}
                totalCount={messages.length}
                item={rendererVirtuoso}
                ref={virtuoso}
                totalListHeightChanged={resizeHandler}
                computeItemKey={(index) => messages[index].key}
            />
            <MyMenu menuId={menuId} message={contexedMessage}/>
        </>
    );
}

export default observer(MessageListH);
