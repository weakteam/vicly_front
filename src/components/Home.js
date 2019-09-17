import React from 'react';
import {withStyles} from '@material-ui/core';
import ChatWindow from "./ChatUser/ChatWindow"
import {Route} from "react-router-dom";
import rootStore from "../store/RootStore";
import GroupChatWindow from "./ChatGroup/GroupChatWindow";
import ChatWindowEmpty from "./ChatCommon/ChatLoader";
import 'react-contexify/dist/ReactContexify.min.css';
import HomeScreen from './HomeScreen'
//import withSplashScreen from "./withSplashScreen";
import NavDrawer from "./NavDrawer";
import history from "../store/history";
import "../css/home.css"

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.handleLogoutFunc = this.accountStore.unauth.bind(accountStore);
    }

    renderChatWindow = () => {
        const chat = this.messagesStore.getCurrentChatNew();
        if (chat) {
            return (
                <ChatWindow chat={chat}/>
            )
        } else {
            rootStore.messagesStore.invalidateToHome();
            history.push("/home");
        }


    };

    renderGroupChatWindow = (routeProps) => {
        const chat = this.messagesStore.getCurrentChatNew();
        if (chat) {
            return (
                <GroupChatWindow
                    {...routeProps}
                    chat={chat}
                />
            )
        } else {
            return <ChatWindowEmpty/>
        }
    };

    renderChatWindowEmpty = (routeProps) => <ChatWindowEmpty/>;

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return false;
    // }

    render() {
        const {classes} = this.props;

        return (
            <>
                <NavDrawer changeThemeType={this.props.changeThemeType}/>
                <div className="content">
                    <Route exact path="/home" component={HomeScreen}/>
                    <Route path="/home/chat/(user|group)/:userId" render={this.renderChatWindow}/>
                    {/*<Route path="/home/chat/group/:chatId" render={this.renderGroupChatWindow}/>*/}
                </div>
            </>
        );
    }
}

export default withStyles(styles, {withTheme: true, index: 1})(Home);
