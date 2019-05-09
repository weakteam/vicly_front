import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import div from "@material-ui/core/Grid/Grid";
import {observer} from "mobx-react";
import Divider from "@material-ui/core/es/Divider/Divider";
import InputBase from "@material-ui/core/InputBase";
import {fade} from '@material-ui/core/styles/colorManipulator';
import Background from "../../images/login.jpg"
import Dark from "../../images/rer.jpg"
// import Background from "../../images/loginBack.jpg"
import rootStore from "../../store/RootStore";
import history from "../../store/history"
import LinearProgress from "@material-ui/core/LinearProgress";

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    root: {
        display: 'flex',
        top: 0,
        bottom: 0,
        right: 0,
        position: 'fixed',
        left: 0,
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            minHeight: '100%',
        },
        backgroundSize: 'cover',
        backgroundImage: 'url(' + Background + ')',
        backgroundColor: theme.palette.primary.main,
    },
    main: {
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.down('xs')]: {
            width: '95%',
        },
        width: 435,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        boxShadow: theme.shadows[12],
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: theme.shadows[0],
        backgroundColor: '#ffffff00',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    form: {
        //  width: '100%', // Fix IE 11 issue.
        padding: 30,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : '#1c212d'
            }`,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    submit: {
        width: '50%',
        boxShadow: theme.shadows[0],
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#66a1a6' : '#2e374c'
            }`,
        color: '#fff',
        '&:hover': {
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#3a6d71' : '#3e4b67'
                }`,
        },
    },
    invite: {
        boxShadow: theme.shadows[0],
        '&:hover': {
            backgroundColor: 'rgba(118,132,255,0.11)',
        },
    },
    active: {
        '&:focus': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('#9cabef', 0.25)} 0 0 0 0.2rem`,
        },
        '&:selected': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('#ff2f00', 0.25)} 0 0 0 0.2rem`,
        },
        marginTop: 19,
        borderRadius: 10,
        height: 30,
        paddingLeft: 10,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#e8e8e8' : 'rgb(59, 69, 93)'
            }`,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        color: ` ${
            theme.palette.type === 'light' ? '#a9a9a9' : theme.palette.secondary.dark
            }`,
    },
    password: {
        marginTop: 10,
    },
    remember: {
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    checkbox: {
        padding: 0,
        marginLeft: 5,
        /*color: ` ${
            theme.palette.mime === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,*/
    },
    header: {
        textAlign: 'center',
        fontSize: '1.6em',
        padding: 26,
        color: ` ${
            theme.palette.type === 'light' ? '#ffffff' : theme.palette.secondary.dark
            }`,
    },
    headerDiv: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? 'rgba(86, 160, 159, 0.31)' : 'rgba(46, 55, 76, 0.8)'
            }`,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    signIn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    inviteBut: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 7
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    checked: {
        '&:not($checked)': {
            color: '#000000',
        },
        '&$checked': {
            color: '#43a296',
        },
    },
    failedLogin: {
        textAlign: 'center', fontSize: '1rem', color: 'red', paddingTop: 26
    },
});

@observer
class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.history = history;
    }

    state = {
        loading: 0,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //const { login, password } = this.state;
        accountStore.loginUser(e.target.login.value, e.target.password.value);
        if (accountStore.status !== 'authed') {
           return null;
        } else {
            this.setState({
                loading: 1,
            })
        }
    };

    goToInviteLogin = () => {
        this.history.push(`login/invite/:uuid`);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
             {/*   <div style={{top: 0, left: 0, right: 0, position: 'absolute'}}><LinearProgress/></div>*/}
                {
                    this.state.loading === 1 ?  <div style={{top: 0, left: 0, right: 0, position: 'absolute'}}><LinearProgress/></div> : ''
                }

                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <div className={classes.headerDiv}>
                            <Typography variant="h5" className={classes.header}>
                                Добро пожаловать в Vickly
                            </Typography>
                        </div>
                        <form onSubmit={this.handleSubmit.bind(this)} className={classes.form}>
                            <FormControl required fullWidth>
                                {/*<InputLabel shrink className={classes.label}>
                                    <Typography variant="subtitle1" className={classes.text}>Логин</Typography>
                                </InputLabel>*/}
                                <InputBase
                                    id="login"
                                    name="login"
                                    placeholder="Логин"
                                    type="login"
                                    classes={{input: classes.active}}
                                />
                            </FormControl>

                            <FormControl required fullWidth className={classes.password}>
                                {/*<InputLabel shrink className={classes.label}>
                                    <Typography variant="subtitle1 ">Пароль</Typography>
                                </InputLabel>*/}
                                <InputBase
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Пароль"
                                    classes={{
                                        input: classes.active
                                    }}/>
                            </FormControl>

                            <div className={classes.remember}>
                                <Typography variant="caption" className={classes.label}>Запомнить меня?</Typography>
                                <Checkbox value="remember" classes={{
                                    checked: classes.checked
                                }} className={classes.checkbox}/>
                            </div>

                            <div className={classes.signIn}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.submit}>
                                    Войти
                                </Button>
                            </div>
                            {
                                accountStore.status === "failed" ?
                                    <Typography variant='caption' className={classes.failedLogin}>Неверный логин или
                                        пароль</Typography> : ''
                            }
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);