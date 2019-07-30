import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

class LoadingMessage extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
            <CircularProgress/>
                <Typography variant="overline">Идет загрузка</Typography>
            </div>
        );
    }
}

const style = {
    center: {
     /*   display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      // width: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
      //  height: '100%',
        right: 0,*/

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
                <div >
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

                </div>
            )
        }
    };
}

export default withSplashScreen;