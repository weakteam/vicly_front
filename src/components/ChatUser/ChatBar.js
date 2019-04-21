import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography/Typography";
import div from "@material-ui/core/Grid/Grid";
import MoreVert from '@material-ui/icons/MoreVert'
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import Group from '@material-ui/icons/Group';
import rootStore from "../../store/RootStore";
import InputBase from "@material-ui/core/InputBase/index";
import history from "../../store/history";

const {accountStore, messagesStore} = rootStore;


const styles = theme => ({
    position: {
        position: 'fixed',
        top: 0,
        right: 0,
        display: 'inline-flex',
        justifyContent: 'space-between',
        height: 55,
        zIndex: 1,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.darkSecondary
            }`,
        borderBottom: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
            //  theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            }`,
        borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
            }`,
        left: 400,
        [theme.breakpoints.down('md')]: {
            left: 280,
        },
        [theme.breakpoints.down('sm')]: {
            left: 250
        },
        [theme.breakpoints.down('xs')]: {
            left: 0,
            top: 55,
        },
    },
    namePosition: {
        display: 'inline-flex',
        alignItems: 'center',
        maxWidth: '40%'
    },
    searchField: {
        height: 33,
        margin: 7,
        marginRight: 0,
        [theme.breakpoints.down('xs')]: {
            maxWidth: '90%',
        },
        background: '#000!important',
        backgroundColor: '#000!important'
    },
    searchIco: {
        color: theme.palette.secondary.light
    },
    dialogIco: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
            }`,
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    search: {
        position: 'relative',
        margin: 12,
    },
    searchIcon: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 7,
    },
    inputRoot: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    inputInput: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#efefef' : "#49536d"
            }`,
        width: '100%',
        borderRadius: 4,
        padding: 8,
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
            }`,
    },
    iconSearch: {
        color: ` ${
            theme.palette.type === 'light' ? '#d2d2d2' : 'rgba(255, 255, 255, 0.17)'
            }`,
    },
    menu: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#efefef' : "#49536d"
            }`,
    },
    menuItem: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
            }`,
    },

});

class ChatBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        type: this.props.theme.palette.type,
    };

    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        this.history = history;
    }

    handleChange = event => {
        this.setState({auth: event.target.checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const {classes, theme, match} = this.props;

        let interlocutorName = this.messagesStore.users.find(elem => elem.id === +match);

        return (
            <div className={classes.position}>
                <div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon className={classes.iconSearch}/>
                        </div>
                        <InputBase
                            placeholder="Поиск сообщений…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}/>
                    </div>
                </div>

                <div className={classes.namePosition}>
                    <Typography variant="h6" className={classes.text}
                                noWrap>{interlocutorName.first_name}</Typography>
                </div>

                <div>
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}>
                        <MoreVert className={classes.dialogIco}/>
                    </IconButton>
                    <Menu
                        style={{zIndex: 2000}}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        classes={{
                            paper: classes.menu,
                        }}>
                        <MenuItem onClick={this.handleClose} className={classes.menuItem}>Информация о чате</MenuItem>
                        <MenuItem onClick={this.handleClose} className={classes.menuItem}>Вложения</MenuItem>
                        <MenuItem onClick={this.handleClose} className={classes.menuItem}>Заглушить
                            уведомления</MenuItem>
                        <MenuItem onClick={this.handleClose} className={classes.menuItem}>Выйти</MenuItem>
                    </Menu>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(ChatBar);