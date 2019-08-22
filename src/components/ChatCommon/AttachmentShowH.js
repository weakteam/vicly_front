import React, {useCallback, useMemo, useRef, useState} from 'react';
import Close from "@material-ui/icons/Close";
import {CircularProgress, Divider, makeStyles, Typography} from "@material-ui/core";
import {observer} from "mobx-react";
import Modal from "@material-ui/core/Modal";
import rootStore from "../../store/RootStore";
import getLinkFromMime from "../../utils/mimetypes";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import "../../css/AttachmentShow.css"


const useStyles = makeStyles({
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
        // boxShadow: theme.shadows[5],
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
    attachDiv: {},
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
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
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
        color: "#3f3f3f",
    },
    userRole: {
        color: "#3f3f3f",
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


function AttachmentShowH(props) {
    const {attachment} = props;
    const classes = useStyles(props);
    const [imageModal, setImageModal] = useState(false);
    const videoRef = useRef(null);
    let imagePreviewModalOpen = useCallback(() => setImageModal(true), []);
    let imagePreviewModalClose = useCallback(() => {
        setImageModal(false)
    }, []);
    let handleMouseOver = useCallback(() => {
        // setPlay(true);
        videoRef.current.play();
    }, []);
    let handleMouseOut = useCallback(() => {
        // setPlay(false);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }, []);

    let videoAttachment = () => {
        if (!attachment.previewSrcSmall && attachment.statusPreviewSmall === "none") {
            attachment.loadPreviewBig();
            attachment.loadPreviewSmall();
        }
        if (attachment.dataFetched && attachment.statusPreviewSmall === "loading") {
            return <CircularProgress variant={attachment.progressPreview === 100 ? "indeterminate" : "static"}
                                     value={attachment.progressPreview}/>
        } else if (attachment.statusPreviewSmall === "ready") {
            return <video
                className={classes.attached}
                ref={videoRef}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                src={attachment.previewSrcBig}
                poster={attachment.previewSrcSmall}
                loop/>
        } else if (attachment.statusPreviewSmall === "error") {
            return "ERROR!"
        }
    };

    let bigImagePreview = () => {
        if (!attachment.previewSrcBig && attachment.statusPreviewBig === "none") {
            attachment.loadPreviewBig();
            return (
                <CircularProgress variant="static" value={attachment.progressFull}/>
            )
        } else if (attachment.statusPreviewBig === "loading") {
            return (
                <CircularProgress variant="static" value={attachment.progressFull}/>
            )
        } else if (attachment.statusPreviewBig === "ready") {
            return <img className={classes.modalContent} src={attachment.previewSrcBig}/>
        } else if (attachment.statusPreviewBig === "error") {
            return "ERROR!"
        }
    };

    let imageAttachment = () => {
        if (!attachment.previewSrcSmall && attachment.statusPreviewSmall === "none") {
            attachment.loadPreviewSmall();
        }
        if (attachment.dataFetched && attachment.statusPreviewSmall === "loading") {
            return <CircularProgress variant={attachment.progressPreview === 100 ? "indeterminate" : "static"}
                                     value={attachment.progressPreview}/>
        } else if (attachment.statusPreviewSmall === "ready") {
            return <img
                onClick={imagePreviewModalOpen}
                src={attachment.previewSrcSmall} alt="kek"
                className={classes.attached + " " + classes.imagePreview}/>
        } else if (attachment.statusPreviewSmall === "error") {
            return "ERROR!"
        }
    };

    let mediaAttachment = () => {
        const {attachment} = props;
        if (attachment.isImage())
            return imageAttachment();
        if (attachment.isVideo())
            return videoAttachment();
    };

    let fileAttachment = () => {
        const {attachment} = props;
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
    };

    let handleAttachmentDownload = () => {
        rootStore.downloadService.downloadAttachment(props.attachment)
    };
    return (
        <div onClick={handleAttachmentDownload} className="attachDiv">
            {
                attachment.isMedia() ?
                    (
                        <>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={imageModal}
                                onClose={imagePreviewModalClose}
                            >
                                <div className={classes.modal + " paper"}>
                                    <Close onClick={imagePreviewModalClose} className="close"/>
                                    <div className="contentDiv">
                                        {imageModal ? bigImagePreview() : null}
                                    </div>
                                    <div className="commentBlock">
                                        <div className="infBlockFirst">
                                            <Avatar className="userAvatar">
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
                                    </div>
                                </div>
                            </Modal>
                            {
                                mediaAttachment()
                            }
                        </>
                    ) : (
                        fileAttachment()
                    )
            }
        </div>
    )
}

export default (observer(AttachmentShowH));