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
                padding: '3px 14px 3px 14px',
                backgroundColor: '#E2F0F1',
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
                padding: '3px 14px 3px 14px',
                backgroundColor: '#E2F0F1',
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
                padding: '3px 14px 3px 14px',
                backgroundColor: '#f9f9f9',
                borderRadius: '10px 10px 10px 0',
                boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
            },
            messageBlock: {
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                display: 'flex',

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
                fontSize: '0.8rem',
                color: '#181818',
                whiteSpace: 'pre-wrap',
                // wordWrap: 'break-word',
                //overflowWrap: 'break-word',
                wordBreak: 'break-all',
                display: 'flex'
            },
            senderName: {
                minWidth: 'max-content',
                fontWeight: 500,
                color: '#2176a5'
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

    render() {
        // Was the message sent by the current user. If so, add a css class
        const fromMe = this.props.fromMe ? 'from-me' : '';
        const {classes} = this.props;
        const name = this.props.userInfo.first_name[0];
        let colorChange = AvatarColor.getColor(name);
        let colsNumber;
        if (this.props.messageInfo.attachments.length === 1) {
            colsNumber = 2;
        } else {
            colsNumber = 1;
        }

        let mobileMessage;

        const imagesAttachments = this.props.messageInfo.attachments.filter(elem => elem.canShowPreview() || elem.dataFetched !== "ready");
        const otherAttachments = this.props.messageInfo.attachments.filter(elem => !elem.canShowPreview() && elem.dataFetched !== "ready");

        const visibleSensor = !this.props.messageInfo.timestamp_read && !this.props.fromMe;

        const msgColor = this.props.messageInfo.timestamp_read ? "" : this.props.messageInfo.timestamp_delivery ? classes.nonread : classes.nondelivered;

        if (fromMe) {
            mobileMessage =

                <div className={classes.messageBlock}>
                    <div onContextMenu={this.props.onContextMenu} className={fromMe ? classes.fromMeMob + " " + msgColor : classes.toMe}>
                        <div style={{display: 'inline-flex', alignItems: 'center', width: '-webkit-fill-available'}}>
                            <Typography
                                variant="body2"
                                className={classes.senderName}>Я</Typography>
                            <Typography variant="caption"
                                        className={classes.caption}
                                        style={{marginRight: 14}}>{this.formatDate(this.props.messageInfo.timestamp_post.timestamp)}</Typography>
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
                    <div className={classes.avatarMob}>
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
                </div>
        } else {
            mobileMessage = <div className={classes.messageBlock}>
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
                <div onContextMenu={this.props.onContextMenu} className={fromMe ? classes.fromMe + " " + msgColor : classes.toMe}>
                    <div style={{display: 'inline-flex', alignItems: 'center', width: '-webkit-fill-available'}}>
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
                    {/*<GridList cellHeight={150} className={classes.gridList} cols={2}>
                        <GridListTile key="1" cols={1}>
                            <img src={img1} alt="lol"/>
                        </GridListTile>
                        <GridListTile key="1" cols={1}>
                            <img src={img2} alt="lol"/>
                        </GridListTile>
                        <GridListTile key="1" cols={2}>
                            <img src={img3} alt="lol"/>
                        </GridListTile>
                        <GridListTile key="1" cols={1}>
                            <img src={img1} alt="lol"/>
                        </GridListTile>
                        <GridListTile key="1" cols={1}>
                            <img src={img1} alt="lol"/>
                        </GridListTile>
                        <GridListTile key="1" cols={1}>
                            <img src={img1} alt="lol"/>
                        </GridListTile>
                        <GridListTile key="1" cols={1}>
                            <img src={img1} alt="lol"/>
                        </GridListTile>
                    </GridList>*/}
                </div>
            </div>
        }

        return (
            <div ref={this.props.forwardedRef}>
                <Hidden smDown implementation="css">
                    <div className={classes.root}>
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
                            <div onContextMenu={this.props.onContextMenu} className={fromMe ? classes.fromMe + " " + msgColor : classes.toMe }>
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
                    </div>
                </Hidden>


                <Hidden mdUp implementation="css">
                    <div className={fromMe ? classes.rootMob : classes.root}>
                        {mobileMessage}
                    </div>
                </Hidden>
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

export default withStyles(styles)(MessageViewport);