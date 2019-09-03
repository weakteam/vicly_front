import rootStore from "../../store/RootStore";
import React, {Component, useCallback, useLayoutEffect, useRef} from "react";
import {observer} from "mobx-react";
import Message from "./Message";
import {AutoSizer, CellMeasurer, CellMeasurerCache, List as VirtualizedList} from "react-virtualized";

// const _cache = new CellMeasurerCache({fixedWidth: true});

const mapHeight = new Map();

function MessageListV(props) {
    const {chat} = props;
    const myUserId = rootStore.accountStore.userId;
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

    const _setListRef = ref => {
        _listRef = ref;
    };
    let _listRef = useRef(null);
    let scrollTop = useRef(100000000);
    let scrollHeight = useRef(0);
    let clientHeight = useRef(0);
    let oldScrollHeight = useRef(0);
    let attachToBottom = useRef(true);

    const chatId = (rootStore.messagesStore.isCurrentChatForUser ? 'user' : 'group') + rootStore.messagesStore.currentChatId;
    if (!mapHeight.has(chatId))
        mapHeight.set(chatId, {
            scrollTop: NaN,
            cache: new CellMeasurerCache({
                fixedWidth: true, keyMapper: (rowIndex, colIndex) => {
                    let mes = messages[rowIndex];
                    return mes ? mes.id : rowIndex + "-" + colIndex;
                },
            })
        });
    let settings = mapHeight.get(chatId);


    useLayoutEffect(() => {
        // _listRef.current.scrollToRow(messages.length - 1);
        // return () => {
        //     _cache.clearAll();
        // }
    }, [rootStore.messagesStore.currentChatId, rootStore.messagesStore.isCurrentChatForUser]);
    useLayoutEffect(() => {
        // if (messages.length)
        //     _listRef.current.measureAllRows();
        oldScrollHeight.current = scrollHeight.current;
        scrollHeight.current =  _listRef.current.Grid.getTotalRowsHeight();
        // _listRef.current.scrollToPosition( _listRef.current.Grid.getTotalRowsHeight());
        // settings.cache.clearAll();
    });

    useLayoutEffect(() => {
        if (chat.direction === "append" && scrollTop.current + clientHeight.current === oldScrollHeight.current) {
            // list.current.target.scrollTop = scrollHeight.current - clientHeight.current;
            _listRef.current.scrollToPosition( _listRef.current.Grid.getTotalRowsHeight())
        }
        if (chat.direction === "prepend" && !rootStore.messagesStore.isChatChanged()) {
            // list.current.target.scrollTop = scrollTop.current + scrollHeight.current - oldScrollHeight.current;
            _listRef.current.scrollToPosition(scrollTop.current - oldScrollHeight.current +  _listRef.current.Grid.getTotalRowsHeight())
        }
    }, [scrollTop.current, clientHeight.current, scrollHeight.current]);


    let _onScroll = (params) => {
        // const {loadMoreRows, threshold} = props;
        if (!params.scrollHeight || !params.clientHeight) return;
        scrollHeight.current = params.scrollHeight;
        clientHeight.current = params.clientHeight;
        scrollTop.current = params.scrollTop;

        attachToBottom.current = scrollTop.current >= (scrollHeight.current - clientHeight.current);

        if (scrollTop.current <= (scrollHeight.current / 10)) {
            let chat1 = rootStore.messagesStore.getCurrentChatNew();
            chat1.nextPage();
        }

        // if (scrollTop <= threshold && !this.toggleScroll) {
        //     this.toggleScroll = true;
        //     setTimeout(() => this.toggleScroll = false, 300)
        //     loadMoreRows({clientHeight, scrollHeight, scrollTop});
        // }
    };

    // ----------------------------------//


    const _rowRenderer = ({index, isScrolling, key, parent, style}) => {
        const message = messages[index];
        return (
            <CellMeasurer
                cache={settings.cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
                style={style}
            >
                <Message
                    styl={style}
                    key={message.id}
                    userInfo={message.userInfo}
                    messageInfo={message.messageInfo}
                    avatar={message.avatar}
                    onContextMenu={() => {
                    }}
                />
            </CellMeasurer>
        );
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            marginTop: 10,
            marginBottom: 10,
            overflow: "auto",
            flex: '1 1 auto'
        }}>
            <AutoSizer>
                {({height, width}) => {
                    return (
                        <VirtualizedList
                            deferredMeasurementCache={settings.cache}
                            height={height}
                            overscanRowCount={1}
                            ref={_listRef}
                            rowCount={messages.length}
                            rowHeight={settings.cache.rowHeight}
                            estimatedRowSize={100}
                            rowRenderer={_rowRenderer}
                            width={width}
                            onScroll={_onScroll}
                            scrollToAlignment={"start"}
                            // scrollTop={scrollHeight.current}
                        />
                    );
                }}
            </AutoSizer>
        </div>
    )
}

export default observer(MessageListV);
