import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {observer} from "mobx-react";
import AttachmentSmall from "./AttachmentSmall";
import Attachment from "../../store/models/Attachment";

const styles = theme => ({
    position: {
      //  margin: '5px 5px 5px 5px',
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
            theme.palette.mime === 'light' ? '1px solid #e6e6e6' : ''
            }`,*/
        left: 0,
        [theme.breakpoints.down('md')]: {
            left: 280,
        },
        [theme.breakpoints.down('sm')]: {
            left: 250,
        },
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },
        bottom: 70,
        borderRadius: 5,
        display: 'inline-flex',
        position: 'absolute',
        alignItems: 'center',
        right: 0,
        height: 120
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
        let at = new Attachment({filename: "lols.pptx", size: 1578824, progress: 33, status: 'loading'});
        at.progress = 75;
        at.status = 'ready';
        at.mime = "image";
        return (
            <div className={classes.position}>
                {/*<AttachmentSmall attachment={at}/>*/}
                {
                    this.props.attachments.map(attachment =>
                        <AttachmentSmall handleDeleteAttachment={this.props.handleDeleteAttachment} attachment={attachment}/>
                    )
                }
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AttachmentBar);