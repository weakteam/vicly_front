import React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {withStyles} from '@material-ui/core/styles/index';
import Typography from "@material-ui/core/Typography/Typography";
import div from "@material-ui/core/Grid/Grid";
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import {fade} from "@material-ui/core/styles/colorManipulator";
import AvatarColor from "../../services/AvatarColor"
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AttachmentShow from "./AttachmentShow";
import handleViewport from 'react-in-viewport';
import {observer} from "mobx-react";
import "../../css/message.css"


const styles = theme => ({
            root: {
                paddingBottom: 20,

            },
            rootMob: {
                paddingBottom: 20,
                display: 'flex',
                justifyContent: 'flex-end',
            },
            avatar: {
                marginRight: 9,
                display: 'flex',
                alignItems: 'flex-end',
                borderRadius: 0,
            },
            avatarMob: {
                marginLeft: 9,
                display: 'flex',
                alignItems: 'flex-end',
            },
            avatarIco: {
                width: 40,
                height: 40,
                borderRadius: 5,
                boxShadow: 'inset 0px 4px 2px 0px rgba(0, 0, 0, 0.08)',
            },
            fromMe: {
                boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
                maxWidth: 500,
                [theme.breakpoints.down('md')]: {
                    maxWidth: 226,
                },
                [theme.breakpoints.down('xs')]: {
                    maxWidth: 300,
                },
                backgroundColor: ` ${
                    theme.palette.type === 'light' ? '#E2F0F1' : '#007776'
                }`,
                padding: '3px 14px 3px 14px',
                borderRadius: '10px 10px 10px 0',
            },

            fromMeMob: {
                maxWidth: 500,
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300,
                },
                [theme.breakpoints.down('xs')]: {
                    maxWidth: 225,
                },
                backgroundColor: ` ${
                    theme.palette.type === 'light' ? '#E2F0F1' : '#007776'
                }`,
                padding: '3px 14px 3px 14px',
                borderRadius: '10px 10px 0px 10px',
                boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
            },
            toMe: {
                maxWidth: 500,
                [theme.breakpoints.down('md')]: {
                    maxWidth: 226,
                },
                [theme.breakpoints.down('xs')]: {
                    maxWidth: 225,
                },
                //212C3D
                backgroundColor: ` ${
                    theme.palette.type === 'light' ? '#f9f9f9' : '#212C3D'
                }`,
                padding: '3px 14px 3px 14px',
                borderRadius: '10px 10px 10px 0',
                boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
            },
            messageBlock: {
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                display: 'flex',
                paddingBottom: 10,
            },
            caption: {
                marginLeft: 14,
                color: '#bbb',
            },
            wrap: {
                maxWidth: 500,
                [theme.breakpoints.down('xs')]: {
                    maxWidth: 300,
                },
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300,
                },
                padding: 8,
                backgroundColor: '#efefef',
                borderRadius: 10,
            },
            // If my message not readed yet!
            nonread: {
                transition: theme.transitions.create(['border-color', 'box-shadow']),
                boxShadow: `${fade('#fb8c00', 0.25)} 0 0 0 0.2rem`,
            },
            nondelivered: {
                transition: theme.transitions.create(['border-color', 'box-shadow']),
                boxShadow: `${fade('rgba(239, 5, 17)', 0.25)} 0px 3px 6px 0px`,
            },
            mess: {
                color: ` ${
                    theme.palette.type === 'light' ? '#181818' : '#fff'
                }`,
                fontSize: '0.8rem',
                whiteSpace: 'pre-wrap',
                // wordWrap: 'break-word',
                //overflowWrap: 'break-word',
                wordBreak: 'break-all',
                display: 'flex'
            },
            senderName: {
                minWidth: 'max-content',
                fontWeight: 500,
                color: ` ${
                    theme.palette.type === 'light' ? '#227B87' : '#8cfff0'
                }`,

            },
            gridList: {
                margin: '6px 0px 6px 0px!important',
                maxWidth: 300,
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300,
                },
                [theme.breakpoints.down('xs')]: {
                    maxWidth: 250,
                },
            },
        }
    )
;

function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

@observer
class Message extends React.Component {

    formatDate = (timestamp) => {
        const now = new Date(Date.now());
        let date = new Date(timestamp);
        const today = now.toDateString() === date.toDateString();
        const mins = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        if (today) {
            return date.getHours() + ":" + mins;
        } else {
            //  return date.getHours() + ":" + mins + " " + date.getDay() + "/" + date.getMonth() + "/" + (date.getFullYear() - 2000);
            return date.getHours() + ":" + mins;
        }
    };

