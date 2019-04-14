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
import ChatWindowEmpty from "./ChatCommon/ChatWindowEmpty";
import CircularProgress from "@material-ui/core/CircularProgress";
//import Background from '../images/gif.gif';
//import {Item, Menu, MenuProvider} from "react-contexify";

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    root: {
        display: 'flex',
        top: 0,
        bottom: 0,
        left: 100,
        right: 100,
        flexGrow: 1,
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    drawer: {
        width: 400,
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
        //zIndex: 500,
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
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
        borderRight: 0,
    },

    appBar: {
        zIndex: 1162,
        borderBottom: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            }`,
        height: 55,
        boxShadow: theme.shadows[0],
        width: '100%',
        position: 'fixed',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
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
        [theme.breakpoints.down('xs')]: {
            marginTop: 110,
        },
        marginTop: 130,
        padding: 0,
        marginBottom: 70
    },
    content: {
        minHeight: '-webkit-fill-available',
        flexGrow: 1,
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        flexShrink: 1,
        width: 'auto',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? "#f1f1f1" : '#3c465d'
            }`,
        // backgroundImage: 'url(' + Background + ')',
        //  backgroundSize: 'cover',
        // boxShadow: '-2px 0px 20px 0px rgba(0, 0, 0, 0.08)',
    },
    logo: {
        width: 150,
        marginRight: 'auto',
    },
    logoDiv: {
        flexGrow: 1
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

        zIndex: 1000
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
        height: '-webkit-fill-available',
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
            }`,
    },
    logoDrawer: {
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
        zIndex: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        bottom: 0,
        position: 'fixed',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#f1f1f1' : '#171a20'
            }`,
    },
    logoText: {
        color: ` ${
            theme.palette.type === 'light' ? '#a8a8a8' : '#7583a5'
            }`,
    },
    loader: {},
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

    workgroups() {
        const {classes} = this.props;
        if (this.messagesStore.groups.length) {
            return this.messagesStore.groups.map(
                workgroup => <Workgroup handleDrawerToggle={this.handleDrawerToggle}
                                        workgroup={workgroup}
                                        userChats={this.messagesStore.userChats.filter(userChat => userChat.user.group_id === workgroup.id)}
                                        groupChats={this.messagesStore.groupChats.filter(groupChat => groupChat.chat.group_id === workgroup.id)}/>
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

        let drawer = (
            <div>
                <Hidden xsDown implementation="css">
                    <ProfileBar
                        changeThemeType={this.props.changeThemeType}
                        handleChangeType={this.handleChangeType} chats={this.props.chats}
                        andleLogout={this.accountStore.unauth.bind(accountStore)}/>
                    <div className={classes.logoDrawer}>
                        <Typography variant="h6" className={classes.logoText}> Vicly Messenger </Typography>
                    </div>
                </Hidden>
                <SearchBar/>
                <List className={classes.workG}>
                    {this.workgroups()}
                </List>

            </div>
        );

        return (
            <div className={classes.root}>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <AppBar position="fixed" className={classes.appBar}>
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
                            {/*<ProfileBar chats={this.props.chats} andleLogout={this.accountStore.unauth.bind(accountStore)}/>*/}
                        </AppBar>
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            onOpen={this.handleDrawerToggle}
                            style={{zIndex: 1100}}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
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
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    {/*   <div className={classes.toolbar}/>*/}
                    {/*   <Button varian="outlined" onClick={this.props.changeThemeType}>rtr</Button>*/}
                    {/*<MenuProvider id={"menu_id"}>
                            Это ниработает лол
                        </MenuProvider>
                        <Menu id='menu_id'>
                            <Item onClick={() => alert("ТЫ ХУЙ")}>ХУЙ</Item>
                            <Item onClick={() => alert("ТЫ ХУЙ")}>ХУЙ</Item>
                            <Item onClick={() => alert("ТЫ МОЧА")}>МОЧА</Item>
                        </Menu>*/}
                    {
                        this.messagesStore.chatsFetched ?
                            (<div>
                                <Route path="/home/chat/user/:userId"
                                       render={(routeProps) =>
                                           <ChatWindow
                                               {...routeProps}
                                               handleDrawerToggle={this.handleDrawerToggle}
                                               chat={this.messagesStore.getCurrentChat()}
                                           />}/>
                                <Route path="/home/chat/group/:chatId"
                                       render={(routeProps) =>
                                           <GroupChatWindow
                                               {...routeProps}
                                               handleDrawerToggle={this.handleDrawerToggle}
                                               chat={this.messagesStore.getCurrentChat()}
                                           />}/>
                            </div>)
                            :
                            (
                                <Route path={["/home/chat/user/:userId", "/home/chat/group/:chatId"]}
                                       render={(routeProps) => <ChatWindowEmpty/>}/>
                            )
                    }
                    {/*   <div style={{height: 60}}/>*/}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Home);