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
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Typography from "@material-ui/core/es/Typography/Typography";
import Background from '../images/gif.gif';

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

      //  flexShrink: 1,
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
        zIndex: 1962,
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
            marginTop: 105,
        },
        marginTop: 110,
        padding: 0,
    },
    content: {
        flexGrow: 1,
        //position: 'static',
      //  flexShrink: 1,
        width: 'auto',
        minHeight: '100vh',
        [theme.breakpoints.down('xs')]: {
           // minHeight: '-webkit-fill-available',
           // minHeight: 'auto',
            zIndex: 1,
        },
        borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            }`,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? "#f1f1f1" : '#3c465d'
            }`,
        //backgroundImage: 'url(' + Background + ')',
        //backgroundSize: 'cover',
        //zIndex: 1503,
        boxShadow: '-2px 0px 20px 0px rgba(0, 0, 0, 0.08)',
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
        marginTop: '50%',
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
            }`,
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
        type: this.props.theme.palette.type,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    handleChangeType = () => {
        if (this.state.type === "light") {

            this.setState({
                type: "dark",
            })
        } else {
            this.setState({
                type: "light",
            })
        }
    };


    workgroups() {
        if (this.chatsStore.groups.length) {
            return this.chatsStore.groups.map(
                workgroup => <Workgroup chatsStore={chatsStore} handleDrawerToggle={this.handleDrawerToggle}
                                        workgroup={workgroup} chats={
                    this.chatsStore.userChats.filter(
                        userChat => userChat.user.group_id === workgroup.id)}/>
            )
        } else {
            return (
                <div style={{marginTop: '50%'}}>
                    <Loader active inverted>Loading</Loader>
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
                        <ProfileBar handleChangeType={this.handleChangeType} chats={this.props.chats}
                                    andleLogout={this.accountStore.unauth.bind(accountStore)}/>
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
                                    <MenuIcon className={classes.icon}/>
                                </IconButton>
                                <div className={classes.logoDiv}>
                                    <Typography variant="h6" className={classes.text}> Vicly Messenger </Typography>
                                </div>
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
                        {/*   <Button varian="outlined" onClick={this.props.changeThemeType}>rtr</Button>*/}
                        {/*<MenuProvider id={"menu_id"}>
                            Это ниработает лол
                        </MenuProvider>
                        <Menu id='menu_id'>
                            <Item onClick={() => alert("ТЫ ХУЙ")}>ХУЙ</Item>
                            <Item onClick={() => alert("ТЫ ХУЙ")}>ХУЙ</Item>
                            <Item onClick={() => alert("ТЫ МОЧА")}>МОЧА</Item>
                        </Menu>*/}
                        <Route path="/home/chat/:chat_id"
                               render={(routeProps) => <ChatWindow {...routeProps}
                                                                   handleDrawerToggle={this.handleDrawerToggle}
                               />}/>
                    </Scrollbars>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Home);