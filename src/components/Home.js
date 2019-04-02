import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import ChatWindow from "./ChatWindow"
import Workgroup from "./Workgroup";
import {Scrollbars} from "react-custom-scrollbars";
import SearchBar from "./SearchBar";
import ProfileIco from "./ProfileIco";
import InviteIcon from "./InviteIcon";
import accountStore from "../store/AccountStore";
import chatsStore from "../store/ChatsStore";
import {observer} from "mobx-react";
import {Route} from "react-router-dom";
import ProfileBar from "./ProfileBar";
import Background from '../images/chatBack2.jpg'
//import Button from "@material-ui/core/es/Button/Button";
import $ from 'jquery';
import {Button, Header, Image, Modal} from 'semantic-ui-react';
import {Item, Menu, MenuProvider} from "react-contexify";
//import Background from '../images/chatBack2.jpg';

const styles = theme => ({

    root: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            // display: 'block',
        },
        top: 0,
        bottom: 0,
        left: 100,
        right: 100,
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: '30%',
            flexShrink: 0,
        },
        [theme.breakpoints.up('md')]: {
            width: '33%',
            flexShrink: 0,
        },
        [theme.breakpoints.up('sm')]: {
            width: '30%',
            flexShrink: 0,
        },
        zIndex: 1500,
    },
    appBar: {
        zIndex: 1501,
        height: 55,
        boxShadow: theme.shadows[0],
        width: '100%',
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
    drawerPaper: {
        [theme.breakpoints.down('xs')]: {
            width: '85%',
        },
        width: '30%',
        backgroundColor: theme.palette.primary.main,
        borderRight: '0px',
    },
    workG: {
        [theme.breakpoints.down('xs')]: {
            marginTop: 105,
        },
        marginTop: 113,
        padding: 0,
    },
    content: {
        flexGrow: 1,
        minHeight: '100vh',
        [theme.breakpoints.down('xs')]: {
            //minHeight: '100%',
        },
       // backgroundImage: 'url(' +Background + ')' ,
       // backgroundImage: 'url(https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-04.jpg)',
        backgroundSize: 'cover',

        boxShadow: '-2px 0px 20px 0px rgba(0,0,0,0.5)',
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
});

@observer
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.chatsStore = chatsStore;
    }

    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };


    workgroups() {
        if (this.chatsStore.groups.length) {
            return this.chatsStore.groups.map(
                workgroup => <Workgroup workgroup={workgroup} chats={
                    this.chatsStore.userChats.filter(
                        userChat => userChat.user.group_id === workgroup.id)}/>
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

    componentWillMount() {
        chatsStore.fetchChats()
    };

    render() {
        const {classes, theme, chats} = this.props;

        let drawer;


        drawer = (
            <Scrollbars autoHide>
                <div>
                    <Hidden xsDown implementation="css">
                        <ProfileBar chats={this.props.chats} andleLogout={this.accountStore.unauth.bind(accountStore)}/>
                    </Hidden>
                    <SearchBar/>
                    <List className={classes.workG}>
                        {this.workgroups()}
                    </List>
                </div>
            </Scrollbars>
        );


        return (
            <div className={classes.root}>
                <nav className={classes.drawer}>
                    {/* The implementation can be swap with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={classes.menuButton}>
                                    <MenuIcon/>
                                </IconButton>
                                {/* <div className={classes.logoDiv}>Vicly messenger</div>*/}
                                <div className={classes.userBar}>
                                    <InviteIcon chats={this.props.chats}/>
                                    <ProfileIco handleLogout={this.accountStore.unauth.bind(accountStore)}
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
                    <Scrollbars autoHide>
                        <div className={classes.toolbar}/>
                        <MenuProvider id={"menu_id"}>
                            <Route path="/home/chat/:chat_id"
                                   render={(routeProps) => <ChatWindow {...routeProps}
                                                                       handleDrawerToggle={this.handleDrawerToggle}
                                   />}/>
                        </MenuProvider>
                        <Menu id='menu_id'>
                            <Item onClick={() => alert("ТЫ ХУЙ")}>ХУЙ</Item>
                            <Item onClick={() => alert("ТЫ ХУЙ")}>ХУЙ</Item>
                            <Item onClick={() => alert("ТЫ МОЧА")}>МОЧА</Item>
                        </Menu>
                    </Scrollbars>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Home);