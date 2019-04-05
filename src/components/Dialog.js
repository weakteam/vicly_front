import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import ListItem from "@material-ui/core/ListItem/ListItem";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Badge from "@material-ui/core/Badge/Badge";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import ToastService from '../services/toastService'
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import MessagePush from "./MessagePush";
import rootStore from "../store/RootStore";
const {accountStore,messagesStore} = rootStore;

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
class Dialog extends React.Component {

    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
        this.chatsStore = messagesStore;
    }

    getRandomColor = (letter) => {
        let col = this.colorMap[letter];
        if (col) return col;
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    colorMap = {
        "Р": "#2ab49b",
        "А": "#d15c17",
        "И": "#9e72cf"

    };
    handleDialogClick = () => {
        this.props.history.push(`/home/chat/${this.props.chatId}`);
        // FIXME comment is fix for url chat page reload dafauck mafuck
        //this.messagesStore.currentChatId = this.props.chatId;
        ToastService.toast(<MessagePush {...this.props}/>);
    };

    handleDialogClickMob = () => {
        this.props.history.push(`/home/chat/${this.props.chatId}`);
        // FIXME comment is fix for url chat page reload dafauck mafuck
        //this.messagesStore.currentChatId = this.props.chatId;
        ToastService.toast(<MessagePush {...this.props}/>);

        this.props.handleDrawerToggle();
        //this.messagesStore.currentChatId = this.props.chatId;
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
        const {classes, dialog} = this.props;
        const selected = this.props.chatId === this.chatsStore.currentChatId;
        const messagesObj = this.messagesStore.messages.find(elem => elem.chatId == this.props.chatId);
        let unreadCount, lastUnread;
        if (messagesObj) {
            unreadCount = messagesObj.unread;
            lastUnread = messagesObj.last;
        } else {
            unreadCount = 0;
            lastUnread = null;
        }
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
                                    src="https://www.pnp.ru/upload/entities/2017/12/04/article/detailPicture/16/0e/06/22/19de7995e55dc70227809059f9b31bd5.jpg"
                                    className={classes.avatar} /*style={{backgroundColor: `${this.getRandomColor()}`}}*/>
                                    {dialog.first_name[0].toUpperCase() + dialog.last_name[0].toUpperCase()}
                                </Avatar>
                            </Grid>

                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2"
                                            color="secondary"
                                            noWrap
                                            className={classes.userName}>{dialog.first_name + " " + dialog.last_name}</Typography>
                                <Typography variant="caption"
                                            noWrap
                                            className={classes.message}>{this.props.lastMsg ? this.props.lastMsg.message : "Нет сообщений"}</Typography>
                            </Grid>

                            <Grid item style={{padding: 0, marginRight: 7,}}>
                                <Typography
                                    className={classes.time}>{lastUnread ? this.formatDate(lastUnread.timestamp_post.timestamp) : ""}</Typography>
                            </Grid>
                            {
                                unreadCount ? (
                                    <Badge badgeContent={unreadCount} classes={{badge: classes.margin}}/>) : ("")
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
                                    src="https://www.pnp.ru/upload/entities/2017/12/04/article/detailPicture/16/0e/06/22/19de7995e55dc70227809059f9b31bd5.jpg"
                                    className={classes.avatar} /*style={{backgroundColor: `${this.getRandomColor()}`}}*/>
                                    {dialog.first_name[0].toUpperCase() + dialog.last_name[0].toUpperCase()}
                                </Avatar>
                            </Grid>

                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2"
                                            color="secondary"
                                            noWrap
                                            className={classes.userName}>{dialog.first_name + " " + dialog.last_name}</Typography>
                                <Typography variant="caption"
                                            noWrap
                                            className={classes.message}>{this.props.lastMsg ? this.props.lastMsg.message : "Нет сообщений"}</Typography>
                            </Grid>

                            <Grid item style={{padding: 0, marginRight: 7,}}>
                                <Typography
                                    className={classes.time}>{lastUnread ? this.formatDate(lastUnread.timestamp_post.timestamp) : ""}</Typography>
                            </Grid>
                            {
                                unreadCount ? (<Badge color="secondary" badgeContent={unreadCount}
                                                      classes={{badge: classes.margin}}/>) : ("")
                            }
                        </Grid>
                    </ListItem>
                </Hidden>
            </div>
        );
    }
}

const styledComponent = withStyles(styles, {withTheme: true})(withRouter(Dialog));

export default styledComponent;
