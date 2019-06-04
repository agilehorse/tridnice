import React from 'react';
import MainContent from "./components/core/MainContent";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import ContainerWithMenu from "./components/reusables/ContainerWithMenu";
import styles from './resources/styles/Styles'
import {withStyles} from "@material-ui/core";
import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import config from "./config";
import history from "./components/history";

class App extends ContainerWithMenu
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: {
                id: '',
                userType: '',
                userName: '',
                loggedIn: !!localStorage.getItem('token'),
            },
            loading: true,
        };
    }

    componentDidMount()
    {
        const myToken = localStorage.getItem('token');
        if (myToken)
        {
            fetch(config.url + "/login/authenticate", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: myToken}),
            })
                .then((response) =>
                {
                    console.log(response);
                    if (response.status === 200)
                    {
                        response.json().then(data =>
                        {
                            console.log(data);
                            this.setState({
                                data: {
                                    id: data.id,
                                    userType: data.role,
                                    userName: `${data.lastName} ${data.firstName}`,
                                    loggedIn: true,
                                },
                                loading: false,
                            });
                        });
                    } else
                    {
                        this.logout()
                    }
                })
                .catch((e) =>
                    {
                        console.log(e);
                    }
                );
        } else {
            this.logout()
        }
    }

    logout = () =>
    {
        console.log('logout');
        localStorage.removeItem('token');
        this.setState({
            data: {
                id: '',
                userType: '',
                userName: '',
                loggedIn: false,
            },
            loading: false,
        });
        history.push('/login')
    };

    logUser = (data) =>
    {
        console.log(data[0]);
        this.setState({
            data: {
                id: data[0],
                userType: data[1],
                userName: data[2],
                loggedIn: true,
            }
        });
    };

    render()
    {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Header
                        menuVisible={this.state.menuVisible}
                        logout={this.logout}
                        handleToggle={this.handleToggle}
                        data={this.state.data}
                    />
                    <MainContent
                        className={classes.main}
                        handleToggle={this.handleToggle}
                        menuVisible={this.state.menuVisible}
                        logout={this.logout}
                        logUser={this.logUser}
                        data={this.state.data}
                        loading={this.state.loading}
                    />
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2e7d32",
        },
        secondary: {
            main: "#f44336",
        },
        typography: {
            useNextVariants: true,
        },
    },
});


export default withStyles(styles)(App);
