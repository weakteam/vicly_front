import React, {Component} from "react";
import ProfileBar from "./ProfileBar";
import SearchBar from "./SearchBar";
import Logo from "../images/logoVicly.svg";
import LogoDark from "../images/LoginLogo.svg";
import {withStyles, Drawer, AppBar, Toolbar, IconButton, SwipeableDrawer, List, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/core/SvgIcon/SvgIcon";
import InviteIcon from "./InviteIcon";
import ProfileIco from "./ProfileIco";
import '../css/IOS.css'
import '../css/scrollbar.css'
import rootStore from "../store/RootStore";
import WorkgroupList from "./WorkgroupList";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    root: {
        // display: 'flex',
        /* top: 0,
         bottom: 0,
         left: 0,
         right: 0,*/
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
        zIndex: 1301,
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
            marginBottom: 0,
        },
        height: '100%',
        marginTop: 10,
        marginBottom: 10,

        overflow: 'hidden',
    },
    listFix: {
        padding: '127px 0px 39px 8px',
        [theme.breakpoints.down('xs')]: {
            padding: '16px 5px 0px 5px ',
        },
    },
    logoImage: {
        width: 30,
        marginRight: 10
    },
});

class NavDrawer extends Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.handleLogoutFunc = this.accountStore.unauth.bind(accountStore);
    }

    state = {
        mobileOpen: false,
        type: this.props.theme.palette.type,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    handleDrawerToggleForMob = () => {
        this.setState({mobileOpen: false});
    };

    drawer = () => {
        const {classes, theme} = this.props;
        return (
            <div className={classes.scrollDrawer}>
                <ProfileBar
                    changeThemeType={this.props.changeThemeType}
                    chats={this.props.chats}
                    handleLogout={this.handleLogoutFunc}/>
                <SearchBar/>
                <div className="scrollbar" id='style-3'>
                    <List className={"scrollDrawer " + classes.listFix}>
                        <WorkgroupList handleDrawerToggle={this.handleDrawerToggleForMob}/>
                    </List>
                </div>
                <div className={classes.logoDrawer}>
                    <img className={classes.logoImage} alt="Logo"
                         src={theme.palette.type === 'light' ? Logo : LogoDark}/>
                    <Typography variant="h6" className={classes.logoText}> Vicly Messenger </Typography>
                </div>
            </div>
        );
    };
    drawerMobile = () => {
        const {classes} = this.props;
        return (
            <div className={classes.scrollDrawer}>
                <SearchBar/>
                <div className="scrollbar" id='style-3'>
                    <List className={"scrollDrawer " + classes.listFix}>
                        <WorkgroupList handleDrawerToggle={this.handleDrawerToggleForMob}/>
                    </List>
                </div>

            </div>
        );
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.mobileOpen !== nextState.mobileOpen;
    }

    render() {
        const {classes, theme} = this.props;

        return (
            <>
                <div className="drawerTest">
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar disableGutters>
                            <IconButton aria-label="Open drawer" onClick={this.handleDrawerToggle}>
                                <MenuIcon className={classes.icon}/>
                            </IconButton>
                            <div className={classes.logoDiv}>
                                <Typography variant="h6" className={classes.text}>
                                    Vicly Messenger
                                </Typography>
                            </div>
                            <div className={classes.userBar}>
                                <InviteIcon chats={this.props.chats}/>
                                <ProfileIco
                                    changeThemeType={this.props.changeThemeType}
                                    handleLogout={this.handleLogoutFunc}
                                    name={this.accountStore.fullName}/>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <SwipeableDrawer
                        disableBackdropTransition={!iOS}
                        disableDiscovery={iOS}
                        container={this.props.container}
                        variant="temporary"
                        transitionDuration={300}
                        anchor="left"
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        onOpen={this.handleDrawerToggle}
                        className={classes.rootIndex}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}>
                        {this.drawerMobile()}
                    </SwipeableDrawer>
                </div>
                <div className="drawerDesktop">
                    <Drawer classes={{paper: classes.drawerPaper}} variant="permanent">
                        {this.drawer()}
                    </Drawer>
                </div>

            </>
        );
    }
}

export default withStyles(styles, {withTheme: true, index: 1})(NavDrawer);