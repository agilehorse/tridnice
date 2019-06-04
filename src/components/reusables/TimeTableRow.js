import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import TimeTableCard from "../reusables/TimeTableCard";
import Typography from "@material-ui/core/Typography";

/**
 * Connection between timetable and timetable card
 * Generates row for a timetable
 */
class TimeTableRow extends Component
{
    constructor(props)
    {
        super(props);
        /**
         * Defines number of hours in timetable
         */
        this.numberInRow = 9;
        /**
         * Initially important for iteration over rows
         * Now somewhat inconvenient solution for iteration through row 0
         */
        this.transfer = [
            "8:00",
            "8:55",
            "10:00",
            "10:55",
            "11:50",
            "12:45",
            "13:35",
            "14:25",
            "15:15",
        ];
        this.generateBoxes.bind(this);
        this.occur.bind(this);
    }

    /**
     * Finds a lesson for certain hour, returns object leson
     * @param {*} id number of an hour minus one
     * @param {*} index time of a beginning hour as a string
     */
    occur(id, index)
    {
        for (let elem of this.props.data)
        {
            if ((elem.from && elem.from.print() === index) || id + 1 === elem.hour)
            {
                return elem;
            }
        }
    }

    /**
     * Creates cells of a timetable
     * Doesn't  create the 0 column
     */
    generateBoxes = () =>
    {
        let arr = [];
        this.transfer.forEach((item, key) =>
        {
            arr.push(
                <TimeTableCard
                    key={key}
                    type={this.props.type}
                    hour={key + 1}
                    data={this.occur(key, item)}
                    saveLesson={data => this.props.saveLesson(data)}
                    deleteFromMenu={data => this.props.deleteFromMenu(data)}
                    isAdmin={this.props.isAdmin}
                    className={this.props.classes.gridItem}
                />,
            );
        });
        return arr;
    };

    render()
    {
        const {classes} = this.props;
        const method = this;
        const props = this.props;

        return (
            <Grid container spacing={0}
                  className={this.props.classes.gridItem}
            >
                <Grid item xs>
                    {//column zero of a subject
                    }
                    <Paper
                        className={
                            props.type !== "header"
                                ? classes.firstTableCardBody
                                : classes.firstHeaderCardBody
                        }
                    >
                        <Typography
                            variant="h6"
                            className={classes.typographies}
                            color="primary"
                            gutterBottom
                        >
                            {props.type === "header"
                                ? "Day"
                                : props.type.charAt(0).toUpperCase() + props.type.slice(1)}
                        </Typography>
                    </Paper>
                </Grid>
                {method.generateBoxes()}
            </Grid>
        );
    }
}

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,

    timeTableBox: {
        width: "85vw",
        marginLeft: "3em",
    },

    firstHeaderCardBody: {
        backgroundColor: "#ededed",
        height: "6em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },

    firstTableCardBody: {
        backgroundColor: "#ededed",
        height: "6em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    typographies: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    gridItem: {
        maxHeight: "6em",
        margin: 0,
    },
});

export default withStyles(styles)(TimeTableRow);