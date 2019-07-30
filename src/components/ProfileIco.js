import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AvatarColor from '../services/AvatarColor'
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Modal from "@material-ui/core/Modal";
import UserProfile from "./UserProfile";
import rootStore from "../store/RootStore";
import {observer} from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Close from "@material-ui/icons/Close"
import Save from "@material-ui/icons/SaveOutlined"
import CloudUpload from "@material-ui/icons/CloudUpload"
import "../css/avatarHover.css"
import Hidden from "@material-ui/core/Hidden";
import '../css/scrollbar.css'

const {accountStore, messagesStore} = rootStore;

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const top = 50;
const left = 50;
const styles = theme => ({

    root: {
        [theme.breakpoints.down('xs')]: {
            display: 'inline-flex',
            top: 0,
            marginLeft: 'auto',
        },
    },
    paper: {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        /*[theme.breakpoints.down('sm')]: {
            width: '95%',
        },*/
        //  position: 'fixed',
        //  top: 5,
        // left: '35%',
        // right: '35%',
        //bottom: 5,
        // transform: 'none',
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
        }`,


        // width: 890,
        boxShadow: theme.shadows[5],
    },
    menu: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#efefef' : "#49536d"
        }`,
    },
    menuItem: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
        }`,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 5,
    },
    toolbar: {
        padding: 0
    },
    avatar: {
        borderRadius: 5,
        width: 40,
        height: 40,
    },
    headerBlock: {
        outline: 'none',
        zIndex: 1,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
        }`,
        //height: 85,
        // width: '100%',
        padding: '15px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '0% 2%',
        },
        display: 'flex',
        alignItems: 'start',
        position: 'absolute',
        right: 5,
        top: 5,
       left: 5,
        borderRadius: '5px 5px 0px 0px',
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
        zIndex: 1,
        padding: 13,
        display: 'flex',
        position: 'absolute',
        right: 5,
        top: 53,
        left: 5,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
        }`,
        boxShadow: '0 6px 6px 0 rgba(0, 0, 0, 0.21)',
        // alignItems: 'center',
    },
    avatar1: {
        width: 90,
        height: 90,
        [theme.breakpoints.down('xs')]: {
            width: 75,
            height: 75,
        },
        borderRadius: 5,
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
            fontSize: '1.4rem',
        },
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
        }`,
        marginBottom: 5,
    },
    role: {
        fontSize: '1.1rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.7rem',
        },
        color: ` ${
            theme.palette.type === 'light' ? '#bcffff' : '#bcffff'
        }`,
    },
    saveIcon: {
        fontSize: 33,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
    },
    button: {
        marginLeft: 'auto',
        marginBottom: 'auto',
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
        }`,
        cursor: 'pointer',
    },
});

@observer
class ProfileIco extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.avatarInput = React.createRef();
    }

    state = {
        auth: true,
        avatar_image: null,
        small: null,
        anchorEl: null,
        open: false,
        // mime: this.props.theme.palette.mime,
    };
    handleChange = event => {
        this.setState({auth: event.target.checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleMenuOpen = () => {
        this.setState({open: true});

        this.handleClose();
    };

    handleMenuClose = () => {
        this.setState({open: false});
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
        const {classes, theme, chat} = this.props;
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        let colorChange = AvatarColor.getColor(accountStore.first_name[0]);
        let avatar_image = rootStore.imageService.images.find(elem => elem.userId === rootStore.accountStore.userId);


        return (
            <div className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    {
                        auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="secondary">
                                    {
                                        avatar_image ?
                                            (
                                                <Avatar className={classes.avatar} src={avatar_image.small}/>
                                            )
                                            :
                                            (
                                                <Avatar className={classes.avatar}
                                                        style={{backgroundColor: `${colorChange}`}}> {accountStore.first_name[0].toUpperCase() + accountStore.last_name[0].toUpperCase()} </Avatar>
                                            )
                                    }
                                </IconButton>

                                <Menu
                                    style={{zIndex: 2000}}
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    classes={{
                                        paper: classes.menu,
                                    }}
                                    open={open}
                                    onClose={this.handleClose}>
                                    <MenuItem onClick={this.handleMenuOpen}
                                              className={classes.menuItem}>Профиль</MenuItem>
                                    <MenuItem onClick={this.handleClose}
                                              className={classes.menuItem}>Настройки</MenuItem>
                                    <MenuItem onClick={this.props.handleLogout}
                                              className={classes.menuItem}>Выйти</MenuItem>
                                    <MenuItem onClick={this.props.changeThemeType}
                                              className={classes.menuItem}>Сменить тему</MenuItem>
                                </Menu>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleMenuClose}
                                    style={{zIndex: 1303}}>

                                        <div className={classes.paper}>
                                            <UserProfile handleMenuClose={this.handleMenuClose}/>
                                        </div>
                                </Modal>
                            </div>
                        )}
                </Toolbar>
            </div>
        );
    }
}

ProfileIco.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileIco);