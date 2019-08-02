import React from 'react';
import Grid from '@material-ui/core/Grid/index';
import Avatar from '@material-ui/core/Avatar/index';
import Typography from '@material-ui/core/Typography/index';
import 'typeface-roboto';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {observer} from "mobx-react";
import history from "../../store/history";

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

    handleClick() {
        history.push(this.props.url);
    }

    render() {
        const {classes, title} = this.props;

        return (
            <div onClick={this.handleClick.bind(this)} className={classes.root}>
                <Typography variant="h6">Новое сообщение</Typography>
                <Grid container className={classes.fixWidth}
                      wrap="nowrap"
                      spacing={16}>
                    <Grid item md>
                        <Avatar
                            src={this.props.avatar ? this.props.avatar.small : ""}
                            className={classes.avatar}>
                            {this.props.title}
                        </Avatar>
                    </Grid>

                    <Grid item xs zeroMinWidth>
                        <Typography variant="body2"
                                    noWrap
                                    className={classes.userName1}>{this.props.title}</Typography>
                        <Typography variant="caption"
                                    noWrap
                                    className={classes.message2}>{this.props.message}</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(MessagePush);
