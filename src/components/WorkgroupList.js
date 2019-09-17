import React, {Component} from "react";
import Workgroup from "./Workgroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import rootStore from "../store/RootStore";
import {observer} from "mobx-react";

const {accountStore, messagesStore} = rootStore;

const styles = {
    load: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: 'inherit',

    }
};

@observer
class WorkgroupList extends Component {

    constructor(props) {
        super(props);
        this.accountStore = accountStore;
        this.messagesStore = messagesStore;
        // this.handleLogoutFunc = this.accountStore.unauth.bind(accountStore);
    }

    render() {
        const {classes} = this.props;
        if (this.messagesStore.searchActive) {
            if (this.messagesStore.foundedGroups.length) {
                return this.messagesStore.foundedGroups.map(
                    workgroup =>
                        <Workgroup
                            key={workgroup.id}
                            handleDrawerToggleForMob={this.props.handleDrawerToggle}
                            workgroup={workgroup}
                            userChatsNew={this.messagesStore.foundedUserChats.filter(userChat => userChat.groupId === workgroup.id)}
                            groupChatsNew={this.messagesStore.foundedGroupChats.filter(groupChat => groupChat.groupId === workgroup.id)}
                        />
                )
            } else {
                return <Typography>Nothing found!</Typography>
            }
        } else {
            if (this.messagesStore.groups.length) {
                return this.messagesStore.groups.map(
                    workgroup =>
                        <Workgroup
                            key={workgroup.id}
                            handleDrawerToggleForMob={this.props.handleDrawerToggle}
                            workgroup={workgroup}
                            userChatsNew={this.messagesStore.userChatsNew.filter(userChat => userChat.groupId === workgroup.id)}
                            groupChatsNew={this.messagesStore.groupChatsNew.filter(groupChat => groupChat.groupId === workgroup.id)}
                        />
                )

            } else {
                return (
                    <div className={classes.load}>
                            <CircularProgress/>
                    </div>
                )
            }
        }
    }
}

export default withStyles(styles, {index: 1})(WorkgroupList);
