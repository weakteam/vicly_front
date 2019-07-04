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
import Tooltip from "@material-ui/core/Tooltip";
import Message from "./ChatCommon/Message";
import Workgroup from "./Workgroup";
import CircularProgress from "@material-ui/core/CircularProgress";

const {accountStore, messagesStore} = rootStore;

const styles = theme => ({
    root: {
        /*backgroundColor: ` ${
            theme.palette.type === 'light' ? '#5662a0' : '#2e374c'
            }`,*/
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
        borderRadius: 0,
        padding: 30,
        [theme.breakpoints.down('xs')]: {
            padding: 9,
        },
        flexDirection: 'column',
        // borderRadius: 0,
        justifyContent: 'center',
        // padding: 30,
        boxShadow: '0 -2px 10px 0px rgba(0, 0, 0, 0.15)',
        // paddingBottom: 10,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        //marginTop: 15,
    },
    submit: {
        width: '100%',
        boxShadow: theme.shadows[0],
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#679dbd' : '#2e374c'
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
        fontSize: '1.2rem',
        // marginBottom: 10,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
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
    link: {
        fontSize: '1.1rem',
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
    },
    link2: {

        color: '#fff',
        padding: 10,
    },
    backi: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#e8e8e8' : 'rgb(59, 69, 93)'
            }`,
    },
    paperRoot: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#f6f6f6' : '#171b26'
            }`,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,

        padding: 30,
        [theme.breakpoints.down('xs')]: {
            padding: 9,
        },
        borderRadius: '0 0 5px 5px',
        // paddingTop: 20
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
        //  marginTop: 10,
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
        padding: '0 0 15px 0',
    },
    labelPlace: {
        marginLeft: 0,
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
            }`,
        cursor: 'pointer',
    },
    rootIndex: {
        zIndex: 1304,
    },
    inputRoot: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '95%',
        color: "#fff",
        paddingLeft: 8,
        cursor: 'pointer',
    },
    inputMain: {
        cursor: 'pointer',
    },
    disabledColor: {
        color: '#fff',
    },
    lightTooltip: {
        marginTop: 3,
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#bebebe' : '#49519b'
            }`,
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark
            }`,
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    formColor: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : '#1c212d'
            }`,
        padding: 20,
    },
    selectedCustom: {
        backgroundColor: '#679dbd!important',

    },
    newInvite: {
        cursor: 'pointer',
    },
    headerBar: {
        borderRadius: '5px 5px 0 0',
        backgroundColor: '#679dbd',
        display: 'flex',
        alignItems: 'center',
        padding: '15px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 9px',
        },
    },
});

@observer
class InviteForm extends React.Component {

    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
    }

    state = {
        value: 'male',
        workGroup: null,
        activeStep: 0,
        copied: false,

        formValues: {
            name: '',
            surname: '',
            patronymic: '',
            role: '',
        },
        err: false,
        inviteId: null,
    };

    copyToClipboard = () => {
        let link = document.getElementById("linked");
        link.select();
        let lol = document.execCommand('copy');

        if (lol) {
            this.setState({
                copied: true,
            });
        }

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

    createInvite(name, surname, patronymic, position, workgroup) {
        let data = {
            first_name: name,
            last_name: surname,
            group_id: workgroup,
        };
        if (patronymic) {
            data.surname = patronymic
        }
        if (position) {
            data.position = position
        }

        fetch(BACKEND_URL + "/invite", {
            method: 'POST',
            headers: {
                'Authorization': this.accountStore.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
        this.createInvite(this.state.formValues.name, this.state.formValues.surname, this.state.formValues.patronymic, this.state.formValues.role, this.state.workGroup);

    };

    firstStepForm = () => {
        const {classes} = this.props;
        const workGroup = this.messagesStore.groups.map(workgroup => <MenuItem
            classes={{selected: classes.selectedCustom,}}
            value={workgroup.id}>
            <Typography>{workgroup.name}</Typography>
        </MenuItem>);
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {/*  <Divider/>*/}
                    <Typography variant="overline" style={{marginBottom: 20, fontSize: '1em'}} className={classes.text}>Введите
                        личные данные</Typography>
                    <form onSubmit={this.handleClick} className={classes.form}>
                        <div className={classes.blockForm}>
                            <div className={classes.block}>

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
                                             fullWidth>
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

                            <div style={{marginRight: 0}} className={classes.block}>
                                <FormControl classes={{
                                    fullWidth: classes.controlForm,
                                }}
                                             fullWidth>
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
                                    style={{marginTop: 4}} fullWidth>
                                    {/*<InputLabel shrink className={classes.label}>
                                            <Typography variant="subtitle1"> Рабочая группа </Typography>
                                        </InputLabel>*/}
                                    <InputLabel shrink className={classes.label}>
                                        <Typography variant="subtitle1" className={classes.text}> Рабочая
                                            группа </Typography>
                                    </InputLabel>
                                    <Select
                                        classes={{
                                            root: classes.rootIndex,
                                        }}
                                        className={classes.text}
                                        value={this.state.workGroup}
                                        onChange={this.handleChangeSelect}>

                                        {workGroup}
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
                                <Typography style={{textAlign: 'center'}} variant="overline" color={"error"}>Не удалось
                                    создать
                                    приглашение</Typography>
                            ) : ""
                    }

                </Paper>
            </div>
        )
    };

    secondStepForm = () => {
        const {classes, theme,} = this.props;
        return (
            <div className={classes.formColor}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant="body1" className={classes.link}>Ссылка для
                        приглашения:</Typography>
                    <Tooltip title={this.state.copied ? 'Ссылка скопирована' : 'Нажмите чтобы скопировать'}
                             classes={{tooltip: classes.lightTooltip}}>
                        <div onClick={this.copyToClipboard}
                             style={{
                                 backgroundColor: 'rgb(103, 157, 189)',
                                 borderRadius: 5,
                                 marginLeft: 10,
                                 overflow: 'hidden',
                                 width: '100%',
                             }}>
                            <InputBase
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputMain,
                                    disabled: classes.disabledColor,
                                }}

                                id="linked"
                                type="text"
                                value={"http://localhost:3000/login/invite/" + (this.state.inviteId != null ? this.state.inviteId.invite_id : 'noneInvite')}/>
                        </div>
                    </Tooltip>

                </div>
                <div className={classes.signIn}>
                    <div className={classes.newInvite}
                         onClick={this.handleReset}><Typography variant="button" style={{color: 'rgb(131, 131, 131)'}}>Новое
                        приглашение</Typography>
                    </div>
                </div>

            </div>
        )
    };

    render() {
        const {classes, theme,} = this.props;
        const steps = ["Создание", "Приглашение"];
        return (
            <div>
                <div className={classes.headerBar}>
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
               {/* <Divider style={{height: 0.9}}/>*/}
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