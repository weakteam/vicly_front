import React from 'react';
import {Badge, IconButton, withStyles} from "@material-ui/core";
import accountStore from "../store/AccountStore";
import ProfileIco from "./ProfileIco";
import Typography from "@material-ui/core/es/Typography/Typography";
import InviteIcon from "./InviteIcon";
import ExitToApp from '@material-ui/icons/ExitToApp'

const styles = theme => ({
    position: {
        width: 400,
        [theme.breakpoints.down('md')]: {
            width: 280,
        },
        [theme.breakpoints.down('sm')]: {
            width: 250,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        height: 55,
        zIndex: 2000,
        position: 'fixed',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
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
        left: 40,
        top: 12,
        width: 8,
    },
    marginInvite: {
        marginLeft: 'auto',
    },
    wrap: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    online: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
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
                <ProfileIco handleLogout={this.accountStore.unauth.bind(accountStore)}
                            name={this.accountStore.fullName}
                            handleChangeType/>

                <div className={classes.wrap}>
                    <Typography variant="h6" className={classes.online}>{accountStore.fullName}</Typography>
                    <Typography variant="subtitle1" className={classes.online}>
                        <Badge color="secondary" classes={{badge: classes.bage}}>
                            Online
                        </Badge>
                    </Typography>
                </div>

                <InviteIcon/>
                <IconButton>
                    <ExitToApp className={classes.icon} onClick={this.accountStore.unauth.bind(accountStore)}/>
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileBar);