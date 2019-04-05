import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import withStyles from "@material-ui/core/es/styles/withStyles";
import SendOutlined from '@material-ui/icons/SendOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({

    position: {
         height: 'auto',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.darkSecondary
            }`,
        borderTop: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            }`,
        borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            }`,
        bottom: 0,
        display: 'inline-flex',
        position: 'fixed',
        alignItems: 'center',
        right: 0,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            left: 0,
        },
        left: '30%',
      //  borderTop: '1px solid #e2e2e2',
        //  borderLeft: '1px solid #e2e2e2',
    },
    iconButton: {
        width: 48,
        height: 48,
    },
    input: {
        borderRadius: 4,
        //  backgroundColor: 'rgba(234, 234, 234, 0.59)', //rgb(101, 114, 146)
        backgroundColor: ` ${
            theme.palette.type === 'light' ? 'rgba(234, 234, 234, 0.59)' : 'rgb(101, 114, 146)'
            }`,
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    active: {
        '&:focus': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
         //   borderColor: '#819bff',
            boxShadow: `${fade('#3750ef', 0.25)} 0 0 0 0.2rem`,
         //   border: '1px solid #b9daff',
           // boxShadow: `${fade('#9cabef', 0.25)} 0 0 0 0.2rem`,
        },
        /*'&:selected': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('#ff2f00', 0.25)} 0 0 0 0.2rem`,
        },*/
        width: 'calc(100% - 18px)',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
       // width: '100%',
        paddingTop: 13,
        borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : '1px solid #40485d'
            }`,
        paddingBottom: 13,
        paddingLeft: 10,
        paddingRight: 10,
        maxHeight: 150,
    },
});

class SendMessageBar extends React.Component {
    state = {
        messageText: ""
    };

    handleSendButton = () => {
        if (!this.state.messageText.trim())
            return;
        this.props.handleSendMessage({
            message: this.state.messageText,
            fromMe: true
        });
        this.setState({
            messageText: ""
        })
    };

    handleOnTextChange = (e) => {
        this.setState({
            messageText: e.target.value
        });
    };

    onEnterDown = (event) => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.handleSendButton();
        }
    };

    render() {

        const {classes, theme} = this.props;

        return (
            <div className={classes.position}>
             {/*   <TextField
                    multiline
                    type="text"
                    value={this.state.messageText}
                    onChange={this.handleOnTextChange}
                    className={classes.textField}
                   // placeholder="Введите сообщение..."
                    variant="outlined"
                    onKeyDown={this.onEnterDown}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" color="secondary">
                                <IconButton disabled={!this.state.messageText.trim()}
                                            onClick={this.handleSendButton.bind(this)}>
                                    <SendOutlined/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />*/}

                <IconButton className={classes.iconButton}>
                    <AttachFile className={classes.icon}/>
                </IconButton>

                <FormControl fullWidth>
                    <InputBase
                        placeholder="Введите сообщение"
                        multiline
                        type="text"
                        onKeyDown={this.onEnterDown}
                        value={this.state.messageText}
                        onChange={this.handleOnTextChange}
                        classes={{input: classes.active}}
                        endAdornment={
                                <InputAdornment position="end" color="secondary">
                                    <IconButton disabled={!this.state.messageText.trim()}
                                                onClick={this.handleSendButton.bind(this)}>
                                        <SendOutlined/>
                                    </IconButton>
                                </InputAdornment>
                            }
                    />
                </FormControl>
                {/* <div className={"ui icon input " +classes.textField}>

                    <input type="text" placeholder="Введите сообщение..."  onChange={this.handleOnTextChange} onKeyDown={this.onEnterDown} value={this.state.messageText} />
                    <i className=" icon"><IconButton disabled={!this.state.messageText.trim()}
                                                           onClick={this.handleSendButton.bind(this)}>
                        <SendOutlined/>
                    </IconButton></i>
                </div>*/}

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(SendMessageBar);