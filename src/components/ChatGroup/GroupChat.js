import React from 'react';
import Grid from '@material-ui/core/Grid/index';
import Avatar from '@material-ui/core/Avatar/index';
import Typography from '@material-ui/core/Typography/index';
import 'typeface-roboto';
import ListItem from "@material-ui/core/ListItem/ListItem";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Badge from "@material-ui/core/Badge/Badge";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import ToastService from '../../services/toastService'
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import MessagePush from "../ChatCommon/MessagePush";
import rootStore from "../../store/RootStore";
import AvatarColor from "../../services/AvatarColor"
import Group from "@material-ui/icons/Group";

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    fixWidth: {
        margin: 0,
        width: 'inherit',
    },
    avatar: {
        width: 45,
        height: 45,
    },
    listItemPadding: {
        padding: 'unset'
    },
    margin: {
        top: 34,
        right: 17,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightBadge : theme.palette.secondary.dark
            }`,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.light
            }`,
    },
    fixPadding: {
        padding: 0,
        margin: 0,
    },
    contentPadding: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 9,
    },
    userName: {
        fontSize: '1rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    message: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightSecondary : theme.palette.secondary.dark
            }`,
        fontSize: '0.9rem'
    },
    time: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightSecondary : theme.palette.secondary.dark
            }`,
        padding: 0,
        marginTop: 4,
    },
});

@observer
class GroupChat extends React.Component {

    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
        this.chatsStore = messagesStore;
    }

    handleDialogClick = () => {
        messagesStore.isCurrentChatForUser = true;
        this.props.history.push(`/home/chat/group/${this.props.chatId}`);
    };

    handleDialogClickMob = () => {
        this.props.history.push(`/home/chat/group/${this.props.chatId}`);
        this.props.handleDrawerToggle();
    };

    formatDate = (timestamp) => {
        const now = new Date(Date.now());
        let date = new Date(timestamp);
        const today = now.toDateString() == date.toDateString();
        const mins = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        if (today) {
            return date.getHours() + ":" + mins;
        } else {
            //  return date.getHours() + ":" + mins + " " + date.getDay() + "/" + date.getMonth() + "/" + (date.getFullYear() - 2000);
            return date.getDay() + "/" + date.getMonth() + "/" + (date.getFullYear() - 2000);
        }
    };

    render() {
        const {classes, chatId, chatTitle, lastMessageUser, lastMessage, countUnread, lastMessageDatetime} = this.props;
        // TODO work ONLY FOR USERS CHATS
        const selected = chatId === this.messagesStore.currentChatId && this.messagesStore.isCurrentChatForUser===false;

        let colorChange = AvatarColor.getColor(chatTitle[0]);
        return (
            <div>
                <Hidden implementation="css" smUp>
                    <ListItem
                        selected={selected}
                        onClick={this.handleDialogClickMob.bind(this)}
                        disableGutters={true}
                        button
                        className={classes.listItemPadding}>
                        <Grid container className={`${classes.fixWidth} ${selected ? classes.selected : ""}`}
                              wrap="nowrap"
                              spacing={16}>
                            <Grid item md={16}>
                                <Avatar
                                    className={classes.avatar} style={{backgroundColor: `${colorChange}`}}>
                                    {chatTitle[0].toUpperCase()}
                                </Avatar>
                            </Grid>

                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2"
                                            color="secondary"
                                            noWrap
                                            className={classes.userName}>
                                    {chatTitle}
                                </Typography>
                                <Group className={classes.dialogIco}/>
                                <Typography variant="caption"
                                            noWrap
                                            className={classes.message}>
                                    {lastMessage ? lastMessage : "Нет сообщений"}
                                </Typography>
                            </Grid>

                            <Grid item style={{padding: 0, marginRight: 7,}}>
                                <Typography
                                    className={classes.time}>{lastMessageDatetime ? this.formatDate(lastMessageDatetime) : ""}</Typography>
                            </Grid>
                            {
                                countUnread ? (
                                    <Badge badgeContent={countUnread} classes={{badge: classes.margin}}/>) : ("")
                            }
                        </Grid>
                    </ListItem>
                </Hidden>

                <Hidden implementation="css" xsDown>
                    <ListItem
                        selected={selected}
                        onClick={this.handleDialogClick.bind(this)}
                        disableGutters={true}
                        button
                        className={classes.listItemPadding}>
                        <Grid container className={`${classes.fixWidth} ${selected ? classes.selected : ""}`}
                              wrap="nowrap"
                              spacing={16}>
                            <Grid item md={16}>
                                <Avatar
                                    className={classes.avatar} style={{backgroundColor: `${colorChange}`}}>
                                    {chatTitle[0].toUpperCase()}
                                </Avatar>
                            </Grid>

                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2"
                                            color="secondary"
                                            noWrap
                                            className={classes.userName}>{chatTitle}</Typography>
                                <Typography variant="caption"
                                            noWrap
                                            className={classes.message}>{lastMessage ? lastMessage : "Нет сообщений"}</Typography>
                            </Grid>

                            <Grid item style={{padding: 0, marginRight: 7,}}>
                                <Typography
                                    className={classes.time}>{lastMessageDatetime ? this.formatDate(lastMessageDatetime) : ""}</Typography>
                            </Grid>
                            {
                                countUnread ? (<Badge color="secondary" badgeContent={countUnread}
                                                      classes={{badge: classes.margin}}/>) : ("")
                            }
                        </Grid>
                    </ListItem>
                </Hidden>
            </div>
        );
    }
}

const styledComponent = withStyles(styles, {withTheme: true})(withRouter(GroupChat));

export default styledComponent;
