import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from "@material-ui/core/Avatar";
import Close from "@material-ui/icons/Close"
import {Button, IconButton} from "@material-ui/core";
import rootStore from "../store/RootStore";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import {BACKEND_URL} from "../common";
import "../css/avatarHover.css"
import CloudUpload from "@material-ui/icons/CloudUpload"
import NewChatUsers from "./NewChatUsers";
import '../css/scrollbar.css'
import 'array-flat-polyfill';

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
        /* backgroundColor: ` ${
             theme.palette.type === 'light' ? 'rgb(160, 89, 89)' : 'rgb(160, 89, 89)'
             }`,*/
        //height: 85,
        // width: '100%',
        // padding: 18,
        backgroundColor: '#0A8D8D',
        display: 'flex',
        alignItems: 'start',
        borderRadius: '10px 10px 0px 0px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    header: {
        //textAlign: 'start',
        fontSize: '1.2rem',
        //marginLeft: 10,
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.dark
        }`,
    },
    fixWidth: {
        position: 'absolute',
        top: 71,
        left: 0,
        right: 0,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
        }`,
        padding: '6px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '0 3%',
            top: 61,
        },
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
    textInfo: {
        padding: '20px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '4% 3%',
        },
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,

    },
    block: {
        width: '100%'
    },
    blockForm: {
        //display: 'flex',
        alignItems: 'flex-start',
        [theme.breakpoints.down('xs')]: {
            padding: '0 3%',
        },
        marginBottom: 0,
        overflow: "hidden",
        height: '100%',
    },
    form: {
        position: 'absolute',
        top: 228,
        bottom: 0,
        borderRadius: '0 0 10px 10px',
        left: 0,
        right: 0,
        padding: '0px 30px 59px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '0 3% 12% 3%',
            top: 212,
        },
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
        borderRadius: 5,
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
        }`,
        cursor: 'pointer',
    },
    cssLabel: {
        color: ` ${
            theme.palette.type === 'light' ? '#ffffff' : '#ffffff'
        }`,
        '&$cssFocused': {
            color: "#ffffff",
        },
        fontSize: '1.4rem',
    },
    cssFocused: {},
    cssUnderline: {
        /*  '&:hover': {
              borderBottom: '2px solid red',
          },*/
        '&:before': {
            borderBottomColor: '#4a4a4a',
            borderBottom: '1px solid #cacaca!important'
        },
        '&:after': {
            borderBottomColor: '#639ba0',
        },
    },
    baseRoot: {
        color: '#16777f',
    },
    userAvatar: {
        width: 40,
        height: 40,
        [theme.breakpoints.down('xs')]: {
            width: 20,
            height: 20,
        },

    },
    nameUser: {
        fontSize: '1.1rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
    },
    userRole: {
        color: ` ${
            theme.palette.type === 'light' ? '#a5a3a3' : theme.palette.secondary.dark
        }`,
    },
    checkboxRoot: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
    },
    signIn: {
        position: 'absolute',
        borderRadius: '0 0 10px 10px',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {},
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
        }`,

    },
    submit: {
        width: '30%',
        margin: 10,
        boxShadow: theme.shadows[0],
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#48a1a4' : '#48a1a4'
        }`,
        color: '#fff',
        '&:hover': {
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#41888b' : '#41888b'
            }`,
        },
    },
    checkedBox: {
        color: '#9a5656!important',
    },
    headerBar: {
        padding: '15px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '0% 3%',
        },
        display: 'flex',
        alignItems: 'center',
    },
    infoBlock: {
        boxShadow: '0 -10px 7px 0px rgba(0, 0, 0, 0.1)',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
        }`,
        borderRadius: '10px 10px 0 0',
        position: 'absolute',
        top: 176,
        left: 0,
        right: 0,
        [theme.breakpoints.down('xs')]: {
            top: 160,
        },
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
        chatName: '',
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
        // console.log('Old inline massive', event.target.checked);
        // console.log('Old inline massive', this.state.values)
    };
    handleChangeChatName = (event) => {
        this.setState({
            chatName: event.target.value,
        });
        // console.log(this.state.chatName)
    };

    handleReset = () => {
        this.setState({
            values: [],
            chatName: '',
        });
        // console.log('Old inline massive', this.state.values)
    };

    createNewChat(userIds, name, purpose) {
        fetch(BACKEND_URL + "/chat/create", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_ids: userIds,
                name: name,
                purpose: purpose
            })
        })
        /*.then(response => response.json())
        .then(json => {
            this.setState({
                inviteId: json
            });
            console.log("Invite created");
            this.handleChangeStep();
        })*/
            .catch((err) => {
                /*this.setState({
                    err: true,
                });*/
                console.log("Invite doesn't created")
            });
    }

    handleCreateNewChat = (event) => {
        event.preventDefault();
        this.createNewChat(this.state.values, this.state.chatName, 'fake')
    };

    handleUserToggle = (userArr) => {
        this.setState((prevState) => {
            userArr.forEach((elem) => {
                let index = prevState.values.indexOf(elem);
                if (index !== -1) {
                    prevState.values.splice(index, 1);
                } else {
                    prevState.values.push(elem);
                }

            });
            const arr = Array.from(new Set([...prevState.values]));
            return {
                ...prevState,
                values: arr
            }
        })
    };

    getUsers = () => {
        return (
            this.messagesStore.groups.map(workgroup => <NewChatUsers
                workgroup={workgroup}
                checked={this.state.values}
                userChatsNew={this.messagesStore.userChatsNew.filter(userChat => userChat.groupId === workgroup.id)}
                handleUserToggle={this.handleUserToggle}/>)
        )

    };

    render() {
        const {classes} = this.props;
        const workgroup = this.getUsers();
        const users = this.messagesStore.users.flatMap(elem => elem.id);

        let avatar_image = rootStore.imageService.images.find(elem => elem.userId === this.accountStore.userId);
        console.log('dfdfdf', users);

        return (
            <div onClose={this.handleReset}>
                <div className={classes.headerBlock}>
                    <div style={{width: '100%'}}>
                        <div className={classes.headerBar}>
                            <Typography variant="h5" className={classes.header}>
                                Создание чата
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
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
                                (<div className="avatarArea">
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
                        <FormControl className={classes.margin}>
                            <InputLabel
                                htmlFor="custom-css-standard-input"
                                classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }}
                            >
                                Название чата
                            </InputLabel>
                            <Input
                                value={this.state.chatName}
                                onChange={this.handleChangeChatName}
                                id="custom-css-standard-input"
                                classes={{
                                    underline: classes.cssUnderline,
                                    root: classes.baseRoot
                                }}/>
                        </FormControl>
                    </div>
                    {/*<Button disabled={!this.state.blob} variant="outlined" onClick={this.handleAvatarUpload}>Save
                                avatar!</Button>*/}
                </div>
                <div className={classes.infoBlock}>
                    <Typography variant="h3" className={classes.textInfo}>Добавьте пользователей</Typography>
                </div>
                <form onSubmit={this.handleCreateNewChat} className={classes.form}>
                    <div className={classes.blockForm}>
                        <div id="style-2" style={{overflow: "auto", height: '100%', WebkitOverflowScrolling: 'touch',}}>
                            {workgroup}
                        </div>
                    </div>
                    <div className={classes.signIn}>
                        <Button type="submit" variant="contained" className={classes.submit}>Создать</Button>
                    </div>
                </form>

            </div>
        );
    }
}

const ChatModal = withStyles(styles, {withTheme: true, index: 1})(NewChatModal);

export default ChatModal;