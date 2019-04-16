import React from 'react';
import Button from '@material-ui/core/Button/index';
import FormControl from '@material-ui/core/FormControl/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography/index';
import withStyles from '@material-ui/core/styles/withStyles';
import {observer} from "mobx-react/index";
import {fade} from "@material-ui/core/styles/colorManipulator";
import Divider from "@material-ui/core/es/Divider/index";
import InputBase from "@material-ui/core/InputBase/index";
import Select from "@material-ui/core/Select/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import Stepper from "@material-ui/core/Stepper/index";
import StepLabel from "@material-ui/core/StepLabel/index";
import Step from "@material-ui/core/Step/index";
import {BACKEND_URL} from "../common";
import rootStore from "../store/RootStore";
import {IconButton} from "@material-ui/core";
import Close from "@material-ui/icons/Close"
import Modal from "@material-ui/core/Modal";

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    root: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#5662a0' : '#2e374c'
            }`,
      //  zIndex: 10000,
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
        width: '100%',
        boxShadow: theme.shadows[0],
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#74ada6' : '#2e374c'
            }`,
        color: '#fff',
        '&:hover': {
            backgroundColor: ` ${
                theme.palette.type === 'light' ? '#4c847d' : '#3e4b67'
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
        marginTop: 23,
        borderRadius: 6,
        height: 27,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#f5f5f5' : 'rgb(59, 69, 93)'
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
        textAlign: 'start',
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
        width: '60%',
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
        color: '#000',
        marginTop: 23,
        //  height: 40,
    },
    text: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        zIndex: 1303,
    },
    backi: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#e8e8e8' : 'rgb(59, 69, 93)'
            }`,
    },
    paperRoot: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : '#1c212d'
            }`,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        padding: 0,
        paddingTop: 20
    },
    labelRoot: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark + '!important'
            }`,
    },
    completed: '#79cc9f!important',

    checked: {
        '&:not($checked)': {
            color: '#000000',
        },
        '&$checked': {
            color: '#43a296',
        },
    },
    controlForm: {
        marginTop: 10,
    },
    labelPlace: {
        marginLeft: 0,
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        cursor: 'pointer',
    },
    rootIndex: {
        zIndex: 1304,
    },
});

@observer
class InviteForm extends React.Component {

    constructor(props) {
        super(props);
        this.accountStore = accountStore;
    }

    state = {
        value: 'male',
        workGroup: '',
        activeStep: 0,

        formValues: {
            name: '',
            surname: '',
            patronymic: '',
            role: '',
        },
        err: false,
        inviteId: null,
    };

    handleReset = () => {
        this.setState({
            formValues: {},
            activeStep: 0,
            workGroup: '',
            inviteId: null,
        })
    };

    handleChange = (event) => {
        this.setState({
            value: event.value,
        });
    };

    handleChangeSelect = (event) => {
        this.setState({
            workGroup: event.target.value,
        });
    };

    getStepContent(step) {
        switch (step) {
            case 0:
                return this.firstStepForm();
            case 1:
                return this.secondStepForm();
            default:
                return "";
        }
    }

    handleChangeStep = () => {
        this.setState({
            activeStep: 1
        });
    };

