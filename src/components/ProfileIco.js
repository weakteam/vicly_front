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

const styles = theme => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            display: 'inline-flex',
            top: 0,
            marginLeft: 'auto',
        },
    },
    paper: {
        position: 'absolute',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        width: 500,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
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
});

class ProfileIco extends React.Component {
    constructor(props) {
        super(props);
       // this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.chatsStore = messagesStore;
    }

    state = {
        auth: true,
        anchorEl: null,
        open: false,
        // type: this.props.theme.palette.type,
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

    render() {
        const {classes, theme, chat} = this.props;
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        let colorChange = AvatarColor.getColor(accountStore.first_name[0]);

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
                                    <Avatar style={{backgroundColor: `${colorChange}`}}> {accountStore.first_name[0].toUpperCase() + accountStore.last_name[0].toUpperCase()} </Avatar>
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

                                    <div style={getModalStyle()} className={classes.paper}>
                                        <UserProfile handleMenuClose={this.handleMenuClose} />
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