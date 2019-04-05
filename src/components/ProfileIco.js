import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp'
import PersonOutline from '@material-ui/icons/PersonOutline'
import Settings from '@material-ui/icons/Settings'
import Avatar from "@material-ui/core/es/Avatar/Avatar";

import rootStore from "../store/RootStore";
const {accountStore,messagesStore} = rootStore;

const styles = theme => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            display: 'inline-flex',
            top: 0,
            marginLeft: 'auto',
        },
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
        this.accountStore = accountStore;
    }

    state = {
        auth: true,
        anchorEl: null,
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

    render() {
        const {classes, theme} = this.props;
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);

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
                                    <Avatar> {this.props.name} </Avatar>
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
                                    <MenuItem onClick={this.handleClose} className={classes.menuItem}><PersonOutline/>Профиль</MenuItem>
                                    <MenuItem onClick={this.handleClose} className={classes.menuItem}><Settings/>Настройки</MenuItem>
                                    <MenuItem onClick={this.props.handleLogout}
                                              className={classes.menuItem}><ExitToApp/>Выйти</MenuItem>
                                    <MenuItem onClick={this.props.changeThemeType}
                                              className={classes.menuItem}><ExitToApp/>Сменить тему</MenuItem>
                                </Menu>
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