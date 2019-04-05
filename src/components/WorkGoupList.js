/*
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
        margin: 'auto',
        height: '400px',
    },
});

function ListDividers(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider /><ListItem button>
                <ListItemText primary="Inbox" />
            </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />

            </List>
        </div>
    );
}

ListDividers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers);
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        overflow: "auto",
        margin: 'auto',
        height: '150px',
    },
});

class CheckboxList extends React.Component {
    state = {
        checked: [0],
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List>
                    <Typography variant="h6"> Рабочие группы</Typography>
                    {['Бухгалтерия', 'Разработка'].map(value => (
                        <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                            <Checkbox
                                checked={this.state.checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={`${value}`} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

CheckboxList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);