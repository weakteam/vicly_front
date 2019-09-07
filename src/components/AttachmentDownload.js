import React, {useState} from 'react';
import rootStore from "../store/RootStore";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import {observer} from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {ListItemIcon} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const {accountStore, messagesStore} = rootStore;
const top = 50;
const left = 50;

const useStyles = makeStyles({
    root: {
        alignSelf: 'center',
        marginLeft: 'auto',
        width: 400
        //    zIndex: 1000,
    },
    paper: {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        width: 495,
        height: '98%',
        position: 'absolute',
        outline: 'none',
        borderRadius: 10,
    },
    textField: {
        width: '-webkit-fill-available',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export default observer(function AttachmentDownload(props) {
    const classes = useStyles();
    const {download} = props;

    return (
        <>
<div style={{padding: '6px 8px'}}>
    <Typography variant='h6'>{download.attachment.filename}</Typography>
    <Typography variant='h6'>{bytesToSize(download.attachment.size)}</Typography>
    {
        download.status ? <LinearProgress variant="determinate" value={download.progress}/> : null
    }
</div>




            <div>
                {
                    download.src ?
                        (<Button onClick={download.save}>
                            Загрузить
                        </Button>) : null
                }
                <Button onClick={() => rootStore.downloadService.deleteDownload(download.attachment)}>
                    Удалиить
                </Button>
            </div>
        </>
    );
})