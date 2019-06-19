import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from "@material-ui/core/es/Divider";
import Avatar from "@material-ui/core/Avatar";
import Close from "@material-ui/icons/Close"
import {Button, IconButton} from "@material-ui/core";
import rootStore from "../store/RootStore";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {BACKEND_URL} from "../common";
import "../css/avatarHover.css"
import CloudUpload from "@material-ui/icons/CloudUpload"
import NewChatUsers from "./NewChatUsers";

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
        padding: 13,
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
    block: {
        width: '100%'
    },
    blockForm: {
        //display: 'flex',
        alignItems: 'flex-start',
        padding: '15px 35px 0px 35px',
    },
    form: {
        boxShadow: '0 -2px 10px 0px rgba(0, 0, 0, 0.15)',
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
        color: ` ${
            theme.palette.type === 'light' ? '#b5b5b5' : theme.palette.secondary.dark
            }`,
        '&$cssFocused': {
            color: "#4a4a4a",
        },
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    submit: {
        width: '30%',
        marginBottom: 12,
        boxShadow: theme.shadows[0],
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#9d5757' : '#9d5757'
            }`,
        color: '#fff',
        '&:hover': {
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#5A2C2C' : '#5A2C2C'
                }`,
        },
    },
    checkedBox: {
        color: '#9a5656!important',
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
                user_ids: this.state.values,
                name: this.state.chatName,
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
        this.createNewChat([1, 11, 6, 15], 'Флудилачка', 'fake')
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
            <div onclose={this.handleReset}>
                <div className={classes.headerBlock}>
                    <div style={{width: '100%'}}>

                        <div style={{display: 'flex', alignItems: 'center', padding: '3%'}}>
                            <Typography variant="overline" className={classes.header}>
                                Создание чата
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>
                        </div>


                    </div>
                </div>
                <form onSubmit={this.handleCreateNewChat} className={classes.form}>
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
                                    Имя чата
                                </InputLabel>
                                <Input
                                    value={this.state.chatName}
                                    onChange={this.handleChangeChatName}
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
                    <Divider/>

                    <div className={classes.blockForm} style={{marginBottom: 0, overflow: "auto", maxHeight: 260, webkitOverflowScrolling: 'touch',  height: '100%',}}>
                        <div style={{overflow: "hidden"}}>
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

const ChatModal = withStyles(styles)(NewChatModal);

export default ChatModal;