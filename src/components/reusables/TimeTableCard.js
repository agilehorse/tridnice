import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";
import classNames from 'classnames'

// Represents square in timetable. Whether it's a lesson or a heading row.
class TimeTableCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = this.props.data;
    }

    // creates a body of a cell
    cardBody = () =>
    {
        return (
            <div id={this.state && this.state.id}>
                <Typography
                    variant="h6"
                    className={classNames(this.props.classes.typographies, this.props.type !== "header" ? this.props.classes.headerText : undefined)}
                    color="primary"
                    gutterBottom={this.props.type === "header"}
                >
                    {this.state && this.state.name}
                </Typography>
                {this.bodyContent()}
            </div>
        );
    };

    // creates a content of a square, if it's a header row there is a number of lesson and times from-to
    bodyContent = () =>
    {
        if (this.props.type === "header")
        {
            return (
                <Typography
                    variant="subtitle2"
                    className={this.props.classes.typographies}
                    color="textSecondary"
                    gutterBottom
                >
                    {this.state.from.print()} - {this.state.to.print()}
                </Typography>
            );
        } else
        {
            return (
                <div>
                    <Typography
                        variant="subtitle1"
                        className={classNames(this.props.classes.typographies, this.props.classes.smallText)}
                        color="textSecondary"
                    >
                        {this.state && this.state.where}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classNames(this.props.classes.typographies, this.props.classes.smallText)}
                    >
                        {this.state && this.state.teacher}
                    </Typography>
                </div>
            );
        }
    };

    onDragOver = ev =>
    {
        ev.preventDefault();
    };

    /**
     * Initiates movement of lessons from a cell
     * ev -> event data,
     * data -> lesson data from lectures field
     */

    onDragStart = (ev, data) =>
    {
        ev.dataTransfer.effectAllowed = "copy";
        ev.dataTransfer.setData("text/plain", JSON.stringify(data));
        this.setState({
            id: "",
            name: "",
            where: "",
            teacher: "",
            teacherAllData: "",
            subjectAllData: "",
        });
    };

    /**
     * Handles drop of lesson inside this "cell"
     * Data is transfered to json, object is created and saved to this.state.
     * This lesson is deleted from column "lectures" in Timetable and saves into object timetable in Timetable
     * ev -> event data,
     */
    onDrop = (ev) =>
    {
        let data = ev.dataTransfer.getData("text/plain");
        const obj = JSON.parse(data);
        const object = {
            id: obj.id,
            name: obj.name,
            where: obj.where,
            teacher: obj.teacher,
            teacherAllData: obj.teacherAllData,
            subjectAllData: obj.subjectAllData,
        };
        ev.preventDefault();
        //console.log(JSON.parse(data));

        this.setState({
            id: obj.id,
            name: object.name,
            where: object.where,
            teacher: object.teacher,
            teacherAllData: object.teacherAllData,
            subjectAllData: object.subjectAllData,
        });

        obj.hour = this.props.hour;
        this.props.saveLesson(obj);
        this.props.deleteFromMenu(obj);
    };

    render()
    {
        const {classes} = this.props;
        //console.log(this.props.hour);
        return (
            <Grid item xs className={classes.gridItem}>
                <Card
                    className={
                        this.props.type !== "header" &&
                        this.state &&
                        this.state.id !== "" &&
                        this.props.isAdmin
                            ? classes.clickable
                            : undefined
                    }
                >
                    {//row 0 is of type header
                        this.props.type !== "header" ? (
                            this.state && this.state.id !== "" ? (
                                <CardContent
                                    className={
                                        this.props.type !== "header"
                                            ? classes.tableCardBody
                                            : classes.headerCardBody
                                    }
                                    draggable={this.props.isAdmin}
                                    onDragStart={e => this.onDragStart(e, this.state)}
                                >
                                    {this.cardBody()}
                                </CardContent>
                            ) : (
                                <CardContent
                                    className={
                                        this.props.type !== "header"
                                            ? classes.tableCardBody
                                            : classes.headerCardBody
                                    }
                                    onDragOver={e => this.onDragOver(e)}
                                    onDrop={e => this.onDrop(e)}
                                >
                                    {this.cardBody()}
                                </CardContent>
                            )
                        ) : (
                            <CardContent
                                className={
                                    this.props.type !== "header"
                                        ? classes.tableCardBody
                                        : classes.headerCardBody
                                }
                            >
                                {this.cardBody()}
                            </CardContent>
                        )}
                </Card>
            </Grid>
        );
    }
}

const styles = () => ({

    gridItem: {
        height: "6em",

    },
    clickable: {
        cursor: "pointer",
    },

    headerCardBody: {
        backgroundColor: "#ededed",
        height: "6em",
    },

    tableCardBody: {
        height: "6em",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    typographies: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    headerText: {
        fontSize: '1em',
    },
    smallText: {
        fontSize: '0.7em',
    }
});

export default withStyles(styles)(TimeTableCard);
