import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import SendOutlined from '@material-ui/icons/SendOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FormControl from "@material-ui/core/FormControl/index";
import InputBase from "@material-ui/core/InputBase/index";
import {fade} from "@material-ui/core/styles/colorManipulator";
import Close from "@material-ui/icons/Close";
import {Badge, CircularProgress} from "@material-ui/core";
import img1 from '../../images/fon3b.jpg';
import img2 from '../../images/fon2.jpg';
import img3 from '../../images/fon1.jpg';
import {observer} from "mobx-react";
import Attachment from "./Attachment";

const styles = theme => ({
    position: {
        margin: '5px 5px 5px 5px',
        boxShadow: ` ${
            theme.palette.type === 'light' ? '0px 0px 4px 0px #9f9f9f3b' : '0px 0px 4px 0px #22222291'
            }`,
        //  height: 100,
        // width: '100%',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.primary.darkSecondary
            }`,
        overflowX: 'auto',
        /*borderLeft: ` ${
            theme.palette.type === 'light' ? '1px solid #e6e6e6' : ''
            }`,*/
        left: 400,
        [theme.breakpoints.down('md')]: {
            left: 280,
        },
        [theme.breakpoints.down('sm')]: {
            left: 250,
        },
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },
        bottom: 59,
        display: 'inline-flex',
        position: 'fixed',
        alignItems: 'center',
        right: 0,
    },
    attached: {
        // width: 70,
        // height: 70,
        maxWidth: 80,
        maxHeight: '8%',
        borderRadius: 5
    },
    attachDiv: {
        margin: '5px 15px 5px 5px',
    },
    deleteIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        position: 'absolute',
        width: '0.8em',
        height: '0.8em',
        cursor: 'pointer',
        marginTop: 1,
        marginLeft: 60,
        '&:hover': {
            backgroundColor: '#fff',
        }
    },
});

@observer
class AttachmentBar extends React.Component {
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
        if (event.keyCode == 13 && event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            this.handleSendButton();
        }
    };

    render() {
        const {classes, theme} = this.props;

        return (
            <div className={classes.position}>
                {
                    this.props.attachments.map(attachment =>
                        (
                            <Attachment attachment={attachment}/>
                            // <>
                            //     <div className={classes.attachDiv}>
                            //         <Close className={classes.deleteIcon}/>
                            //         {attachment.filename}
                            //         <CircularProgress
                            //             variant="determinate"
                            //             value={attachment.progress}
                            //         />
                            //         <img src={img1} alt="kek" className={classes.attached}/>
                            //     </div>
                            // </>
                        ))

                }
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AttachmentBar);