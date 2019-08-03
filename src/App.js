import React, {Component} from 'react';
import './App.css';
import Login from "./components/login/LoginForm";
import Home from "./components/Home";
import {Router, Redirect, Route, Switch} from "react-router-dom";
import {observer} from "mobx-react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DevTools from "mobx-react-devtools";
import rootStore from "./store/RootStore";
import history from "./store/history"
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';
import InviteLogin from "./components/login/InviteLogin";
import withSplashScreen from "./components/withSplashScreen";

if (history.location.pathname.startsWith("/home/chat/user")) {
    const chatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
    rootStore.messagesStore.setCurrentChatId(chatId, true);
} else if (history.location.pathname.startsWith("/home/chat/group")) {
    const chatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
    rootStore.messagesStore.setCurrentChatId(chatId, false);
}
history.listen((location, action) => {
    if (history.location.pathname.startsWith("/home/chat/user")) {
        const chatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
        rootStore.messagesStore.setCurrentChatId(chatId, true);
    } else if (history.location.pathname.startsWith("/home/chat/group")) {
        const chatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
        rootStore.messagesStore.setCurrentChatId(chatId, false);
    }
});

const themeOptions = {
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: "#ffffff",
            main: "#0a8d8d", //аппбар и серчбар
            mainElem: "#075454",
            dark: "#1c212d",
            darkSecondary: '#323a4d',
            contrastText: "#fff",

        },
        secondary: {
            light: "#3f3f3f",
            lightIcons: "#565656",
            lightSecondary: "#3647a6",
            lightBadge: "#7fa66f",
            main: "#ffffff", //иконки
            dark: "#ffffff",
            darkSecondary: "#bebebe",
            darkBadge: "#ffffff",
            contrastText: "#000000",
        },
        text: {
            primary: "#1d1c28",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(103, 157, 189, 0.44)",
            hint: "rgba(0, 0, 0, 0.38)",
        },
        background: {
            paper: "#f7f7f7",
            default: "#fcfcfc",
        },
        action: {
            active: "#0A8D8D",
            hover: "rgba(198,190,200,0.21)",
            hoverOpacity: 0.08,
            selected: "#2d807f",
            disabled: "rgba(158, 158, 158, 0.68)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
        },
        type: rootStore.accountStore.theme,
    },
};

@observer
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            themeOpt: themeOptions
        }
    }

    setLoading = () => {
        this.setState({
            loading: true
        })
    };

    changeThemeType = () => {
        this.setState((prevState) => {
            rootStore.accountStore.setTheme(!(prevState.themeOpt.palette.type === "light"));
            prevState.themeOpt.palette.type = prevState.themeOpt.palette.type === "dark" ? "light" : "dark";
            return prevState;
        });
    };

    render() {
        const theme = createMuiTheme(this.state.themeOpt);
        const authStatus = rootStore.accountStore.status === "authed";
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <Router history={history}>
                        {
                            authStatus ?
                                (
                                    <Switch>
                                        <Route path="/home" render={() => <Home
                                            changeThemeType={this.changeThemeType}/>}/>
                                        <Route render={() => <Redirect to="/home"/>}/>
                                    </Switch>
                                )
                                :
                                (
                                    <Switch>
                                        <Route exact path="/login" component={Login}/>
                                        <Route path="/login/invite/:uuid"
                                               render={(routeProps) =>
                                                   <InviteLogin setLoading={this.setLoading}
                                                                {...routeProps}
                                                   />}/>
                                        <Route render={() => <Redirect to="/login"/>}/>
                                    </Switch>
                                )
                        }
                    </Router>
                    <div onClick={console.log('q')}><ToastContainer position="bottom-right"/></div>
                </div>
                <DevTools/>
            </ThemeProvider>
        )

    }
}

export default App;