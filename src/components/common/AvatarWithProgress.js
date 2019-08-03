import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import rootStore from "../../store/RootStore";
import {observer} from "mobx-react";

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

const styles = theme => ({});

@observer
class AvatarWithProgress extends React.Component {
    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
    }

    state = {
        blob: null
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        const {userId, lastName, firstName} = nextProps;
        rootStore.imageService.getAvatarThumbnail()
            .then(avatar => {
                if (avatar) {
                    if (this.state.blob != avatar.small) {
                        this.setState({
                            small: avatar.small
                        })
                    }
                }
            })
            .catch(err => {
                // console.log("AvatarWithProgress:" + err);
            })
    }

    render() {
        const {classes, theme} = this.props;
        const {userId, lastName, firstName} = this.props;


        return (
            <div>
                {
                    this.state.blob ?
                        (
                            <Avatar
                                src={this.state.avatar_image || avatar_image.small}>
                            </Avatar>
                        )
                        :
                        (
                            <Avatar className={classes.avatar}>
                                {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
                            </Avatar>
                        )

                }
            </div>
        )
            ;
    }
}

export default withStyles(styles, {withTheme: true, index: 1})(AvatarWithProgress);