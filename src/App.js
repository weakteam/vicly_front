import React, {Component} from 'react';
import './App.css';
import Login from "./components/login/LoginForm";
import Home from "./components/Home";
import {Router, Redirect, Route, Switch} from "react-router-dom";
import {PrivateRoute} from 'react-router-with-props';
import {observer} from "mobx-react";
import InviteForm from "./components/InviteForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DevTools from "mobx-react-devtools";
import rootStore from "./store/RootStore";
import history from "./store/history"
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import InviteIcon from "./components/InviteIcon"
import ChatWindow from "./components/ChatUser/ChatWindow";
import InviteLogin from "./components/login/InviteLogin";

if (history.location.pathname.startsWith("/home/chat/user")) {
    rootStore.messagesStore.isCurrentChatForUser = true;
    rootStore.messagesStore.currentChatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
} else if (history.location.pathname.startsWith("/home/chat/group")) {
    rootStore.messagesStore.isCurrentChatForUser = false;
    rootStore.messagesStore.currentChatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
}
history.listen((location, action) => {
    if (history.location.pathname.startsWith("/home/chat/user")) {
        rootStore.messagesStore.isCurrentChatForUser = true;
        rootStore.messagesStore.currentChatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
    }else if (history.location.pathname.startsWith("/home/chat/group")) {
        rootStore.messagesStore.isCurrentChatForUser = false;
        rootStore.messagesStore.currentChatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
    }
});

const themeOptions = {
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: "#ffffff",
            main: "#43a296", //аппбар и серчбар
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
            disabled: "rgba(110,190,134,0.38)",
            hint: "rgba(0, 0, 0, 0.38)",
        },
        background: {
            paper: "#f7f7f7",
            default: "#fcfcfc",
        },
        action: {
            active: "rgb(72, 170, 210)",
            hover: "rgba(198,190,200,0.21)",
            hoverOpacity: 0.08,
            selected: "rgba(60, 60, 60, 0.08)",
            disabled: "rgba(158, 158, 158, 0.68)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
        },
        type: rootStore.accountStore.theme,
    },
};

@observer
class App extends Component {
    websocketService;

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

    // componentWillMount() {
    //     this.websocketService = new WebsocketService(this.addMessage.bind(this));
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (AccountStore.status === "authed") {
    //         messagesStore.fetchChats()
    //     }
    // }


    changeThemeType() {
        this.setState((prevState) => {
            rootStore.accountStore.setTheme(!(prevState.themeOpt.palette.type === "light"));
            prevState.themeOpt.palette.type = prevState.themeOpt.palette.type === "dark" ? "light" : "dark";
            return prevState;
        });
    };

    render() {

        const theme = createMuiTheme(this.state.themeOpt);

        console.log(this.props);
        const authStatus = rootStore.accountStore.status === "authed";
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Router history={history}>
                        {
                            authStatus ?
                                (
                                    <Switch>
                                        <Route path="/home" render={() => <Home
                                            changeThemeType={this.changeThemeType.bind(this)}/>}/>
                                        <Route render={() => <Redirect to="/home"/>}/>

                                    </Switch>
                                )
                                :
                                (
                                    <Switch>
                                        <Route exact path="/login" component={Login}/>
                                        <Route path="/login/invite/:uuid"
                                               render={(routeProps) =>
                                                   <InviteLogin
                                                       {...routeProps}
                                                   />}/>
                                        <Route render={() => <Redirect to="/login"/>}/>
                                    </Switch>
                                )
                        }
                    </Router>
                    <ToastContainer position="bottom-right"/>
                </div>
            </MuiThemeProvider>
        )

    }
}

export default App;