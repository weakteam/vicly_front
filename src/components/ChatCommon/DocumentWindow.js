import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Close from "@material-ui/icons/Close"
import {IconButton} from "@material-ui/core";
import rootStore from "../../store/RootStore";
import CloudDownload from '@material-ui/icons/CloudDownload'

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
            theme.palette.type === 'light' ? 'rgba(102, 161, 166, 0.71)' : 'rgb(90,114,151)'
            }`,
        //height: 85,
        // width: '100%',
        padding: 18,
        display: 'flex',
        alignItems: 'start',
        //borderRadius: '5px 5px 0px 0px',
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
        alignItems: 'center',
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

    },
    text: {
        fontSize: '0.95rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        marginBottom: 5,
    },
    block: {
        display: 'flex',
        padding: '10px 10px 0px 10px',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#dedede',
        },
    },
    blockForm: {
        // display: 'flex',
        alignItems: 'flex-start',
        padding: '10px 0px 20px 0px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
    },
    textInf: {
        marginBottom: 30,
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
    uploadButton: {
        display: 'flex',
        padding: 16,
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#cecece',
        }
    },
    fileIcon: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#dedede',
    },
});

class DocumentWindow extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.avatarInput = React.createRef();
    }

    state = {
        avatar_image: null,
        blob: null
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
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                            <Typography variant="overline" className={classes.header}>
                                Документы
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleMenuClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>
                        </div>

                    </div>
                </div>
                <form className={classes.form}>

                    <div onClick={this.props.handleAddAttachments("")} onClose={this.props.attachments.length > 0 && this.props.upload === true ? this.props.handleMenuClose() : ''} className={classes.uploadButton}>
                        <CloudDownload style={{marginRight: 15}}/>
                        <Typography variant="h6">Загрузить файл</Typography>
                    </div>
                    <div className={classes.blockForm}>
                      {/*  <div className={classes.block}>
                            <InsertDriveFile className={classes.fileIcon}/>
                            <div style={{marginLeft: 23}}>
                                <Typography variant="h6">Name of file</Typography>
                                <Typography variant="caption">meta data</Typography>
                            </div>
                        </div>
                        <div className={classes.block}>
                            <InsertDriveFile className={classes.fileIcon}/>
                            <div style={{marginLeft: 23}}>
                                <Typography variant="h6">Name of file</Typography>
                                <Typography variant="caption">meta data</Typography>
                            </div>
                        </div>
                        <div className={classes.block}>
                            <InsertDriveFile className={classes.fileIcon}/>
                            <div style={{marginLeft: 23}}>
                                <Typography variant="h6">Name of file</Typography>
                                <Typography variant="caption">meta data</Typography>
                            </div>
                        </div>
                        <div className={classes.block}>
                            <InsertDriveFile className={classes.fileIcon}/>
                            <div style={{marginLeft: 23}}>
                                <Typography variant="h6">Name of file</Typography>
                                <Typography variant="caption">meta data</Typography>
                            </div>
                        </div>
                        <div className={classes.block}>
                            <InsertDriveFile className={classes.fileIcon}/>
                            <div style={{marginLeft: 23}}>
                                <Typography variant="h6">Name of file</Typography>
                                <Typography variant="caption">meta data</Typography>
                            </div>
                        </div>*/}
                    </div>
                </form>
            </div>
        );
    }
}

const Document = withStyles(styles)(DocumentWindow);

export default Document;