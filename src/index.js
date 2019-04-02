import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import allReducers from './store/reducers/rootReducer'
import thunk from "redux-thunk";
import Provider from "react-redux/es/components/Provider";
import 'semantic-ui-css/semantic.min.css';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    allReducers,
    composeEnhancer(applyMiddleware(thunk)),
);

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#ffffff",
            main: "#363b41", //аппбар и серчбар
            mainElem: "#075454",
            dark: "#5ab2ff",
            contrastText: "#fff",

        },
        secondary: {
            light: "#d1d1d1",
            main: "#ffffff", //иконки
            dark: "#798bc5",
            contrastText: "#000000",
        },
        text: {
            primary: "#1d1c28",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)",
        },
        background: {
            paper: "#f7f7f7",
            default: "#fcfcfc",
        },
        action: {
            active: "rgb(72, 170, 210)",
            hover: "rgba(72, 170, 210, 0.21)",
            hoverOpacity: 0.08,
            selected: "rgba(72, 170, 210, 0.68)",
            disabled: "rgba(158, 158, 158, 0.68)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
        },
    },

});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(
            <Provider> store={store}>
                <MuiThemeProvider theme={theme}>
                    <App/>
                </MuiThemeProvider>
            </Provider>,
            document.getElementById('root')
        );
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
