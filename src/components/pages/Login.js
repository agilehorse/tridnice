import React, {Component} from "react";
import CssBaseline from "@material-ui/core/CssBaseline/index";
import Paper from "@material-ui/core/Paper/index";
import Typography from "@material-ui/core/Typography/index";
import Button from "@material-ui/core/Button/index";
import {withStyles} from "@material-ui/core";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import config from "../../config";
import classNames from "classnames"
//Login page
class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            formData: {
                email: '',
                password: '',
            },
            error: '',
            loading: false,
        };
    }

    //updates state on changing content of field in login form
    handleChange = (event) =>
    {
        const {formData} = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({formData, error: ''});
    };

    componentDidMount()
    {
        let svgNs = "http://www.w3.org/2000/svg";
        const animate11 = document.createElementNS(svgNs, "animate");
        animate11.setAttribute("attributeName", "height");
        animate11.setAttribute("values", "50;10;50");
        animate11.setAttribute("begin", "0s");
        animate11.setAttribute("dur", "1s");
        animate11.setAttribute("repeatCount", "indefinite");
        const animate12 = document.createElementNS(svgNs, "animate");
        animate12.setAttribute("attributeName", "y");
        animate12.setAttribute("values", "0;20;0");
        animate12.setAttribute("begin", "0s");
        animate12.setAttribute("dur", "1s");
        animate12.setAttribute("repeatCount", "indefinite");
        const animate21 = document.createElementNS(svgNs, "animate");
        animate21.setAttribute("attributeName", "height");
        animate21.setAttribute("values", "50;10;50");
        animate21.setAttribute("begin", "0.2s");
        animate21.setAttribute("dur", "1s");
        animate21.setAttribute("repeatCount", "indefinite");
        const animate22 = document.createElementNS(svgNs, "animate");
        animate22.setAttribute("attributeName", "y");
        animate22.setAttribute("values", "0;20;0");
        animate22.setAttribute("begin", "0.2s");
        animate22.setAttribute("dur", "1s");
        animate22.setAttribute("repeatCount", "indefinite");
        const animate31 = document.createElementNS(svgNs, "animate");
        animate31.setAttribute("attributeName", "height");
        animate31.setAttribute("values", "50;10;50");
        animate31.setAttribute("begin", "0.4s");
        animate31.setAttribute("dur", "1s");
        animate31.setAttribute("repeatCount", "indefinite");
        const animate32 = document.createElementNS(svgNs, "animate");
        animate32.setAttribute("attributeName", "y");
        animate32.setAttribute("values", "0;20;0");
        animate32.setAttribute("begin", "0.4s");
        animate32.setAttribute("dur", "1s");
        animate32.setAttribute("repeatCount", "indefinite");
        let rect1 = document.querySelector("#rect1");
        rect1.appendChild(animate11);
        rect1.appendChild(animate12);
        let rect2 = document.querySelector("#rect2");
        rect2.appendChild(animate21);
        rect2.appendChild(animate22);
        let rect3 = document.querySelector("#rect3");
        rect3.appendChild(animate31);
        rect3.appendChild(animate32);
    }


    handleSubmit = () =>
    {
        // sends data to backend and verifies if it's correct
        this.setState({loading: true});
        const formData = this.state.formData;
        fetch(config.url + "/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"username": formData.email, "password": formData.password}),
        })
            .then((response) =>
            {
                // console.log(response);
                if (response.status === 200)
                {
                    response.json().then(data =>
                    {
                        // console.log(data);
                        localStorage.setItem('token', data.token);
                        this.props.logUser([data.id, data.role, `${data.lastName} ${data.firstName}`]);
                    });
                } else
                {
                    this.setState({error: 'Jméno nebo heslo je špatně.', loading: false})
                }
            })
            .catch((e) =>
                {
                    // console.log(e);
                    this.setState({error: 'Chyba na severu. Zkuste to prosím později.', loading: false})
                }
            );
    };

    render()
    {
        const state = this.state;
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <CssBaseline/>
                <Paper className={state.loading || state.error ? classes.biggerPaper : classes.paper}>
                    <ValidatorForm onSubmit={this.handleSubmit} className={classes.form}>
                        <Typography className={classes.heading} component="h1" variant="h5">
                            Login
                        </Typography>

                        {state.error && (
                            <Typography className={classes.errorHeading}>
                                {state.error}
                            </Typography>
                        )}
                        <TextValidator
                            className={classes.textField}
                            label="Email address"
                            onChange={this.handleChange}
                            name="email"
                            value={state.formData.email}
                            validators={["required", "isEmail"]}
                            errorMessages={["This field is required", "email is not valid"]}
                            variant="outlined"
                            autoFocus
                        />
                        <br/>
                        <TextValidator
                            className={classes.textField}
                            label="Password"
                            onChange={this.handleChange}
                            name="password"
                            value={state.formData.password}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            variant="outlined"
                            type="password"
                        />
                        <br/>
                        <Button
                            color="primary"
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            Přihlásit se
                        </Button>
                    </ValidatorForm>
                    <div id="progress" className={classNames(classes.progress, !this.state.loading && classes.inVisible)}>
                        <Typography
                            className={classes.loadingText}>Loading</Typography>
                        <svg id="svg" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 50 50">
                            <rect id="rect1" x="0" y="0" width="13" height="50" fill="green">
                            </rect>
                            <rect id="rect2" x="19" y="0" width="13" height="50" fill="forestgreen">
                            </rect>
                            <rect id="rect3" x="38" y="0" width="13" height="50" fill="#4CBB17">
                            </rect>
                        </svg>
                    </div>
                </Paper>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: '20vh',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        maxWidth: 700,
        maxHeight: 500,
        minHeight: 300,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        height: '60vh',
        width: '40vw',

        [theme.breakpoints.down('sm')]: {
            width: '60vw',
            height: '60vh',
        },
        [theme.breakpoints.down(600)]: {
            width: '80vw',
        },
        [theme.breakpoints.down(450)]: {
            width: '85vw',
        },
    },
    biggerPaper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        maxWidth: 700,
        maxHeight: 500,
        minHeight: 400,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        height: '60vh',
        width: '40vw',

        [theme.breakpoints.down('sm')]: {
            width: '60vw',
            height: '60vh',
        },
        [theme.breakpoints.down(600)]: {
            width: '80vw',
        },
        [theme.breakpoints.down(450)]: {
            width: '85vw',
        },
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '70%',
        justifyContent: 'center',
        [theme.breakpoints.down(400)]: {
            width: '90%',
        },
    },
    submit: {
        backgroundColor: theme.palette.primary,
        display: 'flex',
        height: '3.5em',
        fontWeight: '600',
        webkitBoxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
        mozBoxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
        boxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
    },
    heading: {
        display: 'flex',
        fontSize: "2.5em",
    },
    errorHeading: {
        display: 'flex',
        color: 'red',
        fontSize: '1em',
        marginTop: 2,
        margin: 10,
    },
    textField: {
        display: 'flex',
        marginBottom: 5,
    },
    progress: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 4,
        marginBottom: -(theme.spacing.unit * 5),

    },
    loadingText: {
        marginRight: theme.spacing.unit * 2,
        display: 'flex',
        alignItems: 'center',
        color: 'green',
        fontWeight: '600',
        fontSize: '1.5em'
    },
    inVisible : {
        display: "none",
    }
});

export default withStyles(styles)(Login);
