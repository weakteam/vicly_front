import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Dialog from "./ChatUser/Dialog";
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import rootStore from "../store/RootStore";
import GroupChat from "./ChatGroup/GroupChat";
import {observer} from "mobx-react";
import Badge from "@material-ui/core/Badge";
import Loyalty from "@material-ui/icons/Loyalty"

const {accountStore, messagesStore} = rootStore;


const styles = theme => ({
    groupName: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        fontSize: '0.9rem'
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    root: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#e6e6e6' : '#40485d'
            }`,
    },
    gutters: {
        paddingTop: 6,
        paddingBottom: 6,
    },

    badge: {
        marginLeft: 10,
    },
    workgroupName: {
        display: 'flex',
        alignItems: 'center'
    },
    WorkGroupBack: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : '#2b3346'
            }`,
        borderBottom: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
            }`,

        marginBottom: 3
    },
});

@observer
class Workgroup extends React.Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
    }

    workGroupColor = (letter) => {
        let col = this.colorMap[letter];
        if (col) return col;
    };

    colorMap = {
        "t": "#009bed",
        "Б": "#6aa8b4",
        "И": "#9e72cf"

    };

    render() {
        const {classes, theme, workgroup, groupChats, userChats, messagesStore} = this.props;
        const lol = workgroup.name;
        let wcolor = lol.charAt(0);
        let colorName = this.workGroupColor(wcolor);

        return (
            <div className={classes.WorkGroupBack}>
                <ListItem button onClick={this.handleClick} className={classes.groupName}>
                    <ListItem disableGutters classes={{
                        root: classes.gutters,
                    }}>
                        <div className={classes.workgroupName}>
                            <Typography variant='button' className={classes.text}>
                                {workgroup.name}
                            </Typography>
                            <Loyalty style={{color: `${colorName}`}} className={classes.badge}/>
                        </div>
                    </ListItem>
                    {this.state.open ? <ExpandLess className={classes.icon}/> : <ExpandMore className={classes.icon}/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.active}>
                        {
                            userChats.map(
                                userChat =>
                                    <Dialog
                                        userId={userChat.user.id}
                                        firstName={userChat.user.first_name}
                                        lastName={userChat.user.last_name}
                                        lastMessage={userChat.last ? userChat.last.message : null}
                                        lastMessageDatetime={userChat.last ? userChat.last.timestamp_post.timestamp : null}
                                        countUnread={userChat.unread}
                                        userAvatar={userChat.user.avatar}
                                        handleDrawerToggle={this.props.handleDrawerToggle}/>
                            )
                        }
                        {
                            groupChats.map(
                                groupChat => {
                                    let lastMessageUsername = "";
                                    if (groupChat.last) {
                                        const user = rootStore.messagesStore.findUserById(groupChat.last.from);
                                        lastMessageUsername = user ? user.first_name : "error";
                                    }
                                    return (
                                        <GroupChat
                                            chatId={groupChat.chat.id}
                                            chatTitle={groupChat.chat.name}
                                            lastMessageUser={lastMessageUsername}
                                            lastMessage={groupChat.last ? groupChat.last.message : null}
                                            lastMessageDatetime={groupChat.last ? groupChat.last.timestamp_post.timestamp : null}
                                            countUnread={groupChat.unread}
                                            handleDrawerToggle={this.props.handleDrawerToggle}
                                        />
                                    )
                                }
                            )
                        }
                    </List>
                </Collapse>
               {/* <Divider classes={{root: classes.root}}/>*/}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Workgroup);