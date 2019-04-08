import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Dialog from "./Dialog";
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import rootStore from "../store/RootStore";
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
});

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
        "t": "rgba(206, 255, 204, 0.23)",
        "Б": "rgba(170, 237, 251, 0.27)",
        "И": "#9e72cf"

    };

    render() {
        const {classes, theme, workgroup, chats, messagesStore} = this.props;
        const lol = workgroup.name;
       let wcolor = lol.charAt(0);
       let kek = this.workGroupColor(wcolor);

        return (
            <div style={{backgroundColor: `${kek}`}}>
                <ListItem  button onClick={this.handleClick} className={classes.groupName}>
                    <ListItem disableGutters classes={{
                        root: classes.gutters,
                    }}>
                        <Typography variant='h6' className={classes.text}>
                            {workgroup.name}
                        </Typography>
                    </ListItem>
                    {this.state.open ? <ExpandLess className={classes.icon}/> : <ExpandMore className={classes.icon}/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.active}>
                        {
                            chats.map(
                                userChat =>
                                    <Dialog chatId={userChat.user.id} unread={userChat.unread}
                                            lastMsg={userChat.last}
                                            dialog={userChat.user}
                                            handleDrawerToggle={this.props.handleDrawerToggle}/>
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