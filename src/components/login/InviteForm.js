import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid/Grid";
import {observer} from "mobx-react";
import accountStore from "../../store/AccountStore";
import {Link} from "react-router-dom";
import Background from "../../images/login.jpg";
import {fade} from "@material-ui/core/styles/colorManipulator";
import Divider from "@material-ui/core/es/Divider";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
    root: {
        display: 'flex',
        top: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {},
        [theme.breakpoints.down('xs')]: {
            minHeight: '100%',
        },
        backgroundSize: 'cover',
        backgroundImage: 'url(' + Background + ')',
        backgroundColor: theme.palette.primary.main,
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
        justifyContent: 'center',
       // padding: 30,
        boxShadow: theme.shadows[0],
       // paddingBottom: 10,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 15,
    },
    submit: {
        width: 300,
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#122031',
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
        backgroundColor: 'rgb(234, 234, 234)',
        height: 30,
        paddingLeft: 10,
    },
    label: {
        display: 'flex',
        alignItems: 'center',
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
        marginBottom: 10
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

                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.header}>
                            Приглашение нового пользователя
                        </Typography>
                        <Divider/>
                        <form onSubmit={this.handleSubmit.bind(this)} className={classes.form}>
                            <div className={classes.blockForm}>
                                <div className={classes.block}>
                                    <Typography variant="h6">Личные данные </Typography>
                                    <FormControl required fullWidth>
                                        <InputLabel shrink className={classes.label}>
                                            <Typography variant="subtitle1"> Имя </Typography>
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
                                            <Typography variant="subtitle1"> Фамилия </Typography>
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
                                            <Typography variant="subtitle1"> Отчество </Typography>
                                        </InputLabel>
                                        <InputBase
                                            id="patronymic"
                                            name="patronymic"
                                            type="еуче"
                                            classes={{input: classes.active}}
                                        />
                                    </FormControl>
                                </div>

                                <div className={classes.block}>
                                    <Typography variant="h6">Корпоративная информация</Typography>
                                    <FormControl required fullWidth>
                                        <InputLabel shrink className={classes.label}>
                                            <Typography variant="subtitle1"> Должность </Typography>
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
                                            <Typography variant="subtitle1"> Пол </Typography>
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
                                                control={<Radio color="primary"/>}
                                                label="Женский"
                                                labelPlacement="start"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio color="primary"/>}
                                                label="Мужской"
                                                labelPlacement="start"
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <form autoComplete="off">

                                    <FormControl required fullWidth>
                                        {/*<InputLabel shrink className={classes.label}>
                                            <Typography variant="subtitle1"> Рабочая группа </Typography>
                                        </InputLabel>*/}
                                        <InputLabel htmlFor="age-simple">Рабочая группа</InputLabel>
                                        <Select
                                            value={this.state.kek}
                                            onChange={this.handleChangeSelect}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}
                                        >
                                            <MenuItem value={0}>
                                                <em>Не выбрано</em>
                                            </MenuItem>
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
                                    component={props => <Link to="/login" {...props} />}>
                                    Пригласить
                                </Button>
                            </div>
                        </form>
                    </Paper>
        );
    }


}

export default withStyles(styles)(InviteForm);