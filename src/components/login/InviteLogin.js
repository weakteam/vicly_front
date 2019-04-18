import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
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
import history from "../../store/history"
// import Background from "../../images/loginBack.jpg"
import rootStore from "../../store/RootStore";
import {BACKEND_URL} from "../../common";

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
        [theme.breakpoints.down('xs')]: {
            minHeight: '100%',
        },
        backgroundSize: 'cover',
        /*    backgroundImage: ` ${
                theme.palette.type === 'light' ? 'url(' + Background + ')' : 'url(' + Dark + ')'
                }`,*/
        backgroundImage: 'url(' + Background + ')',
        backgroundColor: theme.palette.primary.main,
    },
    main: {
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        width: 450,
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
    label: {
        display: 'flex',
        alignItems: 'center',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
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

    signIn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '11%',
    },
    inviteBut: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 7
    },

    headerBlock: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#e8e8e8' : 'rgb(90,114,151)'
            }`,
        //height: 85,
        width: '100%',
        padding: 15,
        display: 'flex',
        alignItems: 'start',
        //borderRadius: '5px 5px 0px 0px',
    },
    header: {
        textAlign: 'center',
        //marginBottom: 20,
        fontSize: '1.6em',
        // marginLeft: 10,
        padding: '6%',
        color: ` ${
            theme.palette.type === 'light' ? '#ffffff' : theme.palette.secondary.dark
            }`,
    },
    fixWidth: {
        marginLeft: 10,
        display: 'flex',
    },
    userName: {
        marginLeft: 10,
    },
    userName1: {
        //fontSize: '1rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    message2: {
        // fontSize: '0.9rem'
    },
    text2: {
        marginLeft: 'auto',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        fontSize: '1.15rem',
    },
    infBlock: {
        display: 'flex',
        marginTop: 30,
    },
    infBlockFirst: {
        display: 'flex',

    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        fontSize: '1.175rem',
        marginBottom: 5,
    },
    block: {
        width: '100%'
    },
    blockForm: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 20,
    },
    form: {
       // width: '100%', // Fix IE 11 issue.
        padding: '6%',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : '#1c212d'
            }`,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    textInf: {
        marginBottom: 30,
        fontSize: '1em',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    textInf2: {
        fontSize: '1em',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    textPassword: {

        textAlign: 'end',
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
    password: {
        marginTop: 10,
    },
    headerDiv: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? 'rgba(86, 160, 159, 0.71)' : 'rgba(46, 55, 76, 0.8)'
            }`,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    width: {
        width: '100%',
    },
    display: {
        display: 'inline-block',
    },

});

@observer
class InviteLogin extends React.Component {

    state = {
        inviteInfo: null,
        status: null,

        formValues: {
            login: '',
            password: '',
        },
    };

    componentDidMount() {
        this.handleGetInviteInfo();
    }


    handleGetInviteInfo = () => {
        this.getInviteInfo(this.props.match.params.uuid);
    };

    handleSingUp = (event) => {
        event.preventDefault();
        this.singUp(this.props.match.params.uuid, this.state.formValues.login, this.state.formValues.password);
        this.props.history.push(`/home/chat/user/${this.props.userId}`);
    };

    constructor(props) {
        super(props);
        this.history = history;
        this.accountStore = accountStore;
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.login.value + "  " + e.target.password.value);
        //const { login, password } = this.state;
        accountStore.loginUser(e.target.login.value, e.target.password.value);
        //this.props.setLoading();
    };

    async getInviteInfo(uuid) {
        try {
            const response = await fetch(BACKEND_URL + "/invite/" + uuid, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        inviteInfo: json
                    })
                });
        } catch (err) {
            console.log(err);
        }
    };

    singUp(uuid, login, password) {
        try {
            const response = fetch(BACKEND_URL + "/invite/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uuid: uuid,
                    login: login,
                    password: password,
                })
            })
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        status: json
                    })
                });
            console.log('response');
            if (!response.ok) {
                console.log("Invite doesn't created")
            } else {
                console.log("Invite created")
            }
        } catch (err) {
            console.log(err);
        }
    }

    handleChange1 = (event) => {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        formValues[name] = event.target.value;

        this.setState({formValues})
    };

    render() {
        const {classes} = this.props;
        //   const getInfo = this.getInviteInfo(this.props.match.params.uuid);
        //const pathToRegexp = require(this.props.history);
        //  const keys = [];
        // const regexp = pathToRegexp('/login/invite/:uuid', keys);

        return (

            <div className={classes.root}>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <div className={classes.headerDiv}>
                            <Typography variant="caption" className={classes.header}>
                                Добро пожаловать в Vicly
                            </Typography>
                        </div>

                        <form onSubmit={this.handleSingUp} className={classes.form}>
                            <Typography variant="overline" className={classes.textInf}>Данные
                                профиля</Typography>
                            <div>

                                <div className={classes.block}>

                                    <div className={classes.infBlock}>
                                        <Typography className={classes.text}>ФИО:</Typography>
                                        <Typography
                                            className={classes.text2}>{this.state.inviteInfo ? (this.state.inviteInfo.first_name + ' ' + this.state.inviteInfo.surname  + ' ' + this.state.inviteInfo.last_name) : ('')}</Typography>
                                    </div>
                                    <Divider/>
                                    <div className={classes.infBlock}>
                                        <Typography className={classes.text}>Должность:</Typography>
                                        <Typography className={classes.text2}>{this.state.inviteInfo ? this.state.inviteInfo.position : ('')}</Typography>
                                    </div>
                                    <Divider/>
                                    <div className={classes.infBlock}>
                                        <Typography className={classes.text}>Рабочие
                                            группы:</Typography>
                                        <div className={classes.text2}>
                                            <Typography className={classes.text2}>{this.state.inviteInfo ? this.state.inviteInfo.group_name + ' ' + this.state.inviteInfo.group_id : ('')}</Typography>
                                        </div>
                                    </div>
                                    <Divider/>

                                    <div className={classes.infBlock}>
                                        <Typography variant="overline" className={classes.textInf2}>Придумайте логин и
                                            пароль</Typography>
                                    </div>

                                    <div style={{width: '100%', textAlign: 'center'}}>
                                        <FormControl required fullWidth
                                                     classes={{
                                                         root: classes.display,
                                                     }}>
                                            {/*<InputLabel shrink className={classes.label}>
                                    <Typography variant="subtitle1" className={classes.text}>Логин</Typography>
                                </InputLabel>*/}
                                            <InputBase
                                                id="login"
                                                name="login"
                                                placeholder="Логин"
                                                type="login"
                                                value={this.state.formValues["login"]}
                                                onChange={this.handleChange1.bind(this)}
                                                classes={{
                                                    input: classes.active,
                                                    root: classes.width
                                                }}
                                            />
                                        </FormControl>

                                        <FormControl required
                                                     fullWidth
                                            //className={classes.password}
                                                     classes={{
                                                         root: classes.display,
                                                     }}>
                                            {/*<InputLabel shrink className={classes.label}>
                                    <Typography variant="subtitle1 ">Пароль</Typography>
                                </InputLabel>*/}
                                            <InputBase
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={this.state.formValues["password"]}
                                                onChange={this.handleChange1.bind(this)}
                                                placeholder="Пароль"
                                                classes={{
                                                    input: classes.active,
                                                    root: classes.width
                                                }}/>
                                        </FormControl>
                                    </div>
                                    <div className={classes.signIn}>
                                        <Button
                                            type="submit"
                                            className={classes.submit}>
                                            Зарегистрироваться
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(InviteLogin);