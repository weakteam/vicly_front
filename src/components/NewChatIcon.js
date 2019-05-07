import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PersonAdd from '@material-ui/icons/PersonAddOutlined'
import IconButton from "@material-ui/core/IconButton/IconButton";
import InviteForm from "./InviteForm";
import history from "../store/history"
import rootStore from "../store/RootStore";
import AddCommentOutlined from "@material-ui/icons/AddCommentOutlined"
import NewChatModal from "./NewChatModal";

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
        position: 'absolute',
        outline: 'none',
        borderRadius: 5,
      //  padding: 30,
       /* [theme.breakpoints.down('xs')]: {
            width: '80%',
        },*/
      //  width: 585,
      /*  backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,*/
        boxShadow: theme.shadows[5],
        // padding: theme.spacing.unit * 4,
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

class NewChatIcon extends React.Component {
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
                    <AddCommentOutlined className={classes.icon}/>
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
                    <div  style={getModalStyle()} className={classes.paper}>
                        <NewChatModal handleClose={this.handleClose}/>
                    </div>
                </Modal>
            </div>
        );
    }
}

// We need an intermediary variable for handling the recursive nesting.
const NewChat = withStyles(styles)(NewChatIcon);
export default NewChat;