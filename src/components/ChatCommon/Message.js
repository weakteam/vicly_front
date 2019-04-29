import React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {withStyles} from '@material-ui/core/styles/index';
import Typography from "@material-ui/core/Typography/Typography";
import div from "@material-ui/core/Grid/Grid";
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import {fade} from "@material-ui/core/styles/colorManipulator";
import AvatarColor from "../../services/AvatarColor"
import {observer} from "mobx-react";
import rootStore from "../../store/RootStore";
import img1 from '../../images/fon3b.jpg';
import img2 from '../../images/fon2.jpg';
import img3 from '../../images/fon1.jpg';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

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
        width: 35,
        height: 35,
        boxShadow: 'inset 0px 4px 2px 0px rgba(0, 0, 0, 0.08)',
    },
    fromMe: {
        boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
        maxWidth: 500,
        [theme.breakpoints.down('md')]: {
            maxWidth: 300,
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 250,
        },
        padding: '3px 14px 3px 14px',
        backgroundColor: '#d5f0ff',
        borderRadius: 10,
    },

    fromMeMob: {
        maxWidth: 500,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 300,
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: 300,
        },
        padding: '3px 14px 3px 14px',
        backgroundColor: '#e2f0f1',
        borderRadius: 10,
        boxShadow: 'inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1)',
    },
    toMe: {
        maxWidth: 500,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 300,
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: 300,
        },
        padding: '3px 14px 3px 14px',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
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
        [theme.breakpoints.down('md')]: {
            maxWidth: 300,
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 300,
        },
        padding: 8,
        backgroundColor: '#efefef',
        borderRadius: 10,
    },
    nonread: {
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        boxShadow: `${fade('#ef0511', 0.25)} 0 0 0 0.2rem`,
        border: '1px solid #000',
    },
    mess: {
        fontSize: '0.8rem',
        color: '#181818',
        whiteSpace: 'pre',
    },
    senderName: {
        minWidth: 'max-content',
        fontWeight: 500,
        color: '#2176a5'
    },
    gridList: {
        margin: '10px!important',
        maxWidth: 500,
        [theme.breakpoints.down('md')]: {
            maxWidth: 300,
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 250,
        },
    },
});

function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

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

        let mobileMessage;
        if (fromMe) {
            mobileMessage =
                <div className={classes.messageBlock}>

                <div className={fromMe ? classes.fromMe : classes.toMe}>
                    <div style={{display: 'inline-flex', alignItems: 'center', width: '-webkit-fill-available'}}>
                        <Typography
                            variant="body2"
                            className={classes.senderName}>Я</Typography>
                        <Typography variant="caption"
                                    className={classes.caption}
                                    style={{marginRight: 14}}>{this.formatDate(this.props.messageInfo.timestamp_post.timestamp)}</Typography>
                    </div>
                    <Typography variant="body1" className={classes.mess}>{this.props.message}</Typography>
                </div>
                <div className={classes.avatarMob}>
                    {
                        this.props.avatar ?
                            (
                                <Avatar className={classes.avatarIco}
                                        style={{backgroundColor: `${colorChange}`}}
                                        src={this.props.avatar.blob}/>
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
                                        style={{backgroundColor: `${colorChange}`}}
                                        src={this.props.avatar.blob}/>
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
                <div className={fromMe ? classes.fromMe : classes.toMe}>
                    <div style={{display: 'inline-flex', alignItems: 'center', width: '-webkit-fill-available'}}>
                        <Typography
                            variant="body2"
                            className={classes.senderName}>{`${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`}</Typography>
                        <Typography variant="caption"
                                    className={classes.caption}>{this.formatDate(this.props.messageInfo.timestamp_post.timestamp)}</Typography>
                    </div>
                    <Typography variant="body1" className={classes.mess}>{this.props.message}</Typography>
                    <GridList cellHeight={150} className={classes.gridList} cols={2}>
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
                    </GridList>
                </div>
            </div>
        }

        return (
            <div>
                <Hidden smDown implementation="css">
                    <div className={classes.root}>
                        <div className={classes.messageBlock}>
                            <div className={classes.avatar}>
                                {
                                    this.props.avatar ?
                                        (
                                            <Avatar className={classes.avatarIco}
                                                    style={{backgroundColor: `${colorChange}`}}
                                                    src={this.props.avatar.blob}/>
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
                            <div className={fromMe ? classes.fromMe : classes.toMe}>
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
                                <GridList cellHeight={150} className={classes.gridList} cols={2}>
                                    <GridListTile key="1" cols={1}>
                                        <img src={img1} alt="lol"/>
                                    </GridListTile>
                                    <GridListTile key="1" cols={1}>
                                        <img src={img2} alt="lol"/>
                                    </GridListTile>
                                    <GridListTile key="1" cols={1}>
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
                                </GridList>
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

export default withStyles(styles)(Message);