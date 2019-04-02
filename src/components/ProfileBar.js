import React from 'react';
import {Badge, Hidden, IconButton, withStyles} from "@material-ui/core";
import InviteIco from "./SearchBar";
import accountStore from "../store/AccountStore";
import ProfileIco from "./ProfileIco";
import chatsStore from "../store/ChatsStore";
import Typography from "@material-ui/core/es/Typography/Typography";
import messagesStore from "../store/MessagesStore";
import InviteIcon from "./InviteIcon";
import ExitToApp from '@material-ui/icons/ExitToApp'


const styles = theme => ({
    position: {
        height: 55,
        zIndex: 2000,
        position: 'fixed',
        backgroundColor: theme.palette.primary.main,
        display: 'inline-flex',
        width: '30%',
        alignItems: 'center',
        top: 0,
    },
    userDisplay: {},
    bage: {
        color: '#20ff98',

    },
    marginInvite: {
        marginLeft: 'auto',
    },
    wrap: {
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
                                name={this.accountStore.fullName}/>

                <Typography variant="h6" color="secondary" className={classes.wrap}>{accountStore.fullName}</Typography>


                <InviteIcon />
                <IconButton >
                    <ExitToApp color="secondary"  onClick={this.accountStore.unauth.bind(accountStore)}/>
                </IconButton>









            </div>
        );
    }
}

export default withStyles(styles)(ProfileBar);