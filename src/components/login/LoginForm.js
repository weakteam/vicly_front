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
import Background from "../../images/fon1.jpg"
import Dark from "../../images/rer.jpg"
import Logo from "../../images/LoginLogo.svg"
import FormBack from "../../images/LoginForm.jpg"
import rootStore from "../../store/RootStore";
import history from "../../store/history"
import LinearProgress from "@material-ui/core/LinearProgress";
import '../../css/BackGradient.css'

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
            backgroundColor: '#fff',
        },
        /*backgroundSize: 'cover',*/
        // backgroundImage: 'url(' + Background + ')',
        /*backgroundColor: '#222c33',*/
    },
    main: {
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '100%',
        },
        width: 900,
        borderRadius: 5,
        boxShadow: theme.shadows[12],
    },
    paper: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'flex-start',
        },
        height: 500,
        display: 'flex',
        borderRadius: 5,
        justifyContent: 'center',
        boxShadow: theme.shadows[0],
        backgroundColor: '#ffffff00',
    },
    form: {
        //  width: '100%', // Fix IE 11 issue.
        alignItems: 'center',
        display: 'flex',
        padding: ' 50px 22px',
        [theme.breakpoints.down('xs')]: {
            padding: ' 10px 22px',
        },
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : '#1c212d'
        }`,
    },
    submit: {
        width: '100%',
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
        borderRadius: 5,
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
        // textAlign: 'center',
        fontSize: '2.2rem',
        // padding: 26,
        // marginLeft: 30,
        color: ` ${
            theme.palette.type === 'light' ? '#ffffff' : theme.palette.secondary.dark
        }`,
    },
    headerDiv: {
        /*   backgroundColor: ` ${
               theme.palette.type === 'light' ? 'rgba(86, 160, 159, 0.31)' : 'rgba(46, 55, 76, 0.8)'
               }`,*/
        backgroundImage: 'url(' + FormBack + ')',
        backgroundSize: 'cover',
        borderRadius: '10px 0 0 10px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            borderRadius: 0,
        },
        minWidth: '54%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            color: ` ${
                theme.palette.type === 'light' ? '#000' : '#fff'
            }`,
        },
        '&$checked': {
            color: '#43a296',
        },
    },
    failedLogin: {
        textAlign: 'center', fontSize: '1rem', color: 'red', paddingTop: 26
    },
    imageLogo: {
        width: 200,
        [theme.breakpoints.down('xs')]: {
            width: 100,
        },
    },
    headerLogo: {
        padding: 22,
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            padding: 22,
        },
    },
    mainForm: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : '#1c212d'
        }`,
        borderRadius: '0 10px 10px 0',
        [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
            position: 'absolute',
            top: 194,
            bottom: 0,
            left: 0,
            right: 0,
            boxShadow: 'none',
        },
        boxShadow: '-17px 0px 13px 0px rgba(0, 0, 0, 0.25)',
    },
    checkBoxRoot: {
        color: ` ${
            theme.palette.type === 'light' ? '#b7b4b4' : 'rgba(255,255,255,0.62)'
        }`,
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
            <div className={classes.root + ' back'}>
                {/*   <div style={{top: 0, left: 0, right: 0, position: 'absolute'}}><LinearProgress/></div>*/}
                {
                    this.state.loading === 1 ?
                        <div style={{top: 0, left: 0, right: 0, position: 'absolute'}}><LinearProgress/></div> : ''
                }

                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <div className={classes.headerDiv}>
                            <div className={classes.headerLogo}>
                                <img src={Logo} alt="Logo" className={classes.imageLogo}/>
                                <Typography variant="h5" className={classes.header}>
                                    Vicly Messenger
                                </Typography>
                            </div>
                        </div>

                        <div className={classes.mainForm}>
                            <div style={{padding: 22}}>
                                <Typography className={classes.text} variant="h5"
                                            style={{fontSize: '1.8rem',}}>Войти</Typography>
                            </div>
                            <form onSubmit={this.handleSubmit.bind(this)} className={classes.form}>

                                <div style={{width: '100%'}}>
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
                                        <Typography variant="caption" className={classes.label}>Запомнить
                                            меня?</Typography>
                                        <Checkbox value="remember" classes={{
                                            root: classes.checkBoxRoot,
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
                                            <Typography variant='caption' className={classes.failedLogin}>Неверный логин
                                                или
                                                пароль</Typography> : ''
                                    }
                                </div>

                            </form>
                        </div>
                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true, index: 1})(LoginForm);