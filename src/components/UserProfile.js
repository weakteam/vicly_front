import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from "@material-ui/core/es/Divider";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Close from "@material-ui/icons/Close"
import {Button} from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import rootStore from "../store/RootStore";
import Save from "@material-ui/icons/SaveOutlined"
import CloudUpload from "@material-ui/icons/CloudUpload"
import "../css/avatarHover.css"

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
            theme.palette.type === 'light' ? 'rgb(105, 79, 79)' : 'rgb(105, 79, 79)'
            }`,
        //height: 85,
        // width: '100%',
        padding: '15px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '3%',
        },
        display: 'flex',
        alignItems: 'start',
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
        padding: '15px 30px',
        //background-color: #f6f6f6;
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#f6f6f6' : 'rgb(22, 26, 35)'
            }`,
        [theme.breakpoints.down('xs')]: {
            padding: '3%',
        },
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        marginLeft: 10,
        overflow: 'hidden',
    },
    userName1: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
       // width: '100%',
        fontSize: '1.4rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        marginBottom: 5,
    },
    role: {
        fontSize: '1rem',
        color: ` ${
            theme.palette.type === 'light' ? '#9e9e9e' : '#a7b6ce'
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
    infBlock: {
        display: 'flex',
        marginTop: 30,
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
        display: 'flex',
        alignItems: 'flex-start',
        padding: '15px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '3%',
        },
    },
    form: {
      //  boxShadow: '0 -2px 10px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '0px 0px 5px 5px',
        width: '100%', // Fix IE 11 issue.
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
    },
    textInf: {
        marginBottom: 15,
        fontSize: '1em',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
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
        width: 175,
        height: 175,
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

});

class UserProfile extends React.Component {
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
            <div>
                <div className={classes.headerBlock}>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center',}}>
                            <Typography variant="overline" className={classes.header}>
                                Профиль
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleMenuClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>
                        </div>


                    </div>
                </div>
                <form className={classes.form}>
                    <div className={classes.fixWidth}>
                        {/*src={user.avatar ? `${BACKEND_URL}/attachment/download/${user.avatar}?width=400` : ""}*/}
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
                                        className={classes.role}>({this.accountStore.position ? this.accountStore.position : 'Должность не указана'})</Typography>
                        </div>
                        <IconButton className={classes.button} color="primary" onClick={this.handleAvatarUpload}
                                    aria-label="Delete">
                            <Save style={{color: 'rgb(105, 79, 79)'}} className={classes.saveIcon}/>
                        </IconButton>
                        {/* disabled={!this.state.blob} не Работает!!!!*/}
                    </div>
                    <div className={classes.blockForm}>
                        <div className={classes.block}>
                            <Typography variant="overline" className={classes.textInf}>Информация</Typography>
                            <div className={classes.infBlockFirst}>
                                <Typography variant="h6" className={classes.text}>Телефон</Typography>
                                <Typography variant="h6" className={classes.text2}>8(988)996-29-14</Typography>
                            </div>
                            <Divider/>
                            <div className={classes.infBlock}>
                                <Typography variant="h6" className={classes.text}>Логин</Typography>
                                <Typography variant="h6"
                                            className={classes.text2}>@{this.accountStore.login}</Typography>
                            </div>
                            <Divider/>
                            <div className={classes.infBlock}>
                                <Typography variant="h6" className={classes.text}>Пароль</Typography>
                                <InputBase classes={{input: classes.textPassword}}
                                           className={classes.text2}
                                           type="password"
                                           defaultValue="Naked input"/>
                            </div>
                            <Divider/>
                            <div className={classes.infBlock}>
                                <Typography variant="h6" className={classes.text}>Рабочая группа</Typography>
                                <div className={classes.text2}>
                                    <Typography variant="h6"
                                                className={classes.text2}>{workgroup.name ? workgroup.name : 'Нет группы'}</Typography>
                                </div>
                            </div>
                            <Divider/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const Profile = withStyles(styles)(UserProfile);

export default Profile;