    createInvite(name, surname, role) {
        fetch(BACKEND_URL + "/invite", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: name,
                last_name: surname,
                role_id: role,
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    inviteId: json
                });
                console.log("Invite created");
                this.handleChangeStep();
            })
            .catch((err) => {
                this.setState({
                    err: true,
                });
                console.log("Invite doesn't created")
            });
    }


    handleChange1 = (event) => {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        formValues[name] = event.target.value;

        this.setState({formValues})
    };


    handleClick = (event) => {
        event.preventDefault();
        this.createInvite(this.state.formValues.name, this.state.formValues.surname, this.state.formValues.role);

    };

    firstStepForm = () => {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Divider/>
                    <form onSubmit={this.handleClick} className={classes.form}>
                        <div className={classes.blockForm}>
                            <div className={classes.block}>
                                <Typography variant="h6" className={classes.text}>Данные</Typography>
                                <FormControl classes={{
                                    fullWidth: classes.controlForm,
                                }}
                                             required fullWidth classesName={classes.controlForm}>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Имя </Typography>
                                    </InputLabel>
                                    <InputBase
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={this.state.formValues["name"]}
                                        onChange={this.handleChange1.bind(this)}
                                        classes={{input: classes.active}}
                                    />
                                </FormControl>
                                <FormControl classes={{
                                    fullWidth: classes.controlForm,
                                }}
                                             required fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Фамилия </Typography>
                                    </InputLabel>
                                    <InputBase
                                        id="surname"
                                        name="surname"
                                        type="text"
                                        value={this.state.formValues["surname"]}
                                        onChange={this.handleChange1.bind(this)}
                                        classes={{input: classes.active}}
                                    />
                                </FormControl>
                                <FormControl classes={{
                                    fullWidth: classes.controlForm,
                                }}
                                             required fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Отчество </Typography>
                                    </InputLabel>
                                    <InputBase
                                        id="patronymic"
                                        name="patronymic"
                                        type="text"
                                        value={this.state.formValues["patronymic"]}
                                        onChange={this.handleChange1.bind(this)}
                                        classes={{input: classes.active}}
                                    />
                                </FormControl>
                            </div>

                            <div style={{marginTop: 27}} className={classes.block}>
                                <FormControl classes={{
                                    fullWidth: classes.controlForm,
                                }}
                                             required fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1"
                                                    className={classes.text}>Должность
                                        </Typography>
                                    </InputLabel>
                                    <InputBase
                                        id="role"
                                        name="role"
                                        type="text"
                                        value={this.state.formValues["role"]}
                                        onChange={this.handleChange1.bind(this)}
                                        classes={{input: classes.active}}/>
                                </FormControl>

                                {/*<FormControl
                                    classes={{
                                        fullWidth: classes.controlForm,
                                    }}
                                    required
                                    fullWidth>
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Пол </Typography>
                                    </InputLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender2"
                                        classes={{
                                            root: classes.group,
                                            checked: classes.checked,
                                            labelPlacementStart: classes.labelPlace
                                        }}
                                        //className={classes.group}
                                        value={this.value}
                                        onChange={this.handleChange}>
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio classes={{
                                                root: classes.checked,
                                            }} className={classes.text}/>}
                                            label="Женский"
                                            classes={{
                                                label: classes.text,
                                                checked: classes.checked,
                                            }}
                                            // labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio classes={{root: classes.checked}}
                                                            className={classes.text}/>}
                                            label="Мужской"
                                            classes={{
                                                label: classes.text,
                                                checked: classes.checked,
                                            }}
                                            //labelPlacement="start"
                                        />
                                    </RadioGroup>
                                </FormControl>*/}

                                <FormControl
                                    classes={{
                                        root: classes.rootIndex,
                                    }}
                                    style={{marginTop: 25}} required fullWidth>
                                    {/*<InputLabel shrink className={classes.label}>
                                            <Typography variant="subtitle1"> Рабочая группа </Typography>
                                        </InputLabel>*/}
                                    <InputLabel className={classes.text} htmlFor="age-simple">Рабочая
                                        группа</InputLabel>
                                    <Select
                                        classes={{
                                            root: classes.rootIndex,
                                        }}
                                        className={classes.text}
                                        value={this.state.workGroup}
                                        onChange={this.handleChangeSelect}>
                                        <MenuItem value={0}>Не выбрано</MenuItem>
                                        <MenuItem value={'Разработка'}>Разработка</MenuItem>
                                        <MenuItem value={'Бухгалтерия'}>Бухгалтерия</MenuItem>
                                        <MenuItem value={'Реклама'}>Реклама</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className={classes.signIn}>
                            <Button type="submit" variant="contained" className={classes.submit}>Пригласить</Button>
                        </div>
                    </form>
                    {
                        this.state.err ?
                            (
                                <Typography color={"error"}>ERRRRRRRRROOOOOOOOOOOOOOOOOOOOOR</Typography>
                            ) : ""
                    }

                </Paper>
            </div>
        )
    };

    secondStepForm = () => {
        const {classes, theme,} = this.props;
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" className={classes.text}>Ссылка для приглашения: </Typography>
                    <Typography
                        variant="caption"> http://localhost:3000/login/invite/{this.state.inviteId != null ? this.state.inviteId.invite_id : ''}</Typography>
                </div>
                <div className={classes.signIn}>
                    <Button variant="contained" className={classes.submit}
                            onClick={this.handleReset}>Новый инвайт</Button>
                </div>
            </div>
        )
    };

    render() {
        const {classes, theme,} = this.props;
        const steps = ["Создание", "Приглашение"];
        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                <Typography variant="h5" className={classes.header}>
                    Приглашение пользователя
                </Typography>
                <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleClose}>
                    <Close className={classes.closeIcon}/>
                </IconButton>
                </div>
                <div>
                    {this.getStepContent(this.state.activeStep)}
                </div>
                <Stepper
                    classes={{
                        root: classes.paperRoot,
                    }}
                    activeStep={this.state.activeStep}>
                    {
                        steps.map((label) => {
                            return (
                                <Step key={label} classes={{
                                    active: classes.labelRoot,
                                }}>
                                    <StepLabel classes={{
                                        label: classes.labelRoot,
                                        completed: classes.completed,
                                        active: classes.labelRoot,
                                    }}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })
                    }
                </Stepper>


            </div>
        );
    }
}

export default withStyles(styles)(InviteForm);