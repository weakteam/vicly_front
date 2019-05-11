import React, {Component} from 'react';
import logo from "../images/icon512.png";
import {withStyles} from "@material-ui/core";

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
            if (this.state.loading) return <Loading/>;

            // otherwise, show the desired route
            return <WrappedComponent {...this.props} />;
        }
    };
}

export default withSplashScreen;