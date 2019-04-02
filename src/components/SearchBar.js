import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Search from "@material-ui/icons/Search"
import AddCommentOutlined from "@material-ui/icons/AddCommentOutlined"
import accountStore from "../store/AccountStore";
import chatsStore from "../store/ChatsStore";

const styles = theme => ({
    position: {
        display: 'inline-flex',
        position: "fixed",
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        height: 55,
       top: 55,
        // borderRight: '1px solid #e2e2e2',
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
        //marginTop: 5,
        color: theme.palette.secondary.light
    },
    searchIco: {
        color: theme.palette.secondary.light
    },
});

class OutlinedTextFields extends React.Component {

    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.chatsStore = chatsStore;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.position}>
                   {/* <TextField
                        id="standard-search"
                        placeholder="Поиск..."
                        type="search"
                        variant='outlined'
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton className={classes.searchIco}>
                                        <Search/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />*/}
               <div className={"ui icon input " +classes.textField}>
                    <input type="text" placeholder="Поиск контактов..."/>
                        <i className="search icon"></i>
                </div>
                <IconButton>
                    <AddCommentOutlined color="secondary"/>
                </IconButton>

            </div>

        );
    }
}

export default withStyles(styles)(OutlinedTextFields);