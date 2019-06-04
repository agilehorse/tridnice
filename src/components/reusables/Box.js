import React, {Component} from "react";
import Card from "@material-ui/core/Card/index";
import CardMedia from "@material-ui/core/CardMedia/index";
import CardContent from "@material-ui/core/CardContent/index";
import Typography from "@material-ui/core/Typography/index";
import CardActions from "@material-ui/core/CardActions/index";
import Grid from "@material-ui/core/Grid/index";
import {Button, withStyles} from "@material-ui/core";
import history from "../history";
import Checkbox from "@material-ui/core/Checkbox";
import {isRequired, shouldDisplay, getPicture, isSelect, translate} from "../resources";
import classNames from "classnames";
import * as ReactDOM from "react-dom";
import {ValidatorForm, TextValidator, SelectValidator,} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";

class Box extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: props.data,
            isInDetailPage: props.isInDetailPage,
            checked: false,
            labelWidth: 0,
            selectList: props.selectList,
        };
    }

    componentDidMount()
    {
        if (this.InputLabelRef)
        {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
            });
        }
    }

    componentWillReceiveProps(nextProps)
    {
        // changes list of selects items every time component recieves props
        if (nextProps.selectList !== this.state.selectList)
        {
            this.setState({selectList: nextProps.selectList});
        }
    }

    handleChange = event =>
    {
        //handle change in a field in form
        const {data} = this.state;
        data[event.target.name] = event.target.value;
        this.setState({data, error: false});
    };

    handleSubmit = () =>
    {
        // passes data from form to parent to handle them
        this.props.callback(this.state.data);
    };

    // creates form
    createInputs(data)
    {
        // console.log(data);
        const {classes} = this.props;
        let content = [];
        let i = 0;
        for (let key in data)
        {
            if (data.hasOwnProperty(key) && shouldDisplay(key, this.props.isNew))
            {
                content.push(this.createInput(i++, key, data[key]));
            }
        }
        return (
            <ValidatorForm onSubmit={this.handleSubmit} variant="outlined" className={classes.formControl}>
                {content}
                <Button color="primary"
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.formItem}
                >Submit
                </Button>
            </ValidatorForm>
        );
    }

    // creates individual input element
    createInput(id, section, value)
    {
        let validators = isRequired(section) ? ["required"] : null;
        let errorMessages = ["this field is required"];
        const {classes} = this.props;
        // if input element should be select
        if (isSelect(section))
        {
            // console.log(section);
            // console.log(this.state.selectList);
            // console.log(this.state.selectList[section]);
            return (
                <SelectValidator
                    key={id}
                    label={translate(section)}
                    name={section}
                    value={value}
                    variant="outlined"
                    onChange={this.handleChange}
                    validators={validators}
                    errorMessages={errorMessages}
                    className={classNames(classes.select, classes.formItem)}
                >
                    <MenuItem value=""/>
                    {this.state.selectList[section]}
                </SelectValidator>
            )

            //    creates text input field
        } else
        {
            if (section === "email")
            {
                validators.push("isEmail");
                errorMessages.push("email is not valid");
            }
            return (
                <TextValidator
                    key={id}
                    label={translate(section)}
                    name={section}
                    value={value}
                    variant="outlined"
                    onChange={this.handleChange}
                    className={classes.formItem}
                    validators={validators}
                    errorMessages={errorMessages}
                    readOnly
                />
            )
        }
    }

    // creates text elements
    createTypographies(data)
    {
        let content = [];
        let i = 0;
        for (let key in data)
        {
            if (data.hasOwnProperty(key) && shouldDisplay(key))
            {
                content.push(this.createTypography(i++, key, data[key]));
            }
        }
        return content;
    }

    //create individual text element
    createTypography(id, section, value)
    {
        return (
            <Typography
                key={id}
                gutterBottom
                // variant={variant} component={component}
                style={{wordWrap: "break-word"}}
            >
                <strong>{translate(section)}</strong>
                {": " + value}
            </Typography>
        );
    }

    // redirects to a detail of an entity which this box represents
    goToDetail = () =>
    {
        // console.log(`/${this.props.detailName}Detail`);
        // console.log(this.state.data);
        history.push({
            pathname: `/${this.props.detailName}Detail`,
            data: this.state.data,
        });
    };

    handleChecked = event =>
    {
        // handle event when the box is checked
        this.setState({checked: event.target.checked});
        // console.log(this.state.data.id);
        this.props.childChecked([this.state.data.id, event.target.checked]);
    };

    render()
    {
        // a condition when a user is allowed to go to a detail page of this box
        const goToDetail = !this.state.isInDetailPage && (this.props.detailName !== 'user' || this.props.isAdmin);
        const {classes} = this.props;
        const props = this.props;
        // if the user is admin, the box in detail page will act as a form, otherwise it will be just static text for other users
        const content = this.state.isInDetailPage && this.props.isAdmin ? this.createInputs(props.data) : this.createTypographies(props.data);
        return (
            <Grid item key={props.key}
                  xs={this.state.isInDetailPage ? 2 : 8}
                  sm={this.state.isInDetailPage ? 3 : 3}
                  md={this.state.isInDetailPage ? 3 : 2}
                  lg={this.state.isInDetailPage ? 3 : 2}
                  xl={this.state.isInDetailPage ? 3 : 2}
            >
                <Card className={classes.card}>
                    {/*Image*/}
                    <CardMedia
                        className={classNames(classes.cardMedia, this.state.isInDetailPage && classes.smaller)}
                        square="true"
                        image={getPicture(this.props.detailName)}
                    />
                    <CardContent className={classes.cardContent}>
                        {content}
                    </CardContent>
                    <CardActions>
                        {this.props.isAdmin && !this.state.isInDetailPage
                        && <Checkbox label="Select" onChange={this.handleChecked}/>}
                        {goToDetail && <Button className={classNames(classes.formItem, classes.detailButton)}
                                               onClick={this.goToDetail}>Detail</Button>}
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

const styles = theme => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: {
        display: "flex",
        height: 0,
        paddingTop: "100%", // 16:9
        borderRadius: "100%",
    },
    cardContent: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexGrow: 1,
    },
    clickable: {
        cursor: "pointer",
    },
    select: {
        color: "green",
        width: "100%",
    },
    label: {
        color: "green",
    },
    filter: {
        marginTop: "37.5vh",
    },
    formControl: {
        margin: theme.spacing.unit,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        color: "green",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    formItem: {
        marginTop: theme.spacing.unit * 2,
    },
    detailButton: {
        marginBottom: theme.spacing.unit * 1.5,
    }
});

export default withStyles(styles)(Box);
