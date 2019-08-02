import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PersonAdd from '@material-ui/icons/PersonAddOutlined'
import IconButton from "@material-ui/core/IconButton/IconButton";
import InviteForm from "./InviteForm";
import history from "../store/history"
import rootStore from "../store/RootStore";

const {accountStore, messagesStore} = rootStore;
const top = 50;
const left = 50;

const styles = theme => ({
    root: {
        alignSelf: 'center',
        marginLeft: 'auto',
        //    zIndex: 1000,
    },
    paper: {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        width: 495,
        height: '98%',
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            transform: 'none',
            width: 'auto',
        },
        position: 'absolute',
        outline: 'none',
        borderRadius: 10,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
        }`,
        boxShadow: theme.shadows[5],
    },
    textField: {
        width: '-webkit-fill-available',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.lightIcons : theme.palette.secondary.dark
        }`,
    },
    rootIndex: {
        zIndex: 1300,
    },
});

class InviteIcon extends React.Component {
    state = {
        open: false,
    };

    constructor(props) {
        super(props);
        this.history = history;
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <IconButton onClick={this.handleOpen}>
                    <PersonAdd className={classes.icon}/>
                </IconButton>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    classes={{
                        root: classes.rootIndex,
                    }}

                >
                    <div className={classes.paper}>
                        <InviteForm handleClose={this.handleClose}/>
                    </div>
                </Modal>
            </div>
        );
    }
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(InviteIcon);
export default SimpleModalWrapped;