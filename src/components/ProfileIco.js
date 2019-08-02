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
import SettingsModal from "./SettingsModal";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import Person from '@material-ui/icons/PersonOutlineOutlined';
import Settings from '@material-ui/icons/SettingsOutlined'
import BrightnessMedium from '@material-ui/icons/BrightnessMediumOutlined'
import ExitToApp from '@material-ui/icons/ExitToAppOutlined'

const {accountStore, messagesStore} = rootStore;
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
        paddingRight: 0,
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
    text: {
        color: ` ${
            theme.palette.type === 'light' ? '#555555' : theme.palette.secondary.dark
        }`,
        fontWeight: 'normal',
        zIndex: 1303,
        fontSize: '1em'
    },
    switchRoot: {
      margin: 0,
    },
    infIcons: {
        marginRight: 10,
        color: ` ${
            theme.palette.type === 'light' ? '#5f5f5f' : theme.palette.secondary.dark
        }`,
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
        settingsOpen: false,
        checkedB: false,
        // mime: this.props.theme.palette.mime,
    };


    componentDidMount() {
        if (sessionStorage.getItem("theme") === 'dark') {
            this.setState({
                checkedB: true
            });
        } else {
            this.setState({
                checkedB: false
            });
        }
    };

    handleChange = event => {
        this.setState({auth: event.target.checked});
    };

  handleSwitchChange = event => {
      this.props.changeThemeType();
      if (sessionStorage.getItem("theme") === 'dark') {
          this.setState({
              checkedB: false
          });
      } else {
          this.setState({
              checkedB: true
          });
      }
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleMenuOpen = () => {
        this.handleClose();
        this.setState({open: true});
    };
    handleSettingsOpen = () => {
        this.handleClose();
        this.setState({
            open: true,
            settingsOpen: true,
        });
    };

    handleMenuClose = () => {
        this.setState({
            open: false,
            settingsOpen: false,
        });
    };

    handleSettingsClose = () => {
        this.setState({
            open: false,
            settingsOpen: false,
        });
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

    switchHandler = () => {

        if (sessionStorage.getItem("theme") === 'dark') {
            this.setState({
                checkedB: false
            });
        } else {
            this.setState({
                checkedB: true
            });
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
                                              className={classes.menuItem}>
                                        <Person className={classes.infIcons}/>
                                        <Typography variant="h6" className={classes.text}>Профиль</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleSettingsOpen}
                                              className={classes.menuItem}>
                                        <Settings className={classes.infIcons}/>
                                        <Typography variant="h6" className={classes.text}>Настройки</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleSwitchChange} className={classes.menuItem}>
                                        <BrightnessMedium className={classes.infIcons}/>
                                        <Typography variant="h6" className={classes.text}>Ночная тема</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </MenuItem>
                                    <MenuItem onClick={this.props.handleLogout}
                                              className={classes.menuItem}>
                                        <ExitToApp className={classes.infIcons}/>
                                        <Typography variant="h6" className={classes.text}>Выйти</Typography>
                                    </MenuItem>
                                </Menu>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleMenuClose}
                                    style={{zIndex: 1303}}>
                                    {
                                        this.state.settingsOpen ? (
                                            <div className={classes.paper}>
                                                <SettingsModal settingsOpen={this.state.settingsOpen} handleSettingsClose={this.handleSettingsClose}/>
                                            </div>
                                        ) : (
                                            <div className={classes.paper}>
                                                <UserProfile  handleMenuClose={this.handleMenuClose}/>
                                            </div>
                                        )
                                    }
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