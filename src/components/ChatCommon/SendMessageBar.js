import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import SendOutlined from '@material-ui/icons/SendOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FormControl from "@material-ui/core/FormControl/index";
import InputBase from "@material-ui/core/InputBase/index";
import {fade} from "@material-ui/core/styles/colorManipulator";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import UserProfile from "../UserProfile";
import Modal from "@material-ui/core/Modal";
import DocumentWindow from "./DocumentWindow";

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
    position: {
        margin: '5px 5px 0px 5px',
        borderRadius: 5,
        boxShadow: ` ${
            theme.palette.type === 'light' ? '0px 0px 4px 0px #9f9f9f3b' : '0px 0px 4px 0px #22222291'
            }`,
        height: 'auto',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.darkSecondary
            }`,
        borderTop: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
            }`,
        /*borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
            }`,*/
        left: 400,
        [theme.breakpoints.down('md')]: {
            left: 280,
        },
        [theme.breakpoints.down('sm')]: {
            left: 250,
        },
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },
        bottom: 0,
        display: 'inline-flex',
        position: 'fixed',
        alignItems: 'center',
        right: 0,
    },
    paper: {
        position: 'absolute',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        width: 500,
        boxShadow: theme.shadows[5],
    },
    iconButton: {
        width: 48,
        height: 48,
    },
    input: {
        borderRadius: 4,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? 'rgba(234, 234, 234, 0.59)' : 'rgb(101, 114, 146)'
            }`,
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    active: {
        '&:focus': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            //   borderColor: '#819bff',
            boxShadow: `${fade('#3750ef', 0.25)} 0 0 0 0.2rem`,
            //   border: '1px solid #b9daff',
            // boxShadow: `${fade('#9cabef', 0.25)} 0 0 0 0.2rem`,
        },
        /*'&:selected': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('#ff2f00', 0.25)} 0 0 0 0.2rem`,
        },*/
        width: 'calc(100% - 18px)',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        // width: '100%',
        paddingTop: 13,
        borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            }`,
        paddingBottom: 13,
        paddingLeft: 10,
        paddingRight: 10,
        maxHeight: 150,
        height: 'auto',
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
});

class SendMessageBar extends React.Component {
    state = {
        messageText: "",
        auth: true,
        anchorEl: null,
        open: false,
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

    handleSendButton = () => {
        if (!this.state.messageText.trim())
            return;
        this.props.handleSendMessage({
            message: this.state.messageText,
            fromMe: true
        });
        this.setState({
            messageText: ""
        })
    };

    handleOnTextChange = (e) => {
        this.setState({
            messageText: e.target.value
        });
    };

    onEnterDown = (event) => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.keyCode == 13 && event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            this.handleSendButton();
        }
    };

    render() {
        const {classes, theme} = this.props;
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.position}>

                <IconButton className={classes.iconButton}  onClick={this.handleMenu}>
                    <AttachFile className={classes.icon}/>
                </IconButton>

                <FormControl fullWidth>
                    <InputBase
                        placeholder="Введите сообщение"
                        multiline
                        type="text"
                        onKeyDown={this.onEnterDown}
                        value={this.state.messageText}
                        onChange={this.handleOnTextChange}
                        classes={{input: classes.active}}
                        endAdornment={
                            <InputAdornment position="end" color="secondary">
                                <IconButton disabled={!this.state.messageText.trim()}
                                            onClick={this.handleSendButton.bind(this)}>
                                    <SendOutlined/>
                                </IconButton>
                            </InputAdornment >
                        }/>
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
                                  className={classes.menuItem}>Изображение</MenuItem>
                        <MenuItem onClick={this.handleClose}
                                  className={classes.menuItem}>Видео</MenuItem>
                        <MenuItem  className={classes.menuItem} onClick={this.handleMenuOpen}>Документ</MenuItem>
                    </Menu>
                </FormControl>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleMenuClose}
                    style={{zIndex: 1303}}>

                    <div style={getModalStyle()} className={classes.paper}>
                        <DocumentWindow handleMenuClose={this.handleMenuClose}/>
                    </div>

                </Modal>

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(SendMessageBar);