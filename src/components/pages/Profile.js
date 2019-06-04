import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import profilePicture from "../../resources/icons/profile.jpg";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import config from "../../config";
import Modal from "@material-ui/core/Modal";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Popover from "@material-ui/core/Popover";

//Profile page
class Profile extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            modalVisible: false,
            editVisible: false,
            error: '',
            img: JSON.parse(localStorage.getItem('image')) || profilePicture,
            user: {
                id: props.id
            },
            formData: {
                password: '',
                repeatPassword: '',
            },
            anchorEl: null,
            inputField: '',
        };
    }

    componentDidMount = () =>
    {
        //handle drop and dragover actions
        const box = document.getElementById("dnd");
        box.addEventListener("drop", e =>
        {
            e.preventDefault();
            this.showImg(e.dataTransfer.files)
        });
        box.addEventListener("dragover", e => e.preventDefault());
        // adds custom validator rule to form
        ValidatorForm.addValidationRule('isPasswordMatch', (value) =>
        {
            return value === this.state.formData.password;

        });
        // gets information about current user
        fetch(config.url + "/users/" + this.props.id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) =>
            {
                // console.log(response);
                response.json().then(backendData =>
                {
                    this.setState({user: backendData})
                });
            })
            .catch((e) =>
                {
                    // console.log(e);
                }
            );
    };

    // sets new image
    showImg = files =>
    {
        for (const f of files)
        {
            if (f.type.indexOf("image") !== -1)
            {
                const fr = new FileReader();
                fr.addEventListener("load", e =>
                {
                    const i = new Image();
                    i.addEventListener("load", e =>
                    {
                        i.width = Math.min(i.naturalWidth, window.innerWidth - 20);
                    });
                    //console.log(fr.result);
                    localStorage.setItem('image', JSON.stringify(fr.result));
                    this.setState({img: fr.result});
                });
                fr.readAsDataURL(f);
            }
        }
    };

    // change password in DB
    changePassword = () =>
    {
        let user = this.state.user;
        user.password = this.state.formData.password;
        fetch(config.url + "/users/" + user.id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(user)
        })
            .then((response) =>
            {
                // console.log(response);
                if (response.status === 204)
                {
                    this.hide('modalVisible')
                } else
                {
                    this.setState({error: 'Error on the server, please try again.'})
                }
            })
            .catch((e) =>
                {
                    // console.log(e);
                    this.setState({error: 'Error on the server, please try again.'})
                }
            );
    };

    //handle change event in change password form
    handleChange = (event) =>
    {
        const {formData} = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({formData, error: ''});
    };

    //handles opening modal window
    hide = (prop) =>
    {
        this.setState({[prop]: false})
    };

    //handles closing modal window
    open = (prop) =>
    {
        this.setState({[prop]: true})
    };

    // handles displaying edit icon on hover on image
    handlePopoverOpen = event =>
    {
        this.setState({anchorEl: event.currentTarget});
    };

    // handles not displaying edit icon on image
    handlePopoverClose = () =>
    {
        this.setState({anchorEl: null});
    };

    // when user clicks on image, calls click on input html element so user can add new image
    clickOnImage = () =>
    {
        document.querySelector('#i').click();
    };

    render()
    {
        const {classes} = this.props;
        const state = this.state;
        const user = state.user;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <Grid item xs={8} sm={5} md={4} lg={3} xl={3}>
                    <Card className={classes.card}>
                        {/*image*/}
                        <CardMedia
                            id="dnd"
                            square="true"
                            className={classes.cardMedia}
                            image={state.img}
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={this.handlePopoverOpen}
                            onMouseLeave={this.handlePopoverClose}
                            onClick={this.clickOnImage}
                        >
                            <input style={{display: 'none'}} id="i" type="file" accept="image/*"
                                   onChange={event => this.showImg(event.target.files)}/>
                        </CardMedia>
                        {/*Edit icon on image*/}
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                                paper: classes.paper,
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                            onClose={this.handlePopoverClose}
                            disableRestoreFocus
                        >
                            <EditIcon className={classes.editIcon}/>
                        </Popover>
                        {/*User information*/}
                        <CardContent className={classes.cardContent}>
                            <div className={classes.contentLayout}>
                                <Typography
                                    className={classes.infoLine}
                                >
                                    <strong>Name:</strong> {user.firstName} {user.lastName}
                                </Typography>
                                <Typography
                                    className={classes.infoLine}
                                >
                                    <strong>E-mail:</strong> {user.email}
                                </Typography>
                            </div>
                            {/*Change password button*/}
                            <Button
                                variant="outlined"
                                onClick={() => this.open('modalVisible')}
                                className={classes.openModalButton}
                            >
                                Change password
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                {/*Modal window*/}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={state.modalVisible}
                    onClose={() => this.hide('modalVisible')}
                >
                    <div className={classes.passwordChange}>
                        <Typography variant="h6" id="modal-title">
                            Password change
                        </Typography>

                        {/*Change password form*/}
                        <ValidatorForm onSubmit={this.changePassword} className={classes.form}>
                            {state.error && (
                                <Typography className={classes.errorHeading}>
                                    {state.error}
                                </Typography>
                            )}
                            <TextValidator
                                label="New password"
                                name="password"
                                type="password"
                                value={state.formData.password}
                                onChange={this.handleChange}
                                validators={["required",]}
                                errorMessages={["this field is required"]}
                                variant="outlined"
                                className={classes.textField}
                                autoFocus
                                fullWidth
                            />
                            <TextValidator
                                label="Repeat password"
                                name="repeatPassword"
                                type="password"
                                value={state.formData.repeatPassword}
                                onChange={this.handleChange}
                                validators={["required", "isPasswordMatch"]}
                                errorMessages={
                                    ["this field is required",
                                        "passwords don't match",
                                        "Error on the server, please try again"]}
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                            />
                            <Button
                                color="primary"
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Potvrdit
                            </Button>
                        </ValidatorForm>
                    </div>
                </Modal>
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
        marginTop: '10vh',
    },

    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },

    cardMedia: {
        webkitBoxShadow: "0px 0px 45px -9px rgba(0,0,0,0.75)",
        mozBoxShadow: "0px 0px 45px -9px rgba(0,0,0,0.75)",
        boxShadow: "0px 0px 45px -9px rgba(0,0,0,0.75)",
        display: "flex",
        height: 0,
        paddingTop: "100%", // 16:9
        borderRadius: "100%",
        "&:hover": {
            cursor: "pointer",
        },
    },
    cardContent: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexGrow: 1,
    },

    passwordChange: {
        display: 'flex',
        margin: 'auto',
        marginTop: '30vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },

    inVisible: {
        display: 'none',
    },

    editIcon: {
        margin: theme.spacing.unit,
    },

    openModalButton: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        webkitBoxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
        mozBoxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
        boxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
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
        marginBottom: 10,
    },

    infoLine: {
        marginBottom: 10,
        '&::first-word': {
            fontWeight: '900',
            fontSize: 'medium',
        }
    },

    popover: {
        pointerEvents: 'none',
        marginTop: 30,
        marginLeft: -30,
    },
    paper: {
        padding: theme.spacing.unit,
    },

    submit: {
        webkitBoxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
        mozBoxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
        boxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
    }
});

export default withStyles(styles)(Profile);
