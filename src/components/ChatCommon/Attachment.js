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

const styles = theme => ({
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

class Attachment extends React.Component {
    state = {
        messageText: ""
    };

    render() {
        const {classes, theme, attachment} = this.props;

        return (
            <div className={classes.attachDiv}>
                <Close className={classes.deleteIcon}/>
                {attachment.filename}
                <CircularProgress
                    variant="determinate"
                    value={attachment.progress}
                />
                <img src={img1} alt="kek" className={classes.attached}/>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Attachment);