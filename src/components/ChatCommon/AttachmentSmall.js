import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import SendOutlined from '@material-ui/icons/SendOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
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
import getLinkFromMime from "../../utils/mimetypes";

const styles = theme => ({
    attached: {
        width: 110,
        //  height: 110,
        objectFit: 'cover',
        borderRadius: 4
    },
    attachedIcon: {
        width: 44,
        height: 44,
        objectFit: 'cover',
        // margin: 16
    },
    attachDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px 5px 5px 5px',
        maxWidth: 110,
        //  height: 110,
        //  backgroundColor: '#f5f5f5'
    },
    filename: {
        //  maxWidth: 100,
        //  position: 'absolute',
        // marginTop: 45,
        paddingLeft: 4,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: 60,

    },
    deleteIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        position: 'absolute',
        width: 15,
        padding: 5,
        height: 15,
        cursor: 'pointer',
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
        if (attachment.statusPreview === "ready") {
            if (attachment.canShowPreview()) {
                return <img src={attachment.previewSrc} alt="kek" className={classes.attached}/>
            } else {
                const src = getLinkFromMime(attachment.mime);
                return (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={src || window.location.origin + "/icons/xml-icon-64x64.png"} alt="ico"
                             className={classes.attachedIcon}/>
                        <Typography className={classes.filename} inline={true}>
                            {attachment.filename}
                        </Typography>
                    </div>
                )

            }
        } else if (attachment.statusPreview === "loading") {
            return <CircularProgress variant="static" value={attachment.progressPreview}/>
        } else if (attachment.statusPreview === "none" || attachment.statusPreview === "error") {
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
                {
                    this.preview()
                }

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AttachmentSmall);