import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import rootStore from "../store/RootStore";
import {observer} from "mobx-react";
import Loyalty from "@material-ui/icons/Loyalty"
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";

const {accountStore, messagesStore} = rootStore;


const stylesUser = theme => ({
    root: {
        // zIndex: 1300,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        justifyContent: 'center',
        // padding: 30,
        boxShadow: theme.shadows[0],
        // paddingBottom: 10,
        backgroundColor: '',
    },
    headerBlock: {
        /* backgroundColor: ` ${
             theme.palette.type === 'light' ? 'rgb(160, 89, 89)' : 'rgb(160, 89, 89)'
             }`,*/
        //height: 85,
        // width: '100%',
        // padding: 18,
        display: 'flex',
        alignItems: 'start',
        borderRadius: '5px 5px 0px 0px',
    },
    header: {
        textAlign: 'start',
        fontSize: '1em',
        marginLeft: 10,
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.dark
            }`,
    },
    fixWidth: {
        padding: 13,
        display: 'flex',
        // alignItems: 'center',
    },
    userName: {
        marginLeft: 10,
    },
    userName1: {
        fontSize: '1.4rem',
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.dark
            }`,
        marginBottom: 5,
    },
    role: {
        fontSize: '1rem',
        color: ` ${
            theme.palette.type === 'light' ? '#fff' : '#a7b6ce'
            }`,
    },
    message2: {
        // fontSize: '0.9rem'
    },
    text2: {
        marginLeft: 'auto',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        fontSize: '0.95rem',
    },
    infBlock: {
        display: 'flex',
        marginTop: 30,
    },
    infBlockFirst: {
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        fontSize: '0.95rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        marginBottom: 5,
    },
    block: {
        width: '100%'
    },
    blockForm: {
        //display: 'flex',
        alignItems: 'flex-start',
        padding: 13,
    },
    form: {
        boxShadow: '0 -2px 10px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '0px 0px 5px 5px',
        width: '100%', // Fix IE 11 issue.
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
    },
    textInf: {
        // marginBottom: 30,
        fontSize: '1em',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    textPassword: {

        textAlign: 'end',
    },
    kek: {
        '&:hover': {
            backgroundColor: '#000',
            borderRadius: '50%',
            zIndex: 2
        },
    },
    avatar: {
        width: 75,
        height: 75,
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
            }`,
        cursor: 'pointer',
    },
    cssLabel: {
        color: ` ${
            theme.palette.type === 'light' ? '#b5b5b5' : theme.palette.secondary.dark
            }`,
        '&$cssFocused': {
            color: "#4a4a4a",
        },
    },
    cssFocused: {},
    cssUnderline: {
        /*  '&:hover': {
              borderBottom: '2px solid red',
          },*/
        '&:before': {
            borderBottomColor: '#4a4a4a',
            borderBottom: '1px solid #cacaca!important'
        },
        '&:after': {
            borderBottomColor: '#639ba0',
        },
    },
    baseRoot: {
        color: '#16777f',
    },
    userAvatar: {
        width: 40,
        height: 40,
    },
    nameUser: {
        fontSize: '1.1rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    userRole: {
        color: ` ${
            theme.palette.type === 'light' ? '#a5a3a3' : theme.palette.secondary.dark
            }`,
    },
    checkboxRoot: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    signIn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    submit: {
        width: '30%',
        marginBottom: 12,
        boxShadow: theme.shadows[0],
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#9d5757' : '#9d5757'
            }`,
        color: '#fff',
        '&:hover': {
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#5A2C2C' : '#5A2C2C'
                }`,
        },
    },
    checkedBox: {
        color: '#9a5656!important',
    },
});

function UserCheckboxNonStyled(props) {
    const {classes, user, checked, handleUserToggle} = props;
    function onCheck(event) {
        handleUserToggle([user.id]);
    }
    return (
        <div style={{display: 'flex', paddingBottom: 10,}}>
            <Avatar className={classes.userAvatar}>
                {user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()}
            </Avatar>
            <div style={{marginLeft: 10}}>
                <Typography variant="h5"
                            className={classes.nameUser}>{user.first_name + " " + user.last_name}</Typography>
                <Typography variant="caption"
                            noWrap
                            className={classes.userRole}>({user.position ? user.position : 'Должность не указана'})</Typography>
            </div>
            <Checkbox
                onChange={onCheck}
                value={'b'}
                color="primary"
                style={{marginLeft: 'auto'}}
                classes={{
                    root: classes.checkboxRoot,
                    checked: classes.checkedBox,
                }}
            />
        </div>
    )
}

const UserCheckbox = withStyles(stylesUser)(UserCheckboxNonStyled);

const styles = theme => ({
    groupName: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        fontSize: '0.9rem'
    },
    icon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        marginRight: 12,
    },
    root: {

        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#e6e6e6' : '#40485d'
            }`,
    },
    gutters: {
        paddingTop: 6,
        paddingBottom: 6,
        padding: 0,
    },

    badge: {
        marginLeft: 10,
    },
    workgroupName: {
        display: 'flex',
        alignItems: 'center'
    },
    infBlockFirst: {
        display: 'flex',
        alignItems: 'center'
    },
    WorkGroupBack: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : '#2b3346'
            }`,

    },
});

@observer
class NewChatUsers extends React.Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
    }

    workGroupColor = (letter) => {
        let col = this.colorMap[letter];
        if (col) return col;
    };

    colorMap = {
        "t": "#009bed",
        "Б": "#6aa8b4",
        "И": "#9e72cf"

    };

    render() {
        const {classes, theme, workgroup, userChatsNew} = this.props;
        const lol = workgroup.name;
        let wcolor = lol.charAt(0);
        let colorName = this.workGroupColor(wcolor);

        return (
            <div className={classes.WorkGroupBack}>
                <ListItem disableGutters button onClick={this.handleClick} className={classes.groupName}>
                    <ListItem disableGutters classes={{
                        root: classes.gutters,
                    }}>
                        <div className={classes.workgroupName}>
                            <Typography variant='button' className={classes.text}>
                                {workgroup.name}
                            </Typography>
                            <Loyalty style={{color: `${colorName}`}} className={classes.badge}/>
                        </div>
                    </ListItem>
                    {this.state.open ? <ExpandLess className={classes.icon}/> : <ExpandMore className={classes.icon}/>}
                </ListItem>
                <Collapse style={{paddingTop: 10}} in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.active} >
                        {
                            userChatsNew.map(
                                userChat =>
                                    <UserCheckbox
                                        handleUserToggle={this.props.handleUserToggle}
                                        checked={this.props.checked.includes(userChat.user.id)}
                                        user={userChat.user}
                                    />
                            )
                        }
                    </List>
                </Collapse>
               <Divider classes={{root: classes.root}}/>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(NewChatUsers);