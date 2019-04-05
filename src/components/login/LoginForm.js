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
const {accountStore, messagesStore} = rootStore;


const styles = theme => ({
    root: {
        display: 'flex',
        top: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {},
        [theme.breakpoints.down('xs')]: {
            minHeight: '100%',
        },
        backgroundSize: 'cover',
        backgroundImage: ` ${
            theme.palette.type === 'light' ? 'url(' + Background + ')' : 'url(' + Dark + ')'
            }`,
        backgroundColor: theme.palette.primary.main,
    },
    main: {
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.down('xs')]: {
            width: 300,
        },
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
        },
        boxShadow: theme.shadows[10],
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 30,
        boxShadow: theme.shadows[0],
        paddingBottom: 30,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 15,
    },
    submit: {
        width: '100%',
        boxShadow: theme.shadows[0],
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#5662a0' : '#2e374c'
            }`,
        color: '#fff',
        '&:hover': {
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#2e374c' : '#3e4b67'
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
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
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
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
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
});

@observer
class LoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.login.value + "  " + e.target.password.value);
        //const { login, password } = this.state;
        accountStore.loginUser(e.target.login.value, e.target.password.value);
        //this.props.setLoading();
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <main className={classes.main}>
                    <Paper
                        className={classes.paper}>
                        <Typography variant="h5" className={classes.header}>
                            Добро пожаловать в Vickly
                        </Typography>
                        <Divider/>
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
                                <Checkbox value="remember" className={classes.checkbox}/>
                            </div>

                            <div className={classes.signIn}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.submit}>
                                    Войти
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);