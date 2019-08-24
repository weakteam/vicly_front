import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';
import 'typeface-roboto';
import {observer} from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";


const styles = theme => ({
    emptyChat: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },
        text: {
            color: ` ${
                theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
                }`,
        },
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

@observer
class ChatLoader extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.emptyChat}>
                    <CircularProgress/>
            </div>
        );
    }
}

const styledWindow = withStyles(styles, {withTheme: true, index: 1})(ChatLoader);

export default styledWindow;
