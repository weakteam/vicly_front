import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {observer} from "mobx-react";
import AttachmentSmall from "./AttachmentSmall";
import Attachment from "../../store/models/Attachment";
import Slide from "@material-ui/core/Slide";
import {Avatar, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/es/Divider/Divider";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close"
import ThreadSendMessageBar from "./ThreadSendMessageBar";
import '../../css/scrollbar.css'

const styles = theme => ({
    position: {
        position: 'absolute',
        zIndex: 1,
        width: 300,
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 10px);',
            top: 120,
            right: 0,
            left: 5,
        },
        right: 15,
        bottom: 62,
        top: 66,
        borderRadius: '5px 5px 5px 5px',
        boxShadow: ` ${
            theme.palette.type === 'light' ? 'inset 0 -3px 0px 0px #9f9f9f3b' : 'inset 0 -3px 0px 0px #22222291'
            }`,
        height: 'auto',
        // width: '100%',
        backgroundColor: ` ${
            theme.palette.type === 'light' ? '#fff' : theme.palette.primary.darkSecondary
            }`,
        // display: 'inline-flex',
        alignItems: 'start',
        justifyContent: 'center'
    },
    closeIcon: {
        color: ` ${
            theme.palette.type === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
            }`,
        cursor: 'pointer',
    },
    headerBlock: {
        backgroundColor: ` ${
            theme.palette.type === 'light' ? 'rgb(249, 249, 249)' : 'rgb(127, 172, 147)'
            }`,
        borderBottom: ` ${
            theme.palette.type === 'light' ? '1px solid #cacaca' : '1px solid #cacaca'
            }`,
        //height: 85,
        width: '100%',
        display: 'flex',
        alignItems: 'start',
        borderRadius: '5px 5px 0px 0px',
    },
});

@observer
class ThreadWindow extends React.Component {
    state = {
        messageText: ""
    };

    render() {
        const {classes, theme} = this.props;
        return (
            <div className={classes.position}>
                <div className={classes.headerBlock}>
                    <Typography variant="h6" style={{padding: 10}}>Ответы</Typography>
                    <IconButton style={{marginLeft: 'auto'}} onClick={this.props.handleMenuClose}>
                        <Close className={classes.closeIcon}/>
                    </IconButton>
                </div>
                <div className="scrollbar" id="style-3" style={{marginBottom: 0, overflow: "auto",   webkitOverflowScrolling: 'touch',  height: '100%', position: 'absolute', bottom: 0, zIndex: -1}}>
                <div style={{overflow: "hidden", paddingBottom: 54, paddingTop: 52}}>
                    <div style={{display: 'flex', alignItems: 'start', padding: 10}}>
                        <Avatar style={{marginTop: 6}}>qq</Avatar>
                        <div style={{marginLeft: 10}}>
                            <Typography variant="h6" style={{fontSize: '1.05rem'}}>Вася Петичкин</Typography>
                            <Typography variant="h6" style={{fontSize: '0.75rem'}}>
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                            </Typography>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="caption" style={{marginLeft: 5, minWidth: 80}}>1 ответ</Typography>
                        <Divider style={{width: 'calc(100% - 85px)'}}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'start', padding: 10, marginLeft: 10}}>
                        <Avatar style={{marginTop: 6}}>vv</Avatar>
                        <div style={{marginLeft: 10}}>
                            <Typography variant="h6" style={{fontSize: '0.9rem'}}>Петр Иванович</Typography>
                            <Typography variant="h6" style={{fontSize: '0.75rem'}}>
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                                Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения
                            </Typography>
                        </div>
                    </div>
                </div>
                </div>
                <ThreadSendMessageBar/>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(ThreadWindow);