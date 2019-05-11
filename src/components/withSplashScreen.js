import React, {Component} from 'react';
import logo from "../images/icon192.png";
import {withStyles} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";

class LoadingMessage extends React.Component {
    render() {
        return (
            <div>
                <img className={this.props.classes.center} src={logo}/>
            </div>
        );
    }
}

const style = {
    center: {
        display: "block",
        marginBottom: "auto",
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        verticalAlign: "middle"
    }
};

const Loading = withStyles(style)(LoadingMessage);

function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            };
        }

        async componentDidMount() {
            try {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 1500)
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                });
            }
        }

        render() {
            // while checking user session, show "loading" message


            // otherwise, show the desired route
            return (
                <>
                    <Slide direction="up" mountOnEnter unmountOnExit in={this.state.loading} timeout={{
                        appear: 500,
                        enter: 300,
                        exit: 0,
                    }}>
                        <Loading/>
                    </Slide>
                    <Slide appear={true} direction="down" mountOnEnter unmountOnExit in={!this.state.loading} timeout={{
                        appear: 500,
                        enter: 300,
                        exit: 500,
                    }}>
                        <WrappedComponent {...this.props} />
                    </Slide>

                </>
            )
        }
    };
}

export default withSplashScreen;