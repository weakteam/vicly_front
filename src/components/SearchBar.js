import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddCommentOutlined from "@material-ui/icons/AddCommentOutlined"
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import rootStore from "../store/RootStore";
const {accountStore,messagesStore} = rootStore;

const styles = theme => ({
    position: {
        margin: '0 8px 0 8px',
        borderRadius: '0 0 5px 5px',
        width: 'calc(400px - 16px)',
        top: 81,
        [theme.breakpoints.down('md')]: {
            width: 'calc(280px - 16px)',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'calc(250px - 16px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: '96%',
            top: 58,
            borderRadius: '5px 5px 5px 5px',
            position: "absolute",
            borderBottom: 0,
        },
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : '#2b3346'
            }`,
        display: 'inline-flex',
        position: "fixed",
        alignItems: 'center',
        height: 55,
        /*borderBottom: ` ${
            //theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
            }`,*/
        boxShadow: ` ${
            theme.palette.type === 'light' ? 'inset 0px -3px 0px 0px rgb(204, 204, 204)' : 'inset 0px -4px 0px 0px rgb(19, 24, 37)'
            }`,
        zIndex: 1,
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
            theme.palette.type === 'light' ? '#d2d2d2' : 'rgba(255, 255, 255, 0.17)'
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
        this.chatsStore = messagesStore;
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
                        placeholder="Поиск диалогов…"
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