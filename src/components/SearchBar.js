import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddCommentOutlined from "@material-ui/icons/AddCommentOutlined"
import accountStore from "../store/AccountStore";
import chatsStore from "../store/ChatsStore";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
    position: {
        display: 'inline-flex',
        position: "fixed",
        alignItems: 'center',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
        height: 55,
        top: 55,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            position: "fixed",
            top: 55,
        },
        width: '30%',
        zIndex: 1499,
    },
    textField: {
        width: 'calc(100% - 54px)',
        marginRight: 0,
        marginLeft: 6,
        borderRadius: 4,
        color: theme.palette.primary.light,
        height: 36,
    },
    button: {
        color: theme.palette.secondary.light
    },
    searchIco: {
        color: theme.palette.secondary.light
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
            }`,
    },
    iconSearch: {
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : 'rgba(255, 255, 255, 0.17)'
            }`,
    },

    search: {
        position: 'relative',
        margin: '0 0 0 8px',
        width: '100%'
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
        width: '100%',
    },
    inputInput: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#efefef' : "#49536d"
            }`,
        width: '100%',
        borderRadius: 4,
        padding: 8,
    },
});

class OutlinedTextFields extends React.Component {

    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.chatsStore = chatsStore;
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.position}>
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

                <IconButton>
                    <AddCommentOutlined className={classes.icon}/>
                </IconButton>
            </div>

        );
    }
}

export default withStyles(styles)(OutlinedTextFields);