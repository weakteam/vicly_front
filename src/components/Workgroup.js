import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Dialog from "./Dialog";
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Item, Menu, MenuProvider} from "react-contexify";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";


const styles = theme => ({
    groupName: {
        paddingTop: 0,
        paddingBottom: 0,
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

    render() {
        const {classes, theme, workgroup, chats} = this.props;

        return (
            <div>

                <ListItem button onClick={this.handleClick} className={classes.groupName}>
                    <ListItem>
                        <Typography variant='h6' color="secondary">
                            {workgroup.name}
                        </Typography>
                    </ListItem>
                    {this.state.open ? <ExpandLess color="secondary"/> : <ExpandMore color="secondary"/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.active}>
                        {
                            chats.map(
                                userChat =>
                                    <Dialog chatId={userChat.user.id} unread={userChat.unread}
                                            lastMsg={userChat.last}
                                            dialog={userChat.user}/>
                            )
                        }
                    </List>
                </Collapse>
                <Divider/>
            </div>

        )
    }
}

export default withStyles(styles, {withTheme: true})(Workgroup);