    mobileMessages = () => {
        const {classes} = this.props;
        const name = this.props.userInfo.first_name[0];
        let colorChange = AvatarColor.getColor(name);
        let colsNumber;
        if (this.props.messageInfo.attachments.length === 1) {
            colsNumber = 2;
        } else {
            colsNumber = 1;
        }
        const fromMe = this.props.fromMe ? 'from-me' : '';
        const msgColor = this.props.messageInfo.timestamp_read ? "" : this.props.messageInfo.timestamp_delivery ? classes.nonread : classes.nondelivered;
        return (
            <Hidden mdUp>
                <div style={{flexDirection: fromMe ? 'row-reverse' : ''}} className={classes.messageBlock}>
                    <div style={{margin: fromMe ? '0 0 0 9px' : ''}} className={classes.avatar}>
                        {
                            this.props.avatar ?
                                (
                                    <Avatar className={classes.avatarIco}
                                            src={this.props.avatar.small}/>
                                )
                                :
                                (
                                    <Avatar className={classes.avatarIco}
                                            style={{backgroundColor: `${colorChange}`}}>
                                        {this.props.userInfo.first_name[0].toUpperCase()}
                                    </Avatar>
                                )
                        }
                    </div>
                    <div onContextMenu={this.props.onContextMenu}
                         className={fromMe ? classes.fromMeMob + " " + msgColor : classes.toMe}>
                        <div style={{display: 'inline-flex', alignItems: 'start', width: '-webkit-fill-available'}}>
                            <Typography
                                variant="body2"
                                className={classes.senderName}>{`${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`}</Typography>
                            <Typography variant="caption"
                                        className={classes.caption}>{this.formatDate(this.props.messageInfo.timestamp_post.timestamp)}</Typography>
                        </div>
                        <Typography variant="body1" className={classes.mess}>{this.props.message}</Typography>
                        {
                            this.props.messageInfo.attachments.length ?
                                (
                                    <>
                                        <GridList className={classes.gridList} cols={2}>
                                            {
                                                this.props.messageInfo.attachments.map(atta => {
                                                    return (
                                                        <GridListTile style={{height: 'auto'}} key={atta.id}
                                                                      cols={colsNumber}>
                                                            <AttachmentShow attachment={atta}/>
                                                        </GridListTile>
                                                    )
                                                })
                                            }
                                        </GridList>

                                    </>
                                ) : null
                        }
                    </div>
                </div>
            </Hidden>
        )
    };

    desktopMessages = () => {
        const {classes} = this.props;
        const name = this.props.userInfo.first_name[0];
        let colorChange = AvatarColor.getColor(name);
        let colsNumber;
        if (this.props.messageInfo.attachments.length === 1) {
            colsNumber = 2;
        } else {
            colsNumber = 1;
        }
        const fromMe = this.props.fromMe ? 'from-me' : '';
        const msgColor = this.props.messageInfo.timestamp_read ? "" : this.props.messageInfo.timestamp_delivery ? classes.nonread : classes.nondelivered;
        return (
            <Hidden smDown implementation="js">
                <div className={classes.messageBlock}>
                    <div className={classes.avatar}>
                        {
                            this.props.avatar ?
                                (
                                    <Avatar className={classes.avatarIco}
                                            src={this.props.avatar.small}/>
                                )
                                :
                                (
                                    <Avatar className={classes.avatarIco}
                                            style={{backgroundColor: `${colorChange}`}}>
                                        {this.props.userInfo.first_name[0].toUpperCase()}
                                    </Avatar>
                                )
                        }

                    </div>
                    <div onContextMenu={this.props.onContextMenu}
                         className={fromMe ? classes.fromMe + " " + msgColor : classes.toMe}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            width: '-webkit-fill-available'
                        }}>
                            {
                                fromMe ? (
                                    <Typography
                                        variant="body2"
                                        className={classes.senderName}>Я</Typography>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        className={classes.senderName}>{`${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`}</Typography>
                                )
                            }

                        </div>
                        <Typography variant="body1" className={classes.mess}>
                            {this.props.message}
                        </Typography>

                        {
                            this.props.messageInfo.attachments.length ?
                                (
                                    <>
                                        <GridList className={classes.gridList} cols={2}>
                                            {
                                                this.props.messageInfo.attachments.map(atta => {
                                                    return (
                                                        <GridListTile style={{height: 'auto'}} key={atta.id}
                                                                      cols={colsNumber}>
                                                            <AttachmentShow attachment={atta}/>
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
                                className={classes.caption}>{this.formatDate(this.props.messageInfo.timestamp_post.timestamp)}</Typography>
                </div>
            </Hidden>
        );
    };

    render() {
        return (
            <div ref={this.props.forwardedRef}>
                {this.desktopMessages()}
                {this.mobileMessages()}
            </div>
        );
    }
}

Message.defaultProps = {
    message: '',
    username: '',
    fromMe: false
};

const MessageViewport = handleViewport(Message, {}, {disconnectOnLeave: true});

export default withStyles(styles, {withTheme: true, index: 1})(MessageViewport);