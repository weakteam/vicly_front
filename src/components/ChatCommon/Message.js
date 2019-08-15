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
import {observer} from "mobx-react";
import "../../css/message.css"
import VisibilitySensor from "react-visibility-sensor";

const styles = theme => ({
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
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#f9f9f9' : '#212C3D'
            }`,
            padding: '3px 14px 3px 14px',
            borderRadius: '10px 10px 10px 0',
            boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
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
        },
        senderName: {
            color: ` ${
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
        const fromMe = this.props.messageInfo.fromMe ? 'from-me' : '';
        const msgColor = this.props.messageInfo.timestamp_read ? "" : this.props.messageInfo.timestamp_delivery ? classes.nonread : classes.nondelivered;
        return (
            <Hidden mdUp>
                <div style={{flexDirection: fromMe ? 'row-reverse' : ''}} className="messageBlock">
                    <div style={{margin: fromMe ? '0 0 0 9px' : ''}} className="avatar">
                        {
                            this.props.avatar ?
                                (
                                    <Avatar className="avatarIco"
                                            src={this.props.avatar.small}/>
                                )
                                :
                                (
                                    <Avatar className="avatarIco"
                                            style={{backgroundColor: `${colorChange}`}}>
                                        {this.props.userInfo.first_name[0].toUpperCase()}
                                    </Avatar>
                                )
                        }
                    </div>
                    <div onContextMenu={this.props.onContextMenu}
                         className={fromMe ? classes.fromMeMob + " " + msgColor : classes.toMe}>
                        <div className="mobileHeaderPosition">
                            {
                                fromMe ? (
                                    <Typography
                                        variant="body2"
                                        className={classes.senderName + ' senderName1'}>Я</Typography>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        className={classes.senderName + ' senderName1'}>{`${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`}</Typography>
                                )
                            }
                            <Typography variant="caption"
                                        className="caption">{this.formatDate(this.props.messageInfo.timestamp_post.timestamp)}</Typography>
                        </div>
                        <Typography variant="body1"
                                    className={classes.mess + ' mess'}>{this.props.messageInfo.message}</Typography>
                        {
                            this.props.messageInfo.attachments.length ?
                                (
                                    <>
                                        <GridList className="gridList" cols={2}>
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
        const fromMe = this.props.messageInfo.fromMe ? 'from-me' : '';
        const msgColor = this.props.messageInfo.timestamp_read ? "" : this.props.messageInfo.timestamp_delivery ? classes.nonread : classes.nondelivered;
        return (
            <Hidden smDown>
                <div className="messageBlock">
                    <div className="avatar">
                        {
                            this.props.avatar ?
                                (
                                    <Avatar className="avatarIco"
                                            src={this.props.avatar.small}/>
                                )
                                :
                                (
                                    <Avatar className="avatarIco"
                                            style={{backgroundColor: `${colorChange}`}}>
                                        {this.props.userInfo.first_name[0].toUpperCase()}
                                    </Avatar>
                                )
                        }

                    </div>
                    <div onContextMenu={this.props.onContextMenu}
                         className={fromMe ? classes.fromMe + " " + msgColor : classes.toMe}>
                        {
                            fromMe ? (
                                <Typography
                                    variant="body2"
                                    className={classes.senderName + ' senderName1'}>Я</Typography>
                            ) : (
                                <Typography
                                    variant="body2"
                                    className={classes.senderName + ' senderName1'}>{`${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`}</Typography>
                            )
                        }

                        <Typography variant="body1" className={classes.mess + ' mess'}>
                            {this.props.messageInfo.message}
                        </Typography>

                        {
                            this.props.messageInfo.attachments.length ?
                                (
                                    <>
                                        <GridList className="gridList" cols={2}>
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
                                className="caption">{this.formatDate(this.props.messageInfo.timestamp_post.timestamp)}</Typography>
                </div>
            </Hidden>
        );
    };

    componentDidMount() {
        // this.props.cache.clear(this.props.index);
        // this.props.listRef.current.recomputeRowHeights(this.props.index);
        // this.props.measure();
    }

    render() {

        const {messageInfo} = this.props;

        if (!messageInfo.fromMe && !messageInfo.timestamp_read) {
            return (
                <VisibilitySensor active={true}
                                  onEnterViewport={messageInfo.onViewport}
                                  onChange={messageInfo.onViewport}>
                    <div ref={this.props.forwardedRef}>
                        {this.desktopMessages()}
                        {this.mobileMessages()}
                    </div>
                </VisibilitySensor>
            );
        } else {
            return (
                <div ref={this.props.forwardedRef}>
                    {this.desktopMessages()}
                    {this.mobileMessages()}
                </div>
            );
        }

    }
}

Message.defaultProps = {
    message: '',
    username: '',
    fromMe: false
};

export default withStyles(styles, {withTheme: true, index: 1})(Message);