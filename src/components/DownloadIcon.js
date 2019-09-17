import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PersonAdd from '@material-ui/icons/ArrowDownwardOutlined'
import IconButton from "@material-ui/core/IconButton/IconButton";
import InviteForm from "./InviteForm";
import history from "../store/history"
import rootStore from "../store/RootStore";
import {Popover} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import AttachmentDownload from "./AttachmentDownload";
import {observer} from "mobx-react";

const {accountStore, messagesStore} = rootStore;
const top = 50;
const left = 50;

const styles = theme => ({
    root: {
      //alignSelf: 'center',
        marginLeft: 'auto',
        //width: 400
    },
    paper: {
       /* top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        width: 495,
        height: '98%',
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            transform: 'none',
            width: 'auto',
        },
        position: 'absolute',
        outline: 'none',
        borderRadius: 10,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
        }`,*/
        boxShadow: 'inset 0 -2px 0px 0px #dadada',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.darkSecondary
        }`,
        marginTop: 15,
        padding: 10,
    },
    textField: {
        width: '-webkit-fill-available',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
        }`,
    },
    rootIndex: {
        zIndex: 1300,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const DownloadIcon = observer(function DownloadIcon(props) {
    const {classes} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose(event) {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const downloads = Array.from(rootStore.downloadService.downloads);
    return (
        <div className={classes.root}>
            <IconButton onClick={handleClick}>
                <PersonAdd className={classes.icon}/>
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                classes={{
                    root: classes.rootIndex,
                    paper: classes.paper
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List className={classes.root}>
                    {
                        downloads.length ?
                            downloads.map(download => (
                                <AttachmentDownload download={download[1]}/>
                            ))
                            :
                            <Typography variant="h6">Загрузки отсутствуют</Typography>
                    }
                </List>
            </Popover>
        </div>
    );
});

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles, {withTheme: true, index: 1})(DownloadIcon);
export default SimpleModalWrapped;