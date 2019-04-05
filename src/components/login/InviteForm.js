import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {fade} from "@material-ui/core/styles/colorManipulator";
import Divider from "@material-ui/core/es/Divider";
import InputBase from "@material-ui/core/InputBase";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
    root: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#5662a0' : '#2e374c'
            }`,
        zIndex: 10000,
    },
    radio: {
        display: 'flex'
    },
    main: {
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.down('xs')]: {
            maxWidth: '80%',
        },
        /*[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
        },*/
        boxShadow: theme.shadows[10],
        maxWidth: '50%',
        // maxHeight: '40%',

    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        justifyContent: 'center',
        // padding: 30,
        boxShadow: theme.shadows[0],
        // paddingBottom: 10,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 15,
    },
    submit: {
        width: 300,
        boxShadow: theme.shadows[0],
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#5662a0' : '#2e374c'
            }`,
        color: '#fff',
        '&:hover': {
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#2e374c' : '#3e4b67'
                }`,
        },
    },
    invite: {
        boxShadow: theme.shadows[0],
        '&:hover': {
            backgroundColor: 'rgba(118,132,255,0.11)',
        },
    },
    active: {
        '&:focus': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('#9cabef', 0.25)} 0 0 0 0.2rem`,
        },
        '&:selected': {
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            boxShadow: `${fade('#ff2f00', 0.25)} 0 0 0 0.2rem`,
        },
        marginTop: 19,
        borderRadius: 10,
        height: 30,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#e8e8e8' : 'rgb(59, 69, 93)'
            }`,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        paddingLeft: 10,
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    password: {
        marginTop: 10,
    },
    remember: {
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: 10,
    },
    checkbox: {
        padding: 0,
        marginRight: 5
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
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
    inviteBut: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 7
    },
    block: {
        marginBottom: 10,
        marginRight: 20,
    },
    blockForm: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    formControl: {
        margin: 10,
    },
    group: {
        display: 'inline',
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    backi: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#e8e8e8' : 'rgb(59, 69, 93)'
            }`,
    },

});

@observer
class InviteForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.login.value + "  " + e.target.password.value);
        //const { login, password } = this.state;
        //accountStore.loginUser(e.target.login.value, e.target.password.value);
        //this.props.setLoading();
    };

    state = {
        value: 'male',
        kek: '',
    };

    handleChange = (event) => {
        this.setState(state => ({
            value: event.value,
        }));
    };

    handleChangeSelect = (event) => {
        this.setState({
            kek: event.target.value,
        });
    };

    toLoginPage = (isInvite) => {
        this.props.history.push('/login')
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.header}>
                        Приглашение нового пользователя
                    </Typography>
                    <Divider/>
                    <form onSubmit={this.handleSubmit.bind(this)} className={classes.form}>
                        <div className={classes.blockForm}>
                            <div className={classes.block}>
                                <Typography variant="h6" className={classes.text}>Личные данные</Typography>
                                <FormControl required fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Имя </Typography>
                                    </InputLabel>
                                    <InputBase
                                        id="Name"
                                        name="Name"
                                        type="text"
                                        classes={{input: classes.active}}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Фамилия </Typography>
                                    </InputLabel>
                                    <InputBase
                                        id="Surname"
                                        name="Surname"
                                        type="text"
                                        classes={{input: classes.active}}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Отчество </Typography>
                                    </InputLabel>
                                    <InputBase
                                        id="patronymic"
                                        name="patronymic"
                                        type="text"
                                        classes={{input: classes.active}}
                                    />
                                </FormControl>
                            </div>

                            <div className={classes.block}>
                                <Typography variant="h6" className={classes.text}>Корпоративная информация</Typography>
                                <FormControl required fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1"
                                                    className={classes.text}> Должность </Typography>
                                    </InputLabel>
                                    <InputBase
                                        id="position"
                                        name="position"
                                        type="text"
                                        classes={{input: classes.active}}
                                    />
                                </FormControl>

                                <FormControl required fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Пол </Typography>
                                    </InputLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender2"
                                        classes={{
                                            root: classes.group
                                        }}
                                        //className={classes.group}
                                        value={this.value}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio className={classes.text}/>}
                                            label="Женский"
                                            classes={{
                                                label: classes.text,
                                            }}
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio className={classes.text}/>}
                                            label="Мужской"
                                            classes={{
                                                label: classes.text,
                                            }}
                                            labelPlacement="start"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <form autoComplete="off">

                                    <FormControl style={{zIndex: 5000}} required fullWidth>
                                        {/*<InputLabel shrink className={classes.label}>
                                            <Typography variant="subtitle1"> Рабочая группа </Typography>
                                        </InputLabel>*/}
                                        <InputLabel className={classes.text} htmlFor="age-simple">Рабочая
                                            группа</InputLabel>
                                        <Select
                                            className={classes.text}
                                            value={this.state.kek}
                                            onChange={this.handleChangeSelect}
                                            /*classes={{
                                                Paper: classes.backi,
                                                paper: classes.backi,
                                                root: classes.backi,
                                                MuiPaper: classes.backi,
                                            }}
                                            style={{backgroundColor: '#000'}}*/
                                        >
                                            <MenuItem value={0}>Не выбрано</MenuItem>
                                            <MenuItem value={2}>Ten</MenuItem>
                                            <MenuItem value={3}>Twenty</MenuItem>
                                            <MenuItem value={4}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>

                            </div>
                        </div>

                        <div className={classes.signIn}>
                            <Button
                                type="submit"
                                variant="contained"
                                className={classes.submit}
                                /* component={props => <Link to="/login" {...props} />}*/>
                                Пригласить
                            </Button>
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }


}

export default withStyles(styles)(InviteForm);