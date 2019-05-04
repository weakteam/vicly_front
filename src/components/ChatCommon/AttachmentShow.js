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
import {observer} from "mobx-react";
import Modal from "@material-ui/core/Modal";
import {BACKEND_URL} from "../../common";
import rootStore from "../../store/RootStore";
import getLinkFromMime from "../../utils/mimetypes";


const styles = theme => ({
    attached: {
        width: '100%',
        height: '100%',
        //  height: 110,
        objectFit: 'cover',
    },
    attachedIcon: {
        width: 35,
        height: 35,
        objectFit: 'cover',
        paddingRight: 5,
    },
    attachDiv: {
        //  margin: '5px 15px 5px 5px',
        //   width: 110,
        height: '100%',
        // backgroundColor: '#f5f5f5'
    },
    filename: {
        maxWidth: 100,
        position: 'absolute',
        marginTop: 90,
        paddingLeft: 4,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    //image modal view
    close: {
        position: "absolute",
        top: 15,
        right: 35,
        color: "#f1f1f1",
        fontSize: 40,
        fontWeight: "bold",
        transition: 0.3
    },
    imagePreview: {
        "&:hover":
            {
                opacity: 0.7
            }
    },
    caption:
        {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            margin: "auto",
            display: "block",
           // width: "80%",
            maxWidth: 230,
            fontSize: '0.75rem',
            textAlign: "start",
            color: "#252525",
          // padding: 10,
            // height: 150,
        },
    modal:
        {
            position: "fixed",
            zIndex: 1,
            paddingTop: 100,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
    modalContent:
        {
            margin: "auto",
            display: "block",
            width: "80%",
            maxWidth: 700
        }

});

@observer
class AttachmentShow extends React.Component {
    state = {
        messageText: "",
        imageModal: false
    };

    imagePreviewModalOpen = () => {
        this.setState({
            imageModal: true
        })
    };

    imagePreviewModalClose = () => {
        this.setState({
            imageModal: false
        })
    };

    preview() {
        const {classes, theme, attachment} = this.props;
        if (attachment.status === "ready") {
            if (attachment.previewSrc) {
                return <img onClick={this.imagePreviewModalOpen} src={attachment.previewSrc} alt="kek"
                            className={classes.attached + " " + classes.imagePreview}/>
            } else {
                const src = getLinkFromMime(attachment.mime);
                return (
                    <div style={{display: "flex"}}>
                        <img src={src || window.location.origin + "/icons/xml-icon-64x64.png"} alt="ico"
                             className={classes.attachedIcon}/>
                        <div>
                            <Typography variant="h6" className={classes.caption}>{attachment.filename}</Typography>
                            <Typography className={classes.caption}>15 МБ</Typography>
                        </div>
                    </div>

                )
            }
        } else if (attachment.status === "loading") {
            return <CircularProgress variant="indeterminate" value={attachment.progress}/>
        } else if (attachment.status === "none" || attachment.status === "error") {
            return "ERROR!"
        }
    }

    handleCloseClick = () => {
        this.props.handleDeleteAttachment(this.props.attachment)
    };

    handleAttachmentDownload = () => {
        const {attachment} = this.props;
        const mime = (attachment.mime && !attachment.mime.startsWith("image")) || false;
        if (!mime)
            return;
        fetch(BACKEND_URL + '/attachment/download/' + attachment.id, {
            method: "GET",
            headers: {
                'Authorization': rootStore.accountStore.token,
                //'Content-Type': 'application/json'
            }
        })
            .then(request => request.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(url => {
                var a = document.createElement('a');
                a.style = "display: none";
                a.href = url;
                a.download = attachment.filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // URL.revokeObjectURL(url);
            })
            .catch(err => console.log(err));
    };

    render() {
        const {classes, theme, attachment} = this.props;
        const mime = (attachment.mime && attachment.mime.startsWith("image")) || false;
        return (
            <div onClick={this.handleAttachmentDownload} className={classes.attachDiv}>
                {
                    mime ?
                        (
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.imageModal}
                                onClose={this.imagePreviewModalClose}
                            >
                                <div onClick={this.imagePreviewModalClose} className={classes.modal}>

                                    <span className={classes.close}>&times;</span>

                                    <img className={classes.modalContent} src={attachment.previewSrc}/>

                                    <Typography className={classes.caption}>{attachment.filename}</Typography>
                                </div>
                            </Modal>
                        ) : ('')
                }

                {
                    this.preview()
                }

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AttachmentShow);