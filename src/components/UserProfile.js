import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from "@material-ui/core/es/Divider";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Close from "@material-ui/icons/Close"
import {IconButton} from "@material-ui/core";
import rootStore from "../store/RootStore";

const {accountStore, messagesStore} = rootStore;
const styles = theme => ({
    root: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#5662a0' : '#2e374c'
            }`,
      // zIndex: 1300,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        justifyContent: 'center',
        // padding: 30,
        boxShadow: theme.shadows[0],
        // paddingBottom: 10,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
    },
    headerBlock: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#66a1a6' : 'rgb(90,114,151)'
            }`,
        //height: 85,
       // width: '100%',
        padding: 18,
        display: 'flex',
        alignItems: 'start',
        //borderRadius: '5px 5px 0px 0px',
    },
    header: {
        textAlign: 'start',
        fontSize: '1em',
        marginLeft: 10,
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.dark
            }`,
    },
    fixWidth: {
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        marginLeft: 10,
    },
    userName1: {
        fontSize: '1.4rem',
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.dark
            }`,
        marginBottom: 5,
    },
    role: {
        fontSize: '1rem',
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : '#a7b6ce'
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
        width: '100%', // Fix IE 11 issue.
    },
    textInf: {
        marginBottom: 30,
        fontSize: '1em',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    textPassword: {

        textAlign: 'end',
    },
    avatar: {
        width: 75,
        height: 75,
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        cursor: 'pointer',
    },
});

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
    }

    state = {};

    render() {
        const {classes} = this.props;
        const workgroup = this.messagesStore.groups.find(elem => elem.id === this.accountStore.groupId);


        return (
            <div>
                <div className={classes.headerBlock}>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                            <Typography variant="overline" className={classes.header}>
                                Профиль
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleMenuClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>

                        </div>

                        <div className={classes.fixWidth}>
                            <Avatar
                                className={classes.avatar}>
                                AA
                            </Avatar>
                            <div className={classes.userName}>
                                <Typography variant="h5"
                                            className={classes.userName1}>{this.accountStore.login}</Typography>
                                <Typography variant="caption"
                                            noWrap
                                            className={classes.role}>({this.accountStore.position ? this.accountStore.position : 'Должность не указана'})</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <form className={classes.form}>
                    <div className={classes.blockForm}>
                        <div className={classes.block}>
                            <Typography variant="overline" className={classes.textInf}>Информация</Typography>
                            <div className={classes.infBlockFirst}>
                                <Typography variant="h6" className={classes.text}>Телефон</Typography>
                                <Typography variant="h6" className={classes.text2}>8(988)996-29-14</Typography>
                            </div>
                            <Divider/>
                            <div className={classes.infBlock}>
                                <Typography variant="h6" className={classes.text}>Логин</Typography>
                                <Typography variant="h6" className={classes.text2}>@{this.accountStore.login}</Typography>
                            </div>
                            <Divider/>
                            <div className={classes.infBlock}>
                                <Typography variant="h6" className={classes.text}>Пароль</Typography>
                                <InputBase classes={{input: classes.textPassword}}
                                           className={classes.text2}
                                           type="password"
                                           defaultValue="Naked input"/>
                            </div>
                            <Divider/>
                            <div className={classes.infBlock}>
                                <Typography variant="h6" className={classes.text}>Должность</Typography>
                                <Typography variant="h6" className={classes.text2}>Старший программист</Typography>
                            </div>
                            <Divider/>
                            <div className={classes.infBlock}>
                                <Typography variant="h6" className={classes.text}>Доступные рабочие
                                    группы</Typography>
                                <div className={classes.text2}>
                                    <Typography variant="h6" className={classes.text2}>{workgroup.name ? workgroup.name : 'Нет группы'}</Typography>
                                </div>
                            </div>
                            <Divider/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const Profile = withStyles(styles)(UserProfile);

export default Profile;