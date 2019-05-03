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
import {Badge, CircularProgress, Typography} from "@material-ui/core";
import img1 from '../../images/fon3b.jpg';
import someIcon from '../../images/icons/pdf-icon-64x64.png';
import img2 from '../../images/fon2.jpg';
import img3 from '../../images/fon1.jpg';
import {observer} from "mobx-react";

const styles = theme => ({
    attached: {
        width: 110,
        height: 110,
        objectFit: 'cover',
        borderRadius: 4
    },
    attachedIcon: {
        width: 64,
        height: 64,
        objectFit: 'cover',
        margin: 16
    },
    attachDiv: {
        margin: '5px 15px 5px 5px',
        width: 110,
        height: 110,
        backgroundColor: '#f5f5f5'
    },
    filename: {
        maxWidth: 100,
        position: 'absolute',
        marginTop: 90,
        paddingLeft: 4,
        overflow: 'hidden',
        textOverflow: 'ellipsis',

    },
    deleteIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        position: 'absolute',
        width: '0.8em',
        height: '0.8em',
        cursor: 'pointer',
        marginTop: 1,
        marginLeft: 90,
        '&:hover': {
            backgroundColor: '#fff',
        }
    },
});

@observer
class AttachmentSmall extends React.Component {
    state = {
        messageText: ""
    };

    preview() {
        const {classes, theme, attachment} = this.props;
        if (attachment.status === "ready") {
            if (attachment.mime.startsWith("image")) {
                return <img src={attachment.previewSrc} alt="kek" className={classes.attached}/>
            } else {
                return <img src={someIcon} alt="ico" className={classes.attachedIcon}/>
            }
        } else if (attachment.status === "loading") {
            return <CircularProgress variant="static" value={attachment.progress}/>
        } else if (attachment.status === "none" || attachment.status === "error") {
            return "ERROR!"
        }
    }

    handleCloseClick = () => {
        this.props.handleDeleteAttachment(this.props.attachment)
    };

    render() {
        const {classes, theme, attachment} = this.props;

        return (
            <div className={classes.attachDiv}>
                <Close onClick={this.handleCloseClick} className={classes.deleteIcon}/>
                <Typography className={classes.filename} inline={true}>
                    {attachment.filename}
                </Typography>
                {
                    this.preview()
                }
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AttachmentSmall);