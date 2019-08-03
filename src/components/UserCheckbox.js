import React from 'react';
import Grid from '@material-ui/core/Grid/index';
import Avatar from '@material-ui/core/Avatar/index';
import Typography from '@material-ui/core/Typography/index';
import 'typeface-roboto';
import ListItem from "@material-ui/core/ListItem/ListItem";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Badge from "@material-ui/core/Badge/Badge";
import {observer} from "mobx-react";
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import rootStore from "../store/RootStore";
import AvatarColor from "../services/AvatarColor"
import Checkbox from "@material-ui/core/Checkbox";

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
        padding: 'unset',
        borderRadius: 5,
    },
    margin: {
        top: 41,
        right: 17,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightBadge : theme.palette.secondary.dark
            }`,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.light
            }`,
        zIndex: 0,
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
            theme.palette.type === 'light' ? '#adacac' : theme.palette.secondary.dark
            }`,
        fontSize: '0.9rem'
    },
    time: {
        color: ` ${
            theme.palette.type === 'light' ? '#adacac' : theme.palette.secondary.dark
            }`,
    },
    onlineNotSelected: {
        backgroundColor: '#66ff80',
        zIndex: 0,
        top: 35,
        right: 6,
        border: ` ${
            theme.palette.type === 'light' ? '3px solid #fff' : '3px solid #2b3346'
            }`,
    },
    onlineSelected: {
        backgroundColor: '#66ff80',
        zIndex: 0,
        top: 35,
        right: 6,
        border: '3px solid #2d807f',
    },
});

@observer
class UserCheckbox extends React.Component {

    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
        this.accountStore = accountStore;
    }

    state = {
        avatar_fetched: false,
        avatar_image: null
    };

    handleDialogClick = () => {
        messagesStore.isCurrentChatForUser = true;
        // messagesStore.chatChanged("user", this.props.userChat.user.id);
        this.props.history.push(`/home/chat/user/${this.props.userChat.user.id}`);
    };

    handleDialogClickMob = () => {
        this.props.history.push(`/home/chat/user/${this.props.userChat.user.id}`);
        // FIXME comment is fix for url chat page reload dafauck mafuck
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
        const {classes} = this.props;
        const userId = this.props.userChat.user.id;
        const firstName = this.props.userChat.user.first_name;
        const lastName = this.props.userChat.user.last_name;
        const lastMessage = this.props.userChat.last ? this.props.userChat.last.message : null;
        const lastMessageDatetime = this.props.userChat.last ? this.props.userChat.last.timestamp_post.timestamp : null;

        // TODO work ONLY FOR USERS CHATS
        const selected = this.props.selected;
        let colorChange = AvatarColor.getColor(firstName[0]);
        let avatar_image = rootStore.imageService.images.find(elem => elem.userId === userId);

        const online = this.accountStore.online.find(elem => elem === userId);

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
                            <Grid item >
                                {
                                    avatar_image ?
                                        (
                                            online ? (
                                                <Badge color="secondary"
                                                       classes={{badge: selected ? classes.onlineSelected : classes.onlineNotSelected}}>
                                                    <Avatar
                                                        className={classes.avatar}
                                                        // style={{backgroundColor: `${colorChange}`}}
                                                        src={avatar_image.small}/>
                                                </Badge>
                                            ) : (
                                                <Avatar
                                                    className={classes.avatar}
                                                    //style={{backgroundColor: `${colorChange}`}}
                                                    src={avatar_image.small}/>
                                            )
                                        ) : (
                                            online ? (
                                                <Badge color="secondary"
                                                       classes={{badge: selected ? classes.onlineSelected : classes.onlineNotSelected}}>
                                                    <Avatar
                                                        className={classes.avatar}
                                                        style={{backgroundColor: `${colorChange}`}}>
                                                        {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
                                                    </Avatar>
                                                </Badge>
                                            ) : (
                                                <Avatar
                                                    className={classes.avatar}
                                                    style={{backgroundColor: `${colorChange}`}}>
                                                    {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
                                                </Avatar>
                                            )
                                        )
                                }

                            </Grid>

                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2"
                                            color="secondary"
                                            noWrap
                                            className={classes.userName}
                                            style={{color: selected ? '#fff' : ''}}>
                                    {firstName + " " + lastName}
                                </Typography>
                                <Typography variant="caption"
                                            noWrap
                                            className={classes.message}
                                            style={{color: selected ? '#b5dcdc' : ''}}>
                                    {lastMessage ? lastMessage : "Нет сообщений"}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography
                                    className={classes.time}
                                    style={{color: selected ? '#b5dcdc' : ''}}>{lastMessageDatetime ? this.formatDate(lastMessageDatetime) : ""}</Typography>
                            </Grid>
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
                            <Grid item>
                                {
                                    avatar_image ?
                                        (
                                            online ? (
                                                <Badge color="secondary"
                                                       classes={{badge: selected ? classes.onlineSelected : classes.onlineNotSelected}}>
                                                    <Avatar
                                                        className={classes.avatar}
                                                        // style={{backgroundColor: `${colorChange}`}}
                                                        src={avatar_image.small}/>
                                                </Badge>
                                            ) : (
                                                <Avatar
                                                    className={classes.avatar}
                                                    // style={{backgroundColor: `${colorChange}`}}
                                                    src={avatar_image.small}/>
                                            )
                                        ) : (
                                            online ? (
                                                <Badge color="secondary"
                                                       classes={{badge: selected ? classes.onlineSelected : classes.onlineNotSelected}}>
                                                    <Avatar
                                                        className={classes.avatar}
                                                        style={{backgroundColor: `${colorChange}`}}>
                                                        {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
                                                    </Avatar>
                                                </Badge>
                                            ) : (
                                                <Avatar
                                                    className={classes.avatar}
                                                    style={{backgroundColor: `${colorChange}`}}>
                                                    {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
                                                </Avatar>
                                            )
                                        )
                                }

                            </Grid>

                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2"
                                            color="secondary"
                                            noWrap
                                            className={classes.userName}
                                            style={{color: selected ? '#fff' : ''}}>{firstName + " " + lastName}</Typography>
                                <Typography variant="caption"
                                            noWrap
                                            className={classes.message}
                                            style={{color: selected ? '#b5dcdc' : ''}}>{lastMessage ? lastMessage : "Нет сообщений"}</Typography>
                            </Grid>

                            <Grid item>
                                <Typography
                                    className={classes.time}
                                    style={{color: selected ? '#b5dcdc' : ''}}>{lastMessageDatetime ? this.formatDate(lastMessageDatetime) : ""}</Typography>
                            </Grid>
                            <Checkbox
                                onChange={this.handleChange.bind(this)}
                                value={'b'}
                                color="primary"
                                style={{marginLeft: 'auto'}}
                                classes={{
                                    root: classes.checkboxRoot,
                                    checked: classes.checkedBox,
                                }}
                            />
                        </Grid>

                    </ListItem>
                </Hidden>
            </div>
        );
    }
}

const styledComponent = withStyles(styles, {withTheme: true, index: 1})(UserCheckbox);

export default styledComponent;
