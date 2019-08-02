import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import ChatWindow from "./ChatUser/ChatWindow"
import Workgroup from "./Workgroup";
import SearchBar from "./SearchBar";
import ProfileIco from "./ProfileIco";
import InviteIcon from "./InviteIcon";
import {observer} from "mobx-react";
import {Route} from "react-router-dom";
import ProfileBar from "./ProfileBar";
import Typography from "@material-ui/core/es/Typography/Typography";
import rootStore from "../store/RootStore";
import GroupChatWindow from "./ChatGroup/GroupChatWindow";
import ChatWindowEmpty from "./ChatCommon/ChatLoader";
import CircularProgress from "@material-ui/core/CircularProgress";
import 'react-contexify/dist/ReactContexify.min.css';
import HomeScreen from './HomeScreen'
import '../css/IOS.css'
import '../css/scrollbar.css'
//import withSplashScreen from "./withSplashScreen";
import vhCheck from 'vh-check'
import Logo from "../images/logoVicly.svg"

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    root: {
        display: 'flex',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexGrow: 1,
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '100%',
    },
    drawer: {
        width: 399,
        [theme.breakpoints.down('md')]: {
            width: 280,
        },
        [theme.breakpoints.down('sm')]: {
            width: 250,
        },
        [theme.breakpoints.down('xs')]: {
            width: 0,
        },
        flexShrink: 0,
    },
    drawerPaper: {
        width: 400,
        [theme.breakpoints.down('md')]: {
            width: 280,
        },
        [theme.breakpoints.down('sm')]: {
            width: 250,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#EAEAEA' : theme.palette.primary.dark
        }`,
        borderRight: 0,
    },

    appBar: {
        width: 'auto',
        top: 0,
        left: 0,
        right: 0,
        borderRadius: '5px 5px 0px 0px',
        margin: 5,
        zIndex: 1300,
        borderBottom: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
        }`,
        height: 55,
        boxShadow: theme.shadows[0],
        position: 'fixed',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : '#2b3346'
        }`,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            right: 0,
            top: 0,
        },
    },
    toolbar: {
        height: 55,
    },
    workG: {
        /*  [theme.breakpoints.down('xs')]: {
              marginTop: 120,
          },*/
        //  marginTop: 143,
        //  padding: 0,
        // paddingTop: 15,

        marginBottom: 70
    },
    content: {
        // pointerEvents: 'none',
        position: 'fixed',
        zIndex: 1201,
        // position:' -webkit-sticky',
        overflow: 'hidden',
        minHeight: 'calc(100vh - var(--vh-offset, 0px))',
        //  minHeight: '-moz-available',
        flexGrow: 1,
        flexShrink: 1,
        left: 400,
        [theme.breakpoints.down('md')]: {
            left: 280,
        },
        [theme.breakpoints.down('sm')]: {
            left: 250
        },
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },
        right: 0,
        top: 0,
        bottom: 0,
        // width: '100%',
        boxShadow: '9px 0px 20px 20px rgba(0, 0, 0, 0.14)',
        /*borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
            }`,*/
        '&:before': {
            content: " '' ",
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#F6F6F6' : "#3b455c"
            }`,
            backgroundSize: 'cover',
            /* backgroundImage: 'url(' + BackgroundLight + ')',*/
            position: 'fixed',
            left: 400,
            [theme.breakpoints.down('md')]: {
                left: 280,
            },
            [theme.breakpoints.down('sm')]: {
                left: 250
            },
            [theme.breakpoints.down('xs')]: {
                left: 0,
            },
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: '-1',
        },
    },
    logo: {
        width: 150,
        marginRight: 'auto',
    },
    logoDiv: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: theme.palette.primary.dark,
        height: 50,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        position: 'fixed',
        top: 0,
    },
    emptyChat: {
        top: 40,
        bottom: 0,
        right: 0,
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },
        left: '30%',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userBar: {
        display: 'flex',
        marginLeft: 'auto',
    },
    load: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: 'inherit',

    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
        }`,
    },
    logoDrawer: {
        boxShadow: ` ${
            theme.palette.type === 'light' ? 'inset 0px -3px 0px 0px rgb(205, 205, 205), 0px 0px 20px 0px rgba(0, 0, 0, 0.12)' : 'inset 0px -4px 0px 0px rgb(19, 24, 37), 0px 0px 20px 0px rgba(0, 0, 0, 0.29)'
        }`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: 1,
        margin: '0 10px 5px 8px',
        [theme.breakpoints.down('xs')]: {
            margin: '0 5px 5px 5px',
        },
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#ffffff' : '#2b3346'
        }`,
        borderRadius: 5,
        /* backgroundColor: ` ${
             theme.palette.mime === 'light' ? '#f1f1f1' : '#171a20'
             }`,*/
    },
    logoText: {
        color: `${theme.palette.type === 'light' ? '#105a72' : 'rgb(185, 187, 191)'}`,
        fontSize: '1.2em',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.2em',
        },
        // width: '100%'

    },
    rootIndex: {
        zIndex: 1299,
    },
    scrollDrawer: {
        width: 390,
        [theme.breakpoints.down('md')]: {
            width: 270,
        },
        [theme.breakpoints.down('sm')]: {
            width: 240,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 108,
            width: '100%',
        },
        height: '100%',
        marginTop: 10,
        marginBottom: 10,

        overflow: 'hidden',
    },
    listFix: {
        width: 'initial',
        padding: '127px 0px 39px 8px',

        [theme.breakpoints.down('xs')]: {
            padding: '16px 5px 45px 5px ',
        },
    },
});

@observer
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
    }

    state = {
        mobileOpen: false,
        type: this.props.theme.palette.type,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    handleDrawerToggleForMob = () => {
        this.setState(state => ({mobileOpen: false}));
    };

    workgroups() {
        const {classes} = this.props;
        if (this.messagesStore.searchActive) {
            if (this.messagesStore.foundedGroups.length) {
                return this.messagesStore.foundedGroups.map(
                    workgroup => <Workgroup handleDrawerToggleForMob={this.handleDrawerToggle}
                                            workgroup={workgroup}
                                            userChatsNew={this.messagesStore.foundedUserChats.filter(userChat => userChat.groupId === workgroup.id)}
                                            groupChatsNew={this.messagesStore.foundedGroupChats.filter(groupChat => groupChat.groupId === workgroup.id)}/>
                )
            } else {
                return <Typography>Nothing found!</Typography>
            }
        } else {
            if (this.messagesStore.groups.length) {
                return this.messagesStore.groups.map(
                    workgroup => <Workgroup handleDrawerToggleForMob={this.handleDrawerToggleForMob}
                                            mobileOpen={this.state.mobileOpen}
                                            workgroup={workgroup}
                                            userChatsNew={this.messagesStore.userChatsNew.filter(userChat => userChat.groupId === workgroup.id)}
                                            groupChatsNew={this.messagesStore.groupChatsNew.filter(groupChat => groupChat.groupId === workgroup.id)}/>
                )

            } else {
                return (
                    <div className={classes.load}>
                        <div style={{textAlign: "center"}}>
                            <CircularProgress/>
                            <Typography variant="overline" className={classes.text}>Загрузка</Typography>
                        </div>
                    </div>
                )
            }
        }

    }

    handleClickContext = () => {
        alert("LOL")
    };

    // componentDidMount() {
    //     if (this.props.currentChatId.userId !== this.props.currentChatId.prevUserId) {
    //         this.handleDrawerToggle();
    //     }
    // }

    render() {
        const {classes, theme, chats} = this.props;
        const vh = vhCheck();
        let drawer = (
            <div className={classes.scrollDrawer}>
                <Hidden xsDown implementation="css">
                    <ProfileBar
                        changeThemeType={this.props.changeThemeType}
                        handleChangeType={this.handleChangeType} chats={this.props.chats}
                        handleLogout={this.accountStore.unauth.bind(accountStore)}/>
                    <div className={classes.logoDrawer}>
                        <img style={{width: 30, marginRight: 10}} alt="Logo"
                             src={theme.palette.type === 'light' ? Logo : Logo}/>
                        <Typography variant="h6" className={classes.logoText}> Vicly Messenger </Typography>
                    </div>
                </Hidden>
                <Hidden smUp implementation="css">
                    {/* <AppBar position="fixed" className={classes.appBar} style={{margin: '5px 8px 5px 8px',}}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}>
                                <MenuIcon className={classes.icon}/>
                            </IconButton>
                            <div className={classes.logoDiv}>
                                <Typography variant="h6" className={classes.text}> Vicly Messenger </Typography>
                            </div>
                            <div className={classes.userBar}>
                                <InviteIcon chats={this.props.chats}/>
                                <ProfileIco
                                    changeThemeType={this.props.changeThemeType}
                                    handleLogout={this.accountStore.unauth.bind(this.accountStore)}
                                    name={this.accountStore.fullName}/>
                            </div>
                        </Toolbar>
                        <ProfileBar chats={this.props.chats} andleLogout={this.accountStore.unauth.bind(accountStore)}/>
                    </AppBar>*/}
                    <div className={classes.logoDrawer}>
                        <img style={{width: 30, marginRight: 10}} alt="Logo"
                             src={theme.palette.type === 'light' ? Logo : Logo}/>
                        <Typography variant="h6" className={classes.logoText}> Vicly Messenger </Typography>
                    </div>
                </Hidden>
                <SearchBar/>
                <div className="scrollbar" id={theme.palette.type === 'dark' ? 'style-3' : 'style-3'}>
                    <List className={"scrollDrawer " + classes.listFix}>
                        {this.workgroups()}
                    </List>
                </div>
            </div>
        );

        return (
            <div className={classes.root}>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar disableGutters>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={classes.menuButton}>
                                    <MenuIcon className={classes.icon}/>
                                </IconButton>
                                <div className={classes.logoDiv}>
                                    <Typography variant="h6" className={classes.text}> Vicly Messenger </Typography>
                                </div>
                                <div className={classes.userBar}>
                                    <InviteIcon chats={this.props.chats}/>
                                    <ProfileIco
                                        changeThemeType={this.props.changeThemeType}
                                        handleLogout={this.accountStore.unauth.bind(this.accountStore)}
                                        name={this.accountStore.fullName}/>
                                </div>
                            </Toolbar>
                            {/*<ProfileBar chats={this.props.chats} andleLogout={this.accountStore.unauth.bind(accountStore)}/>*/}
                        </AppBar>
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            onOpen={this.handleDrawerToggle}
                            //    style={{zIndex: 1100}}
                            classes={{
                                paper: classes.drawerPaper,
                                root: classes.rootIndex,
                            }}
                            /* ModalProps={{
                                 keepMounted: true, // Better open performance on mobile.
                             }}*/
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                            {/* <MenuProvider id={"menu_id"}>
                            </MenuProvider>
                            <Menu style={{zIndex: 5000}} id='menu_id'>
                                <Item onClick={() => alert("ТЫ ХУЙ")}>ХУЙ</Item>
                                <Item onClick={() => alert("ТЫ ХУЙ")}>ХУЙ</Item>
                                <Item onClick={() => alert("ТЫ МОЧА")}><Typography
                                    variant="button"><Delete/> Удалить</Typography>
                                </Item>
                            </Menu>*/}
                        </Drawer>
                    </Hidden>
                </nav>

                <div style={{display: this.state.mobileOpen ? 'none' : ''}} className={classes.content}>
                    <Route exact path="/home" component={HomeScreen}/>
                    {
                        this.messagesStore.chatsFetched ?
                            (<>
                                <Route path="/home/chat/user/:userId"
                                       render={(routeProps) =>
                                           <ChatWindow
                                               {...routeProps}
                                               handleDrawerToggle={this.handleDrawerToggle}
                                               chat={this.messagesStore.getCurrentChatNew()}
                                           />}/>
                                <Route path="/home/chat/group/:chatId"
                                       render={(routeProps) =>
                                           <GroupChatWindow
                                               {...routeProps}
                                               handleDrawerToggle={this.handleDrawerToggle}
                                               chat={this.messagesStore.getCurrentChatNew()}
                                           />}/>
                            </>) : (
                                <Route path={["/home/chat/user/:userId", "/home/chat/group/:chatId"]}
                                       render={(routeProps) => <ChatWindowEmpty/>}/>
                            )
                    }
                </div>
            </div>
        );
    }
}

/*
export default withSplashScreen(withStyles(styles, {withTheme: true})(Home));*/
export default withStyles(styles, {withTheme: true})(Home);
