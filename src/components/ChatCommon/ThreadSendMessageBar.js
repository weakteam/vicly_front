import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import SendOutlined from '@material-ui/icons/SendOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FormControl from "@material-ui/core/FormControl/index";
import InputBase from "@material-ui/core/InputBase/index";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import DocumentWindow from "./DocumentWindow";
import rootStore from "../../store/RootStore";
import AttachmentBar from "./AttachmentBar";
import Slide from "@material-ui/core/Slide";

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
       // margin: '5px 5px 5px 5px',
        borderRadius: '0px 0px 5px 5px',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.darkSecondary
            }`,
        borderTop: ` ${
             theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
             }`,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'inline-flex',
        position: 'absolute',
        alignItems: 'end',
    },
    paper: {
        outline: 'none',
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
        /* '&:focus': {
             transition: theme.transitions.create(['border-color', 'box-shadow']),
             //   borderColor: '#819bff',
             boxShadow: `${fade('#3750ef', 0.25)} 0 0 0 0.2rem`,
             //   border: '1px solid #b9daff',
             // boxShadow: `${fade('#9cabef', 0.25)} 0 0 0 0.2rem`,
         },*/
        /*'&:selected': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('#ff2f00', 0.25)} 0 0 0 0.2rem`,
        },*/
        width: 'calc(100% - 18px)',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        // width: '100%',
        padding: '10px 5px 10px 5px',
        borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            }`,
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

class ThreadSendMessageBar extends React.Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    state = {
        messageText: "",
        auth: true,
        anchorEl: null,
        open: false,
        attachments: [],
        upload: false,
    };


    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
        this.setState({
            upload: false,
        })
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
        const attachReady = this.state.attachments.every(attach => attach.statusFull === "ready");
        if (!this.state.messageText.trim() && attachReady) {
            alert("There are broken attachments!!!!");
            return;
        }
        this.props.handleSendMessage({
            message: this.state.messageText,
            attachments: this.state.attachments.map(attach => attach.id),
            fromMe: true
        });
        this.setState({
            messageText: "",
            attachments: []
        })
    };

    handleOnTextChange = (e) => {
        this.setState({
            messageText: e.target.value
        });
    };

    handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            let attachments = [];
            for (var i = 0; i < event.target.files.length; i++) {
                let file = event.target.files[i];
                let a = rootStore.attachmentService.uploadFile(file, (progress) => console.log("Progress:" + progress));
                attachments.push(a);
            }
            this.setState((prevState) => {
                let attachs = prevState.attachments.concat(attachments);
                return {
                    attachments: attachs
                }
            });
        }
    };

    handleAddAttachments = (accept) => (e) => {
        this.handleClose();
        this.fileInput.current.accept = accept;
        this.fileInput.current.click();

        this.setState({
            upload: true
        })
    };

    handleDeleteAttachment = (attachment) => {
        this.setState((prevState) => {
            return {
                attachments: prevState.attachments.filter(file => file.id !== attachment.id)
            }
        })

    };

    onEnterDown = (event) => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.keyCode === 13 && event.shiftKey) {
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


                <IconButton className={classes.iconButton} onClick={this.handleMenu}>
                    <AttachFile className={classes.icon}/>
                </IconButton>

                <FormControl fullWidth>
                    {
                        this.state.attachments.length ?
                            (
                                <Slide direction="up" timeout={300} in={this.state.attachments.length} mountOnEnter unmountOnExit>
                                    <AttachmentBar handleDeleteAttachment={this.handleDeleteAttachment}
                                                   attachments={this.state.attachments}/>
                                </Slide>
                            ) : null
                    }
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
                                <IconButton disabled={!this.state.messageText.trim() && !this.state.attachments.length > 0}
                                            onClick={this.handleSendButton.bind(this)}>
                                    <SendOutlined/>
                                </IconButton>
                            </InputAdornment>
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
                        <MenuItem onClick={this.handleAddAttachments("image/x-png,image/jpeg")}
                                  className={classes.menuItem}>
                            Изображение
                        </MenuItem>
                        <MenuItem onClick={this.handleAddAttachments("video/*")}
                                  className={classes.menuItem}>
                            Видео
                        </MenuItem>
                        <MenuItem className={classes.menuItem}
                                  onClick={this.handleMenuOpen}>
                            Документ
                        </MenuItem>
                    </Menu>

                    <input onChange={this.handleFileChange} hidden id="file-input" type="file"
                           ref={this.fileInput}
                           multiple/>
                </FormControl>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleMenuClose}
                    style={{zIndex: 1303}}>

                    <div style={getModalStyle()} className={classes.paper}>
                        <DocumentWindow upload={this.state.upload} attachments={this.state.attachments} handleAddAttachments={this.handleAddAttachments} handleMenuClose={this.handleMenuClose}/>
                    </div>

                </Modal>

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true, index: 1})(ThreadSendMessageBar);