import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import Close from "@material-ui/icons/Close";
import {CircularProgress, Divider, Typography} from "@material-ui/core";
import {observer} from "mobx-react";
import Modal from "@material-ui/core/Modal";
import {BACKEND_URL} from "../../common";
import rootStore from "../../store/RootStore";
import getLinkFromMime from "../../utils/mimetypes";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        outline: 'none',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '90%',
        //  padding: 30,
        /* [theme.breakpoints.down('xs')]: {
             width: '80%',
         },*/
        //  width: 585,
        /*  backgroundColor: ` ${
              theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
              }`,*/
        boxShadow: theme.shadows[5],
        backgroundColor: "#191b22"
        // padding: theme.spacing.unit * 4,
    },
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
        alignSelf: 'center',
        marginLeft: 'auto',
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
        top: 2,
        left: 3,
        color: "#f1f1f1",
        fontSize: 32,
        cursor: 'pointer',
        // fontWeight: "bold",
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
            outline: 'none',
            position: "absolute",
            zIndex: 1,
            // paddingTop: 100,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
    modalContent:
        {
            maxHeight: '100%',
            //  margin: "auto",
            //  display: "block",
            position: 'absolute',
            //  width: "auto",
            maxWidth: 'calc(100% - 400px)',
            /* left: 50%; */
            transform: 'translate(-50%, -50%)',
            objectFit: 'scale-down',
            top: '50%',
            //   maxWidth: '100%'
        },
    infBlockFirst: {
        padding: 15,
        display: 'flex',
        alignItems: 'center'
    },
    userAvatar: {
        width: 40,
        height: 40,
    },
    nameUser: {
        fontSize: '1rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
    },
    userRole: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
        }`,
    },
    commentBlock: {
        backgroundColor: '#fff',
        borderRadius: '0px 5px 5px 0px',
        height: '100%',
        // width: '20%',
        width: 400,
        /*[theme.breakpoints.down('md')]: {
            width: '30%',
        },*/
    },

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

    // preview() {
    //     const {classes, theme, attachment} = this.props;
    //     if (attachment.statusFull === "ready") {
    //         if (attachment.previewSrc) {
    //             return <img onClick={this.imagePreviewModalOpen} src={attachment.previewSrc} alt="kek"
    //                         className={classes.attached + " " + classes.imagePreview}/>
    //         } else {
    //             const src = getLinkFromMime(attachment.mime);
    //             return (
    //                 <div style={{display: "flex"}}>
    //                     <img src={src || window.location.origin + "/icons/xml-icon-64x64.png"} alt="ico"
    //                          className={classes.attachedIcon}/>
    //                     <div>
    //                         <Typography variant="h6" className={classes.caption}>{attachment.filename}</Typography>
    //                         <Typography className={classes.caption}>15 МБ</Typography>
    //                     </div>
    //                 </div>
    //
    //             )
    //         }
    //     } else if (attachment.statusFull === "loading") {
    //         return <CircularProgress variant="indeterminate" value={attachment.progressFull}/>
    //     } else if (attachment.statusFull === "none" || attachment.statusFull === "error") {
    //         return "ERROR!"
    //     }
    // }

    viewableAttachment() {
        const {classes, theme, attachment} = this.props;
        if (attachment.previewSmall && attachment.previewSrcSmall) {
            return <img onClick={this.imagePreviewModalOpen} src={attachment.previewSrcSmall} alt="kek"
                        className={classes.attached + " " + classes.imagePreview}/>
        } else if (attachment.previewSmall && attachment.statusPreview === "loading") {
            return <CircularProgress variant={attachment.progressPreview === 100 ? "indeterminate" : "static"}
                                     value={attachment.progressPreview}/>
        } else if (attachment.previewSmall && !attachment.previewSrcSmall && !attachment.statusPreview === "loading") {
            attachment.loadPreviewBig();
        } else if (attachment.statusPreview === "none" || attachment.statusPreview === "error") {
            return "ERROR!"
        }
    }

    non_viewableAttachment() {
        const {classes, theme, attachment} = this.props;
        if (attachment.dataFetched === "ready") {
            const src = getLinkFromMime(attachment.mime);
            return (
                <div style={{display: "flex"}}>
                    <img src={src || window.location.origin + "/icons/xml-icon-64x64.png"} alt="ico"
                         className={classes.attachedIcon}
                         onClick={attachment.loadFull}/>
                    <div style={{overflow: 'hidden'}}>
                        <Typography variant="h6" className={classes.caption}>{attachment.filename}</Typography>
                        <Typography className={classes.caption}>{+attachment.size + " kb"}</Typography>
                    </div>
                    {
                        attachment.statusFull === "loading" || attachment.statusFull === "ready" ?
                            (
                                <LinearProgress variant="determinate" value={attachment.progressFull}/>
                            ) : null
                    }

                </div>
            )
        } else if (attachment.dataFetched === "loading") {
            return <CircularProgress variant="indeterminate"/>
        } else if (attachment.dataFetched === "none" || attachment.statusPreview === "error") {
            return "ERROR!"
        }
    }

    fullImage(wasError) {
        const {classes, theme, attachment} = this.props;
        if (attachment.statusFull === "none") {
            attachment.loadFull();
            return (
                <CircularProgress variant="static" value={attachment.progressFull}/>
            )
        } else if (attachment.statusFull === "loading") {
            return (
                <CircularProgress variant="static" value={attachment.progressFull}/>
            )
        } else if (attachment.statusFull === "ready") {
            return <img alt="attachment" className={classes.modalContent} src={attachment.fullSrc}/>
        } else if (attachment.statusFull === "error" && !wasError) {
            return this.fullImage(true)
        } else {
            return "Everything is bad!";
        }
    }

    bigPreview(wasError) {
        const {classes, theme, attachment} = this.props;
        if (attachment.previewBig && !attachment.previewSrcBig) {
            attachment.loadPreviewBig();
            return (
                <CircularProgress variant="static" value={attachment.progressFull}/>
            )
        } else if (attachment.statusPreview === "loading") {
            return (
                <CircularProgress variant="static" value={attachment.progressFull}/>
            )
        } else if (attachment.previewSrcBig) {
            return <img className={classes.modalContent} src={attachment.previewSrcBig}/>
        } else if (!attachment.previewSrcBig && attachment.statusFull === "error" && !wasError) {
            return this.bigPreview(true)
        } else {
            return "Everytthing is bad!";
        }
    }

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
        const canViewed = attachment.canShowPreview();
        return (
            <div onClick={this.handleAttachmentDownload} className={classes.attachDiv}>
                {
                    canViewed ?
                        (
                            <>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.imageModal}
                                    onClose={this.imagePreviewModalClose}
                                >
                                    <div style={getModalStyle()}
                                         className={classes.paper}>
                                        <Close onClick={this.imagePreviewModalClose} className={classes.close}/>
                                        <div style={{width: '100%', textAlign: 'center'}}>
                                            {this.state.imageModal ? this.bigPreview(false) : null}
                                            {/*{this.state.imageModal ? this.fullImage(false) : null}*/}
                                        </div>

                                        <div className={classes.commentBlock}>
                                            <div className={classes.infBlockFirst}>
                                                <Avatar className={classes.userAvatar}>
                                                    {/*{this.accountStore.first_name[0].toUpperCase() + this.accountStore.last_name[0].toUpperCase()}*/}
                                                    LL
                                                </Avatar>
                                                <div style={{marginLeft: 10}}>
                                                    <Typography variant="h5"
                                                                className={classes.nameUser}>Петя васечкин</Typography>
                                                    <Typography variant="caption"
                                                                noWrap
                                                                className={classes.userRole}>Программист</Typography>
                                                </div>

                                            </div>
                                            <Divider/>
                                            {/*  <Typography variant="caption"
                                                        className={classes.caption}>{attachment.filename}</Typography>*/}
                                        </div>
                                    </div>

                                </Modal>
                                {
                                    this.viewableAttachment()
                                }
                            </>
                        )
                        :
                        (
                            this.non_viewableAttachment()
                        )
                }

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AttachmentShow);