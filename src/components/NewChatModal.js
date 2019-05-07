import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from "@material-ui/core/es/Divider";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Close from "@material-ui/icons/Close"
import {Button, IconButton} from "@material-ui/core";
import rootStore from "../store/RootStore";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import purple from "@material-ui/core/es/colors/purple";
import Checkbox from "@material-ui/core/Checkbox";

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
            theme.palette.type === 'light' ? 'rgba(102, 161, 166, 0.95  )' : 'rgb(90,114,151)'
            }`,
        //height: 85,
        // width: '100%',
        padding: 18,
        display: 'flex',
        alignItems: 'start',
        borderRadius: '5px 5px 0px 0px',
    },
    header: {
        textAlign: 'start',
        fontSize: '1em',
        marginLeft: 10,
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.dark
            }`,
    },
    fixWidth: {
        marginLeft: 10,
        display: 'flex',
        // alignItems: 'center',
    },
    userName: {
        marginLeft: 10,
    },
    userName1: {
        fontSize: '1.4rem',
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.dark
            }`,
        marginBottom: 5,
    },
    role: {
        fontSize: '1rem',
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : '#a7b6ce'
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
        paddingTop: 10,
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        fontSize: '0.95rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        marginBottom: 5,
    },
    block: {
        width: '100%'
    },
    blockForm: {
        //display: 'flex',
        alignItems: 'flex-start',
        padding: '14px 24px 25px 24px',
    },
    form: {
        borderRadius: '0px 0px 5px 5px',
        width: '100%', // Fix IE 11 issue.
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
    },
    textInf: {
        // marginBottom: 30,
        fontSize: '1em',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    textPassword: {

        textAlign: 'end',
    },
    kek: {
        '&:hover': {
            backgroundColor: '#000',
            borderRadius: '50%',
            zIndex: 2
        },
    },
    avatar: {
        width: 75,
        height: 75,
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
            }`,
        cursor: 'pointer',
    },
    cssLabel: {
        color: '#fff',
        '&$cssFocused': {
            color: "#fff",
        },
    },
    cssFocused: {},
    cssUnderline: {
        /*  '&:hover': {
              borderBottom: '2px solid red',
          },*/
        '&:before': {
            borderBottomColor: '#fff',
            borderBottom: '1px solid #fff!important'
        },
        '&:after': {
            borderBottomColor: '#88b7e5',
        },
    },
    baseRoot: {
        color: '#cef9fd',
    },
    userAvatar: {
        width: 40,
        height: 40,
    },
    nameUser: {
        fontSize: '1rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    userRole: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    checkboxRoot: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
});

class NewChatModal extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.avatarInput = React.createRef();
    }

    state = {
        avatar_image: null,
        blob: null,
        values: [],
    };

    handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                avatar_image: URL.createObjectURL(event.target.files[0]),
                small: event.target.files[0]
            });
        }
        // rootStore.imageService.loadFromInput(event, (result, small) => {
        //         this.setState({
        //             avatar_image: result,
        //             small:small
        //         });
        //     }
        // );
    };

    componentDidMount() {
        // rootStore.imageService.getAvatarThumbnail(rootStore.accountStore.userId)
        //     .then(avatar => {
        //         this.setState({
        //             avatar_image: avatar.small
        //         })
        //     });
    }

    handleChange = (event) => {
        let count = 0;

        for (let i = 0; i < this.state.values.length; i++) {
            if (this.state.values[i] === event.target.value) {
                count++
            }
            if (this.state.values[i] === event.target.value && event.target.checked === false) {
                this.state.values.splice(i, 1)
            }
        }
        if (count === 0 && event.target.checked === true) {
            this.state.values.push(event.target.value)
        }
        console.log('Old inline massive',  event.target.checked);
        console.log('Old inline massive',  this.state.values)
};

    handleReset = () => {
      this.setState({
          values: [],
      });
        console.log('Old inline massive',  this.state.values)
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
            <div onclose={this.handleReset}>
                <div className={classes.headerBlock}>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                            <Typography variant="overline" className={classes.header}>
                                Создание группового чата
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>
                        </div>

                        <div className={classes.fixWidth}>
                            {/*src={user.avatar ? `${BACKEND_URL}/attachment/download/${user.avatar}?width=400` : ""}*/}
                            <label htmlFor='avatar-input'>
                                {
                                    this.state.avatar_image || avatar_image ?
                                        (
                                            <div className={classes.kek}>
                                                <Avatar
                                                    className={classes.avatar}
                                                    src={this.state.avatar_image || avatar_image.small}/>
                                            </div>
                                        )
                                        :
                                        (
                                            <Avatar className={classes.avatar}>
                                                {this.accountStore.first_name[0].toUpperCase() + this.accountStore.last_name[0].toUpperCase()}
                                            </Avatar>
                                        )
                                }

                            </label>
                            <input onChange={this.handleImageChange} hidden id="avatar-input" type="file"
                                   accept="image/x-png,image/jpeg"
                                   ref={this.avatarInput}/>
                            <div className={classes.userName}>
                                <FormControl className={classes.margin}>
                                    <InputLabel
                                        htmlFor="custom-css-standard-input"
                                        classes={{
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused,
                                        }}
                                    >
                                        Имя чата
                                    </InputLabel>
                                    <Input
                                        id="custom-css-standard-input"
                                        classes={{
                                            underline: classes.cssUnderline,
                                            root: classes.baseRoot
                                        }}
                                    />
                                </FormControl>
                            </div>
                            {/*<Button disabled={!this.state.blob} variant="outlined" onClick={this.handleAvatarUpload}>Save
                                avatar!</Button>*/}
                        </div>
                    </div>
                </div>
                {}
                <form className={classes.form}>
                    <div className={classes.blockForm}>
                            <div className={classes.infBlockFirst}>
                                <Avatar className={classes.userAvatar}>
                                    {this.accountStore.first_name[0].toUpperCase() + this.accountStore.last_name[0].toUpperCase()}
                                </Avatar>
                                <div style={{marginLeft: 10}}>
                                    <Typography variant="h5"
                                                className={classes.nameUser}>{this.accountStore.fullName}</Typography>
                                    <Typography variant="caption"
                                                noWrap
                                                className={classes.userRole}>({this.accountStore.position ? this.accountStore.position : 'Должность не указана'})</Typography>
                                </div>
                                <Checkbox
                                    onChange={this.handleChange.bind(this)}
                                    value={'b'}
                                    color="primary"
                                    style={{marginLeft: 'auto'}}
                                    classes={{
                                        root: classes.checkboxRoot,
                                    }}
                                />
                            </div>
                    </div>
                </form>
            </div>
        );
    }
}

const ChatModal = withStyles(styles)(NewChatModal);

export default ChatModal;