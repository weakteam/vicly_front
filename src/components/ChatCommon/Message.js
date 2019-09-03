import React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {makeStyles, withStyles} from '@material-ui/core/styles/index';
import Typography from "@material-ui/core/Typography/Typography";
import div from "@material-ui/core/Grid/Grid";
import {fade} from "@material-ui/core/styles/colorManipulator";
import AvatarColor from "../../services/AvatarColor"
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AttachmentShowMedia from "./AttachmentShowMedia";
import {observer} from "mobx-react";
import "../../css/message.css"
import VisibilitySensor from "react-visibility-sensor";
import {useTheme} from "@material-ui/core";
import AttachmentShowFile from "./AttachmentShowFile";

const useStyles = makeStyles({
        fromMe: {
            boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
            maxWidth: 500,
            backgroundColor: theme => ` ${theme.palette.type === 'light' ? '#E2F0F1' : '#007776'}`,
            padding: '3px 14px 3px 14px',
            borderRadius: '10px 10px 10px 0',
        },
        fromMeMob: {
            maxWidth: 500,
            backgroundColor: theme => ` ${
                theme.palette.type === 'light' ? '#E2F0F1' : '#007776'
            }`,
            padding: '3px 14px 3px 14px',
            borderRadius: '10px 10px 0px 10px',
            boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
        },
        toMe: {
            maxWidth: 500,
            padding: '3px 14px 3px 14px',
            borderRadius: '10px 10px 10px 0',
            boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
        },
        // If my message not readed yet!
        nonread: {
            transition: theme => theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('#fb8c00', 0.25)} 0 0 0 0.2rem`,
        },
        nondelivered: {
            transition: theme => theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('rgba(239, 5, 17)', 0.25)} 0px 3px 6px 0px`,
        },
        mess: {
            color: theme => ` ${
                theme.palette.type === 'light' ? '#181818' : '#fff'
            }`,
        },
        senderName: {
            color: theme => ` ${
                theme.palette.type === 'light' ? '#227B87' : '#8cfff0'
            }`,
        },
    }
);

function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function Message(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const name = props.userInfo.first_name[0];
    let colorChange = AvatarColor.getColor(name);
    let colsNumber;
    if (props.messageInfo.attachments.length === 1) {
        colsNumber = 2;
    } else {
        colsNumber = 1;
    }
    const fromMe = props.messageInfo.fromMe ? 'from-me' : '';
    const msgColor = props.messageInfo.timestamp_read ? "" : props.messageInfo.timestamp_delivery ? classes.nonread : classes.nondelivered;
    const mediaAttachments = props.messageInfo.attachments.filter(attachment => attachment.isMedia());
    const fileAttachments = props.messageInfo.attachments.filter(attachment => !attachment.isMedia());
    let a = (
        <div className="messageBlock">
            <div className="avatar">
                {
                    props.avatar ?
                        (
                            <Avatar className="avatarIco"
                                    src={props.avatar.small}/>
                        )
                        :
                        (
                            <Avatar className="avatarIco"
                                    style={{backgroundColor: `${colorChange}`}}>
                                {props.userInfo.first_name[0].toUpperCase()}
                            </Avatar>
                        )
                }

            </div>
            <div onContextMenu={props.onContextMenu}
                 className={fromMe ? classes.fromMe + " " + msgColor : classes.toMe}>
                {
                    fromMe ? (
                        <Typography
                            variant="body2"
                            className={classes.senderName + ' senderName1'}>Я</Typography>
                    ) : (
                        <Typography
                            variant="body2"
                            className={classes.senderName + ' senderName1'}>{`${props.userInfo.first_name} ${props.userInfo.last_name}`}</Typography>
                    )
                }

                <Typography variant="body1" className={classes.mess + ' mess'}>
                    {props.messageInfo.message}
                </Typography>

                {
                    mediaAttachments.length ?
                        (
                            <>
                                <GridList className="gridList" cols={2}>
                                    {
                                        props.messageInfo.attachments.map(atta => {
                                            return (
                                                <GridListTile style={{height: 180, width: 320}} key={atta.id}
                                                              cols={colsNumber}>
                                                    <AttachmentShowMedia attachment={atta}/>
                                                </GridListTile>
                                            )
                                        })
                                    }
                                </GridList>
                            </>
                        ) : null
                }
                {
                    fileAttachments.length ?
                        (
                            <>
                                <GridList className="gridList" cols={2}>
                                    {
                                        props.messageInfo.attachments.map(atta => {
                                            return (
                                                <GridListTile key={atta.id} cols={colsNumber}>
                                                    <AttachmentShowFile attachment={atta}/>
                                                </GridListTile>
                                            )
                                        })
                                    }
                                </GridList>
                            </>
                        ) : null
                }
            </div>
            <Typography variant="caption"
                        className="caption">{props.messageInfo.formatted_time}</Typography>
        </div>

    );
    const {messageInfo} = props;

    if (!messageInfo.fromMe && !messageInfo.timestamp_read) {
        return (
            <VisibilitySensor active={true}
                              onEnterViewport={messageInfo.onViewport}
                              onChange={messageInfo.onViewport}>
                <div style={props.styl}>
                    {a}
                </div>
            </VisibilitySensor>
        );
    } else {
        return (
            <div style={props.styl}>
                {a}
            </div>
        );
    }
}

Message.defaultProps = {
    message: '',
    username: '',
    fromMe: false
};

export default observer(Message);