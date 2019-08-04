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
import Phone from '@material-ui/icons/PhoneOutlined'
import Person from '@material-ui/icons/PersonOutline'
import CardTravel from '@material-ui/icons/CardTravelOutlined'
import Group from '@material-ui/icons/GroupOutlined'
import Info from '@material-ui/icons/InfoOutlined'
import Create from '@material-ui/icons/CreateOutlined'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Image1 from '../../src/images/bb.jpg'
import Image2 from '../../src/images/chatBack.jpg'
import Image3 from '../../src/images/darkback.jpg'
import Image4 from '../../src/images/fon2.jpg'
import Image5 from '../../src/images/fon1.jpg'
import Image6 from '../../src/images/fon3.jpg'
import Image7 from '../../src/images/fon5b.jpg'
import Image8 from '../../src/images/chatBack2.jpg'
import Image9 from '../../src/images/gif.gif'
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import '../css/scrollbar.css'

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
        borderRadius: '10px 10px 0px 0px',
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
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
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
        //padding: '0px 6px',
        [theme.breakpoints.down('xs')]: {
            padding: '0 3%',
        },
    },
    form: {
        position: 'absolute',
        top: 122,
        [theme.breakpoints.down('xs')]: {
            top: 144,
        },
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: 1,
        boxShadow: '0 -10px 7px 0px rgba(0, 0, 0, 0.1)',
        borderRadius: '0 0 10px 10px',
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
        width: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        top: 74,
        [theme.breakpoints.down('xs')]: {
            marginBottom: '7%',
            marginTop: '3%',
        },
    },
    appBar: {
        boxShadow: 'none',
    },
    gridList: {
        margin: '6px 0px 6px 0px!important',
        //maxWidth: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },

});

class AttachmentsModal extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.avatarInput = React.createRef();
    }

    state = {
        avatar_image: null,
        small: null,
        value: 0,
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

    handleChange = (event, newValue) => {
        this.setState({value: newValue})
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
                                Вложения
                            </Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleMenuClose}>
                                <Close className={classes.closeIcon}/>
                            </IconButton>
                        </div>
                    </div>
                </div>

                <div className={classes.infoStyle}>
                    <AppBar position="static" className={classes.appBar}>
                        <Tabs centered value={this.state.value} onChange={this.handleChange} className={classes.tabs}>
                            <Tab label="Фото"/>
                            <Tab label="Видео"/>
                            <Tab label="Документы"/>
                            <Tab label="Ссылки"/>
                        </Tabs>
                    </AppBar>
                </div>

                <form className={classes.form}>
                    <div id="style-2" className={classes.blockForm}>
                        <List style={{width: '100%', padding: 0,}} subheader={<li />}>
                                <li key={1} className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <ListSubheader style={{backgroundColor: '#fff'}} disableGutters>
                                            <Typography style={{color: 'rgb(107, 107, 107)', fontSize: '1.05em', padding: '5px 0 5px 6px'}} variant="h6"> Май </Typography>
                                        </ListSubheader>
                                            <ListItem style={{padding: 6}} disableGutters key={1}>

                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}} src={Image1} alt="lol"/>


                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}} src={Image2} alt="lol"/>


                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}} src={Image3} alt="lol"/>

                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}}  src={Image4} alt="lol"/>


                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}} src={Image5} alt="lol"/>


                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}} src={Image6} alt="lol"/>


                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}} src={Image7} alt="lol"/>


                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}} src={Image8} alt="lol"/>


                                                        <img style={{ maxHeight: '100%',
                                                            objectFit: 'scale-down',}} src={Image9} alt="lol"/>

                                            </ListItem>
                                    </ul>
                                </li>
                        </List>

                        <List style={{width: '100%', padding: 0,}} subheader={<li />}>
                            <li key={1} className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader style={{backgroundColor: '#fff'}} disableGutters>
                                        <Typography style={{color: 'rgb(107, 107, 107)', fontSize: '1.05em', padding: '5px 0 5px 6px'}} variant="h6"> Июнь </Typography>
                                    </ListSubheader>
                                    <ListItem style={{padding: 6}} disableGutters key={1}>
                                        <GridList cellHeight={150} className={classes.gridList} cols={2}>
                                            <GridListTile key="1" cols={1}>
                                                <img src={Image1} alt="lol"/>
                                            </GridListTile>
                                            <GridListTile key="1" cols={1}>
                                                <img src={Image2} alt="lol"/>
                                            </GridListTile>
                                            <GridListTile key="1" cols={2}>
                                                <img src={Image3} alt="lol"/>
                                            </GridListTile>
                                            <GridListTile key="1" cols={1}>
                                                <img src={Image4} alt="lol"/>
                                            </GridListTile>
                                            <GridListTile key="1" cols={1}>
                                                <img src={Image5} alt="lol"/>
                                            </GridListTile>
                                            <GridListTile key="1" cols={1}>
                                                <img src={Image6} alt="lol"/>
                                            </GridListTile>
                                            <GridListTile key="1" cols={1}>
                                                <img src={Image7} alt="lol"/>
                                            </GridListTile>
                                            <GridListTile key="1" cols={1}>
                                                <img src={Image8} alt="lol"/>
                                            </GridListTile>
                                            <GridListTile key="1" cols={1}>
                                                <img src={Image9} alt="lol"/>
                                            </GridListTile>
                                        </GridList>
                                    </ListItem>
                                </ul>
                            </li>
                        </List>


                        </div>
                        <Divider/>
                </form>
            </>
        );
    }
}

const Attachments = withStyles(styles, {withTheme: true, index: 1})(AttachmentsModal);

export default Attachments;