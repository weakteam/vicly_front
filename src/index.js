import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";


/*const themeOptions;*/

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#ffffff",
            main: "#fffffc", //аппбар и серчбар
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
        type: "dark",
    },

});

/*let theme = createMuiTheme(themeOptions);

 const changeThemeType = () => {
     themeOptions.palette.type = themeOptions.palette.type === "dark" ? "light" : "dark";
     theme = createMuiTheme(themeOptions)
 };*/

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(
            <App/>,
            document.getElementById('root')
        );
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
