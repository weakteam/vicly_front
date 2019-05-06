import React from 'react';
import {Badge, Hidden, IconButton, withStyles} from "@material-ui/core";
import InviteIco from "./SearchBar";
import ProfileIco from "./ProfileIco";
import Typography from "@material-ui/core/es/Typography/Typography";
import InviteIcon from "./InviteIcon";
import ExitToApp from '@material-ui/icons/ExitToApp';
import rootStore from "../store/RootStore";
import {Route} from "react-router-dom";
import InviteForm from "./InviteForm";
import {Link} from "react-router-dom";
import ChatWindow from "./ChatUser/ChatWindow";

const {accountStore} = rootStore;

const styles = theme => ({
    position: {
        borderRadius: '5px 5px 0 0',
        width: 'calc(400px - 16px)',
        [theme.breakpoints.down('md')]: {
            width: 'calc(280px - 16px)',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'calc(250px - 16px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        margin: '5px 8px 0px 8px',
        padding: '6px 0px 6px 0px',
       zIndex: 1,
        position: 'absolute',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : '#2b3346'
            }`,
        display: 'inline-flex',
        alignItems: 'center',
        top: 0,
    },
    userDisplay: {},
    bage: {
        backgroundColor: '#41ff9c',
        minWidth: 8,
        height: 8,
        color: '#fff',
        left: 42,
        top: 11,
        width: 8,
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? 'rgb(140, 140, 140)' : 'rgb(159, 171, 199)'
            }`,
    },
    marginInvite: {
        marginLeft: 'auto',
    },
    wrap: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '100%',
    },
    online: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    barDisp: {
        display: 'inline-flex',
    },
    butt: {
        marginLeft: 'auto',
    },
    name: {
        marginTop: 7,
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
            }`,
    },
});

class ProfileBar extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.position}>
                <ProfileIco
                    changeThemeType={this.props.changeThemeType}
                    handleLogout={this.accountStore.unauth.bind(accountStore)}
                    name={this.accountStore.fullName}
                    handleChangeType/>

                <div className={classes.wrap}>
                    <Typography variant="h6" className={classes.online}>{accountStore.fullName}</Typography>
                        <Badge  classes={{badge: classes.bage}}>
                            <Typography className={classes.text}> online </Typography>
                        </Badge>
                </div>

                <InviteIcon />


                <IconButton onClick={this.accountStore.unauth.bind(accountStore)}>
                    <ExitToApp className={classes.icon}/>
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileBar);