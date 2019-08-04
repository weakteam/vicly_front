import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from "@material-ui/core/es/Divider";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Close from "@material-ui/icons/Close"
import IconButton from '@material-ui/core/IconButton';
import rootStore from "../../store/RootStore";
import Save from "@material-ui/icons/SaveOutlined";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Phone from '@material-ui/icons/PhoneOutlined';
import Person from '@material-ui/icons/PersonOutline';
import CardTravel from '@material-ui/icons/CardTravelOutlined';
import Group from '@material-ui/icons/GroupOutlined';
import Info from '@material-ui/icons/InfoOutlined';
import Create from '@material-ui/icons/CreateOutlined';
import PersonAdd from '@material-ui/icons/PersonAddOutlined'
import ExitToApp from '@material-ui/icons/ExitToApp';
import "../../css/avatarHover.css";

const {accountStore, messagesStore} = rootStore;
const styles = theme => ({
    root: {
        // zIndex: 1300,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        justifyContent: 'center',
        // padding: 30,
        boxShadow: theme.shadows[0],
        // paddingBottom: 10,
        backgroundColor: '',
    },
    headerBlock: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
        }`,
        //height: 85,
        //width: '100%',
        padding: '15px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '0% 3%',
        },
        display: 'flex',
        alignItems: 'start',
        position: 'absolute',
        right: 0,
        left: 0,
        borderRadius: '10px 10px 0px 0px',
    },
    header: {
        textAlign: 'start',
        fontSize: '1em',
        //marginLeft: 10,
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.dark
        }`,
    },
    fixWidth: {
        /* boxShadow: '0 6px 6px 0 rgba(0, 0, 0, 0.21)',*/
        position: 'absolute',
        top: 50,
        right: 0,
        left: 0,
        padding: '24px 30px',
        //background-color: #f6f6f6;
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
        }`,
        [theme.breakpoints.down('xs')]: {
            padding: '0% 3%',
        },
        display: 'flex',
        alignItems: 'start',
    },
    userName: {
        marginLeft: 18,
        overflow: 'hidden',
    },
    userName1: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontWeight: 'bold',
        // width: '100%',
        fontSize: '2.4rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.4em',
        },
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
        }`,
        marginBottom: 5,
    },
    role: {
        fontSize: '1.1rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1em',
        },
        color: ` ${
            theme.palette.type === 'light' ? '#bcffff' : '#bcffff'
        }`,
    },
    message2: {
        // fontSize: '0.9rem'
    },
    text2: {
        marginLeft: 'auto',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
        fontSize: '0.95rem',
    },
    fioText: {
        color: ` ${
            theme.palette.type === 'light' ? '#bfbfbf' : theme.palette.secondary.dark
        }`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        //  width: '100%',
        fontSize: '1rem',
        marginBottom: 5,
    },
    infBlock: {
        display: 'flex',
        marginTop: 30,
        [theme.breakpoints.down('xs')]: {
            marginTop: '9%',
        },
    },
    infBlockFirst: {
        display: 'flex',

    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        //  width: '100%',
        fontSize: '0.95rem',
        marginBottom: 5,
    },
    block: {
        width: '100%'
    },
    blockForm: {
        overflowY: 'auto',
        height: '100%',
        WebkitOverflowScrolling: 'touch',
        //display: 'flex',
        // overflow: 'hidden',
        // alignItems: 'flex-start',
        padding: '0px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '0 3%',
        },
    },
    form: {

        position: 'absolute',
        top: 187,
        [theme.breakpoints.down('xs')]: {
            top: 144,
        },
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: 1,
        boxShadow: '0 -10px 7px 0px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        width: '100%', // Fix IE 11 issue.
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
        }`,
    },
    textInf: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: ` ${
            theme.palette.type === 'light' ? '#5f5f5f' : theme.palette.secondary.dark
        }`,
    },
    textPassword: {

        textAlign: 'end',
    },
    kek: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadIcon: {
        position: 'absolute',
        visibility: 'hidden',
        zIndex: 9000,
        padding: 20,
        //  display: 'none',

        '&:hover': {
            backgroundColor: '#000',
            borderRadius: '50%',
            zIndex: 9000,
            display: 'block',
            visibility: 'visible',
            cursor: 'pointer',
        },
    },
    avatar: {
        width: 90,
        height: 90,
        [theme.breakpoints.down('xs')]: {
            width: 75,
            height: 75,
        },
        borderRadius: 5,
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
        }`,
        cursor: 'pointer',
    },
    saveIcon: {
        fontSize: 33,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
    },
    button: {
        marginLeft: 'auto'
    },
    infIcons: {
        marginRight: 10,
        color: ` ${
            theme.palette.type === 'light' ? '#5f5f5f' : theme.palette.secondary.dark
        }`,
    },
    infoStyle: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 33,
        marginTop: 33,
        [theme.breakpoints.down('xs')]: {
            marginBottom: '7%',
            marginTop: '3%',
        },
    },

});

