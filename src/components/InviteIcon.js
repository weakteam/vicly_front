import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PersonAdd from '@material-ui/icons/PersonAddOutlined'
import IconButton from "@material-ui/core/IconButton/IconButton";
import InviteForm from "./InviteForm";
import history from "../store/history"
import rootStore from "../store/RootStore";

const {accountStore, messagesStore} = rootStore;

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
    root: {
        alignSelf: 'center',
        marginLeft: 'auto',
        //    zIndex: 1000,
    },
    paper: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#0A8D8D' : '#0A8D8D'
        }`,
        position: 'absolute',
        outline: 'none',
        borderRadius: 5,
        height: '98%',
        //  padding: 30,
        [theme.breakpoints.down('xs')]: {
            width: '95%',
        },
        width: 530,
        /*backgroundColor: ` ${
            theme.palette.type === 'light' ? "#679dbd" : "#679dbd"
            }`,*/
        boxShadow: theme.shadows[5],
        // padding: theme.spacing.unit * 4,
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
                    <div style={getModalStyle()} className={classes.paper}>
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