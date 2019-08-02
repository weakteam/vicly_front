import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from "@material-ui/core/es/Divider";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Close from "@material-ui/icons/Close"
import IconButton from '@material-ui/core/IconButton';
import rootStore from "../store/RootStore";
import Save from "@material-ui/icons/SaveOutlined"
import CloudUpload from "@material-ui/icons/CloudUpload"
import Notifications from '@material-ui/icons/NotificationsOutlined'
import Person from '@material-ui/icons/PersonOutline'
import CardTravel from '@material-ui/icons/CardTravelOutlined'
import Group from '@material-ui/icons/GroupOutlined'
import Info from '@material-ui/icons/InfoOutlined'
import Create from '@material-ui/icons/CreateOutlined'
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Translate from '@material-ui/icons/TranslateOutlined';
import List from '@material-ui/core/List';
import "../css/avatarHover.css"
import Loyalty from "@material-ui/core/SvgIcon/SvgIcon";
import Dialog from "./ChatUser/Dialog";
import GroupChat from "./ChatGroup/GroupChat";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
        /* boxShadow: '0 6px 6px 0 rgba(0, 0, 0, 0.21)',*/
        position: 'absolute',
        top: 50,
        right: 0,
        left: 0,
        padding: '24px 30px',
        //background-color: #f6f6f6;
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#8d0007' : '#0A8D8D'
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
        marginRight: 0,
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
        alignItems: 'center'
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
        top: 72,
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
    gutters: {
        paddingTop: 6,
        paddingBottom: 6,
    },
    groupName: {
      //padding: 0,
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0)',
        },
        '&:focus': {
            backgroundColor: 'rgba(0,0,0,0)',
        },
        borderRadius: 5,
        padding: 5,
    },
    workgroupName: {
        display: 'flex',
        alignItems: 'center'
    },
    textGroup: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
        fontSize: '0.9rem'
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
    },
    active: {
        margin: '10px 0 0 39px',
    },

});

class SettingsModal extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.avatarInput = React.createRef();
    }

    state = {
        openNotification: false,
        openLanguage: false,
        checkedB: false,
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

    handleClick = () => {
        this.setState(state => ({openNotification: !state.openNotification}));
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
                                Настройки
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleSettingsClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>
                        </div>


                    </div>
                </div>

                <form className={classes.form}>
                    <div className={classes.blockForm}>
                        <div className={classes.infoStyle}>
                            <Typography variant="h3" className={classes.textInf}>Настройки аккаунта</Typography>
                        </div>
                        <div>
                            <ListItem button onClick={this.handleClick} className={classes.groupName} classes={{}}>
                                <ListItem disableGutters classes={{
                                    root: classes.gutters,
                                }}>
                                    <div className={classes.workgroupName}>
                                        <Notifications className={classes.infIcons}/>
                                        <Typography variant='button' className={classes.textGroup}>
                                           Уведомления
                                        </Typography>
                                    </div>
                                </ListItem>
                                {this.state.openNotification ? <ExpandLess className={classes.icon}/> :
                                    <ExpandMore className={classes.icon}/>}
                            </ListItem>
                            <Collapse in={this.state.openNotification} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding className={classes.active}>
                                    <div className={classes.infBlockFirst}>
                                        <Typography variant="h6" className={classes.text}>Все уведомления</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            className={classes.text2}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </div>
                                    <div className={classes.infBlockFirst}>
                                        <Typography variant="h6" className={classes.text}>Новое сообщение</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            className={classes.text2}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </div>
                                    <div className={classes.infBlockFirst}>
                                        <Typography variant="h6" className={classes.text}>Новый контакт</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            className={classes.text2}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </div>
                                    <div className={classes.infBlockFirst}>
                                        <Typography variant="h6" className={classes.text}>Новая группа</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            className={classes.text2}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </div>
                                    <Divider/>
                                </List>

                            </Collapse>
                        </div>
                        <div>
                            <ListItem button onClick={this.handleClick} className={classes.groupName} classes={{}}>
                                <ListItem disableGutters classes={{
                                    root: classes.gutters,
                                }}>
                                    <div className={classes.workgroupName}>
                                        <Translate className={classes.infIcons}/>
                                        <Typography variant='button' className={classes.textGroup}>
                                            Язык
                                        </Typography>
                                    </div>
                                </ListItem>
                                {this.state.open ? <ExpandLess className={classes.icon}/> :
                                    <ExpandMore className={classes.icon}/>}
                            </ListItem>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding className={classes.active}>
                                    <div className={classes.infBlockFirst}>
                                        <Typography variant="h6" className={classes.text}>Все уведомления</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            className={classes.text2}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </div>
                                    <div className={classes.infBlockFirst}>
                                        <Typography variant="h6" className={classes.text}>Новое сообщение</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            className={classes.text2}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </div>
                                    <div className={classes.infBlockFirst}>
                                        <Typography variant="h6" className={classes.text}>Новый контакт</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            className={classes.text2}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </div>
                                    <div className={classes.infBlockFirst}>
                                        <Typography variant="h6" className={classes.text}>Новая группа</Typography>
                                        <FormControlLabel
                                            classes={{
                                                root: classes.switchRoot
                                            }}
                                            className={classes.text2}
                                            control={
                                                <Switch
                                                    checked={this.state.checkedB}
                                                    value="checkedB"
                                                    color="primary"/>
                                            }
                                            label=""/>
                                    </div>
                                    <Divider/>
                                </List>

                            </Collapse>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

const Settings = withStyles(styles)(SettingsModal);

export default Settings;