class GroupChatInfo extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.avatarInput = React.createRef();
    }

    state = {
        avatar_image: null,
        small: null
    };

    handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                avatar_image: URL.createObjectURL(event.target.files[0]),
                small: event.target.files[0]
            });
        }
    };

    handleAvatarUpload = () => {
        if (this.avatarInput.current.files && this.avatarInput.current.files[0]) {
            rootStore.imageService.uploadAvatar(this.avatarInput.current.files[0]);
        }
    };

    render() {
        const {classes} = this.props;
        const workgroup = this.messagesStore.groups.find(elem => elem.id === this.accountStore.groupId);

        let avatar_image = rootStore.imageService.images.find(elem => elem.userId === this.accountStore.userId);

        return (
            <>
                <div className={classes.headerBlock}>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center',}}>
                            <Typography variant="overline" className={classes.header}>
                                Информация о группе
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleMenuClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>
                        </div>


                    </div>
                </div>
                <div className={classes.fixWidth}>
                    {/*//src={user.avatar ? `${BACKEND_URL}/attachment/download/${user.avatar}?width=400` : ""}*/}
                    <label htmlFor='avatar-input'>
                        {
                            this.state.avatar_image || avatar_image ?
                                (
                                    <div className="avatarArea">
                                        <div className="downloadHover">
                                            <CloudUpload className="downloadIcon"/>
                                        </div>
                                        <Avatar
                                            className={classes.avatar}
                                            src={this.state.avatar_image || avatar_image.small}/>

                                    </div>
                                )
                                :
                                (
                                    <div className="avatarArea">
                                        <div className="downloadHover">
                                            <CloudUpload className="downloadIcon"/>
                                        </div>
                                        <Avatar className={classes.avatar}>
                                            {this.accountStore.first_name[0].toUpperCase() + this.accountStore.last_name[0].toUpperCase()}
                                        </Avatar>
                                    </div>
                                )
                        }

                    </label>
                    <input onChange={this.handleImageChange} hidden id="avatar-input" type="file"
                           accept="image/x-png,image/jpeg"
                           ref={this.avatarInput}/>
                    <div className={classes.userName}>
                        <Typography variant="h5"
                                    className={classes.userName1}>{this.accountStore.fullName}</Typography>
                        <Typography variant="caption"
                                    noWrap
                                    className={classes.role}>12 участников</Typography>
                    </div>
                    <IconButton className={classes.button} color="primary" onClick={this.handleAvatarUpload}
                                aria-label="Delete">
                        <ExitToApp style={{color: '#fff'}} className={classes.saveIcon}/>
                    </IconButton>
                    {/*  disabled={!this.state.blob} не Работает!!!!*/}
                </div>
                <form className={classes.form}>
                    <div className={classes.blockForm}>
                        <div className={classes.infoStyle}>
                            <Typography variant="h3" className={classes.textInf}>Участники</Typography>
                            <PersonAdd style={{marginLeft: 'auto', color: '#0a8d8d'}}/>
                        </div>

                        <Divider/>
                    </div>
                </form>
            </>
        );
    }
}

const GroupChat = withStyles(styles, {withTheme: true, index: 1})(GroupChatInfo);

export default GroupChat;