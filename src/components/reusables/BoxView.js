import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/index";
import {Button, withStyles} from "@material-ui/core";
import classNames from "classnames";
import Box from "./Box";
import Paper from "@material-ui/core/Paper";
import history from "../history";
import config from "../../config";
import Typography from "@material-ui/core/Typography";
import {getEntitiesName} from "../resources";

class BoxView extends Component
{
    constructor(props)
    {
        // console.log(props.data);
        super(props);
        this.state = {
            data: props.data,
            idsOfEntitiesToRemove: [],
        };

    }

    componentWillReceiveProps({newData})
    {
        // console.log(newData);
        //updates data if component recieves new valid data
        if (newData) this.setState({data: newData});
    }

    updateRemoveList = (data) =>
    {
        // console.log(data[0]);
        // console.log(data[1]);
        let list = this.state.idsOfEntitiesToRemove;
        // console.log(list);
        // data[1] is true if the element is checked to be removed
        if (data[1])
        {
            // adds new checked elements
            list.push(data[0])
        } else
        {
            // removes element which was unchecked
            list.splice(list.indexOf(data[0]), 1);
        }
        // console.log(list);
        this.setState({idsOfEntitiesToRemove: list});
    };

    createContent = () =>
    {
        // creates new box component which will display individual data items in a list of this component
        let content = [];

        if (this.state.data.length === 0)
        {
            content = <Typography
                variant="h6"
                color="primary"
                gutterBottom
                className={this.props.classes.notFound}
            >
                {`Nebyly nalezeny žádný ${getEntitiesName(this.props.detailName + "s")}.`}
            </Typography>
        } else
        {
            for (let i = 0; i < this.state.data.length; i++)
            {
                content.push(
                    <Box
                        key={i}
                        data={this.state.data[i]}
                        single={false}
                        detailName={this.props.detailName}
                        isAdmin={this.props.isAdmin}
                        childChecked={this.updateRemoveList}
                    />
                )
            }
        }
        return content
    };

    // redirects to a new form where user can create new entity which type is "detailName"
    addNew = () =>
    {
        history.push({
            pathname: `/${this.props.detailName}Detail`,
        })
    };

    callForRemove = () =>
    {
        // on backend it wasn't implemented to remove multiple elements at once,
        // this use case is complete, but easy to finish if there was time on backend
        let list = this.state.idsOfEntitiesToRemove;
        // console.log(list);
        if (list.length === 1)
        {
            let elementId = list[0];
            // console.log(elementId);
            // console.log(config.url + "/" + this.props.detailName + "s/" + elementId);
            fetch(config.url + "/" + this.props.detailName + "s/" + elementId, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) =>
                {
                    // console.log(response);
                    if (response.status === 204)
                    {
                        // console.log(list);

                        let newData = this.state.data.filter(object => object.id !== elementId);
                        this.setState({data: newData, idsOfEntitiesToRemove: []});
                    } else if (response.status === 403)
                    {
                        this.props.logout();
                    } else
                    {
                    }
                })
                .catch((e) =>
                    {
                        // console.log(e);
                    }
                );
        }
    };

    render()
    {
        const {classes} = this.props;
        const method = this;
        return (
            <div>
                {this.props.isAdmin &&
                <Paper className={classes.buttonContainer}>
                    <Button className={classes.button} onClick={this.addNew}>
                        Add
                    </Button>
                    <Button className={classes.button} onClick={this.callForRemove}
                            disabled={this.state.idsOfEntitiesToRemove.length === 0}>
                        Delete
                    </Button>
                </Paper>
                }
                <div className={classNames(classes.layout, classes.cardGrid)}>

                    <Grid container spacing={8} justify="center">
                        {method.createContent()}
                    </Grid>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    layout: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto",
        },
        display: "flex",
        flexGrow: 1,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        display: "flex",
        flexGrow: 1,
    },
    root: {
        [theme.breakpoints.down("xs")]: {
            marginLeft: 50,
        },
    },
    buttonContainer: {
        margin: theme.spacing.unit * 3,
        marginBottom: -(2 * theme.spacing.unit),
        width: 140,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        color: 'green',
        fontWeight: '600',
    },
    notFound: {
        display: 'flex',

        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
    }
});

export default withStyles(styles)(BoxView);