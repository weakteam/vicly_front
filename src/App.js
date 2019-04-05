import React, {Component} from 'react';
import './App.css';
import Login from "./components/login/LoginForm";
import Home from "./components/Home";
import {Router, Redirect, Route, Switch} from "react-router-dom";
import {PrivateRoute} from 'react-router-with-props';
import {observer} from "mobx-react";
import InviteForm from "./components/login/InviteForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DevTools from "mobx-react-devtools";
import rootStore from "./store/RootStore";
import history from "./store/history"

if(history.location.pathname.startsWith("/home/chat")){
    rootStore.messagesStore.currentChatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
}
history.listen((location, action) => {
    if(history.location.pathname.startsWith("/home/chat")){
        rootStore.messagesStore.currentChatId = parseInt(history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1), 10);
    }
});

@observer
class App extends Component {
    websocketService;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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

    render() {
        console.log(this.props);
        const login = rootStore.accountStore.status === "authed";
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute path="/home"
                                      redirectTo="/login"
                                      authed={login}
                                      component={Home}
                                    /*  render={() => <Home/>}*//>
                        <PrivateRoute exact path="/login"
                                      component={Login}
                                      redirectTo="/home"
                                      authed={!login}/>
                        <Route exact path="/invite/:invite_id" component={InviteForm}/>
                        <Route render={() => <Redirect to="/home"/>}/>
                    </Switch>
                </Router>
                <ToastContainer position="bottom-right"/>
                <DevTools/>
            </div>
        )

    }
}

export default App;