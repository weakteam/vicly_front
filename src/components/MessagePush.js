import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {observer} from "mobx-react";

import rootStore from "../store/RootStore";
const {accountStore, messagesStore} = rootStore;


const styles = theme => ({
    avatar: {
        width: 45,
        height: 45,
    },
    userName1: {
        fontSize: '1rem',
        color: "#4d52a6"
    },
    message2: {
        fontSize: '0.9rem'
    },
    root: {
        width: 280,
    },
});

@observer
class MessagePush extends React.Component {

    constructor(props) {
        super(props);
        this.messagesStore = messagesStore;
    }

    render() {
        const {classes, dialog} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h6">Новое сообщение</Typography>
                <Grid container className={classes.fixWidth}
                      wrap="nowrap"
                      spacing={16}>

                    <Grid item md={16}>
                        <Avatar
                            src="https://www.pnp.ru/upload/entities/2017/12/04/article/detailPicture/16/0e/06/22/19de7995e55dc70227809059f9b31bd5.jpg"
                            className={classes.avatar}>
                            {dialog.first_name[0].toUpperCase() + dialog.last_name[0].toUpperCase()}
                        </Avatar>
                    </Grid>

                    <Grid item xs zeroMinWidth>
                        <Typography variant="body2"
                                    noWrap
                                    className={classes.userName1}>{dialog.first_name + " " + dialog.last_name}</Typography>
                        <Typography variant="caption"
                                    noWrap
                                    className={classes.message2}>{this.props.lastMsg ? this.props.lastMsg.message : "Нет сообщений"}</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(MessagePush);
