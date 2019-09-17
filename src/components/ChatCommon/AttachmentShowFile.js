import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {observer} from "mobx-react";
import rootStore from "../../store/RootStore";
import LinearProgress from "@material-ui/core/LinearProgress";
import "../../css/AttachmentShow.css"


const useStyles = makeStyles({
    attachedIcon: {
        width: 35,
        height: 35,
        objectFit: 'cover',
        paddingRight: 5,
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
});


function AttachmentShowFile(props) {
    const {attachment} = props;
    const classes = useStyles(props);

    let handleAttachmentDownload = () => {
        rootStore.downloadService.downloadAttachment(props.attachment)
    };

    return (
        <div onClick={handleAttachmentDownload} className="attachDiv">
            <div style={{display: "flex", padding: '3px 0px',     alignItems: 'center',}}>
                <img src={window.location.origin + "/icons/xml-icon-64x64.png"} alt="ico"
                     className={classes.attachedIcon}
                     onClick={attachment.loadFull}/>
                <div style={{overflow: 'hidden'}}>
                    <div className='fileName'>{attachment.filename}</div>
                    <div className='size'>{+attachment.size + " kb"}</div>
                </div>
                {
                    attachment.statusFull === "loading" || attachment.statusFull === "ready" ?
                        (
                            <LinearProgress variant="determinate" value={attachment.progressFull}/>
                        ) : null
                }
            </div>


        </div>
    )
}

export default (observer(AttachmentShowFile));