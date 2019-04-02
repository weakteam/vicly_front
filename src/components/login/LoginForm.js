import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import div from "@material-ui/core/Grid/Grid";
import {observer} from "mobx-react";
import accountStore from "../../store/AccountStore";
import Divider from "@material-ui/core/es/Divider/Divider";
import InputBase from "@material-ui/core/InputBase";
import {fade} from '@material-ui/core/styles/colorManipulator';
import Background from "../../images/login.jpg"
import {Link} from "react-router-dom";

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
        backgroundImage: 'url(' + Background + ')',
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
        paddingBottom: 10,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 15,
    },
    submit: {
        width: '100%',
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#122031',
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
        backgroundColor: 'rgb(234, 234, 234)',
        height: 30,
        paddingLeft: 10,
    },
    label: {
        display: 'flex',
        alignItems: 'center',
    },
    password: {
        marginTop: 10,
    },
    remember: {
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: 10,
    },
    checkbox: {
        padding: 0,
        marginRight: 5
    },
    header: {
        textAlign: 'center',
        marginBottom: 10
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
                                <InputLabel shrink className={classes.label}>
                                    <Typography variant="subtitle1"> Логин </Typography>
                                </InputLabel>
                                <InputBase
                                    id="login"
                                    name="login"
                                    type="login"
                                    classes={{input: classes.active}}
                                />
                            </FormControl>

                            <FormControl required fullWidth className={classes.password}>
                                <InputLabel shrink className={classes.label}>
                                    <Typography variant="subtitle1 "> Пароль </Typography>
                                </InputLabel>
                                <InputBase
                                    id="password"
                                    name="password"
                                    type="password"
                                    classes={{
                                        input: classes.active
                                    }}/>
                            </FormControl>

                            <div className={classes.remember}>
                                <Checkbox value="remember" color="primary" className={classes.checkbox}/>
                                <Typography variant="caption">Запомнить меня?</Typography>
                            </div>

                            <div className={classes.signIn}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.submit}>
                                    Войти
                                </Button>
                            </div>

                            <div className={classes.inviteBut}>
                                <Button
                                    type="submit"
                                    className={classes.invite}
                                    color="primary"
                                    component={props => <Link to="/invite/:invite_id" {...props} />}>
                                    <Typography variant="caption"> Пригласить </Typography>
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