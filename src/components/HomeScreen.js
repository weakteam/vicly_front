import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';
import 'typeface-roboto';
import {observer} from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddComment from '@material-ui/icons/AddComment'
import Person from '@material-ui/icons/Person'
import Settings from '@material-ui/icons/Settings'


const styles = theme => ({
    emptyChat: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 400,
        [theme.breakpoints.down('md')]: {
            left: 280,
        },
        [theme.breakpoints.down('sm')]: {
            left: 250
        },
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },
        text: {
            color: ` ${
                theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
                }`,
        },
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        [theme.breakpoints.down('xs')]: {
            width: 220,
        },
        width: 600,
        //  height: 200,
        padding: 24,
        maxWidth: '100%',
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    startCard: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.12)',
            backgroundColor: ` ${
                theme.palette.type === 'light' ? 'rgba(134, 134, 134, 0.8)' : 'rgba(96, 110, 142, 0.54)'
                }`,
            //
        },
display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        width: 100,
        height: 100,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? 'rgba(193, 193, 193, 0.8)' : 'rgba(32, 33, 43, 0.58)'
            }`,
    },
    cardText: {
        '&:hover': {
           //color: '#43a296',
        },
        borderRadius: '50%',
        fontSize: 40,
        color: '#fff',
        padding: 30,
       /* color: ` ${
            theme.palette.mime === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,*/
    },
});

@observer
class HomeScreen extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.emptyChat}>
                <div className={classes.empty}>
                    <div className={classes.startCard}>
                      <AddComment className={classes.cardText}/>
                    </div>
                    <div className={classes.startCard}>
                        <Person className={classes.cardText}/>
                    </div>
                    <div className={classes.startCard}>
                        <AddComment className={classes.cardText}/>
                    </div>
                    <div className={classes.startCard}>
                        <Settings className={classes.cardText}/>
                    </div>
                </div>
            </div>
        );
    }
}

const styledHomeScree = withStyles(styles, {withTheme: true})(HomeScreen);

export default styledHomeScree;
