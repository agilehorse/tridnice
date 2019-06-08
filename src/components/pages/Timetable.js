import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router";
import TimeTableRow from "../reusables/TimeTableRow";
import Time from "../Utils/Time";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import history from "../history";
import config from "../../config";
import classNames from 'classnames'

/**
 * Timetable page
 */
class Timetable extends Component
{
    constructor(props)
    {
        super(props);
        /**
         * first row of timetable
         * clas time is in utils folder
         * name is number of a column
         */
        this.header = [
            {
                name: 1,
                from: new Time(8, 0),
                to: new Time(8, 45),
            },
            {
                name: 2,
                from: new Time(8, 55),
                to: new Time(9, 40),
            },
            {
                name: 3,
                from: new Time(10, 0),
                to: new Time(10, 45),
            },
            {
                name: 4,
                from: new Time(10, 55),
                to: new Time(11, 40),
            },
            {
                name: 5,
                from: new Time(11, 50),
                to: new Time(12, 35),
            },
            {
                name: 6,
                from: new Time(12, 45),
                to: new Time(13, 30),
            },
            {
                name: 7,
                from: new Time(13, 35),
                to: new Time(14, 20),
            },
            {
                name: 8,
                from: new Time(14, 25),
                to: new Time(15, 10),
            },
            {
                name: 9,
                from: new Time(15, 15),
                to: new Time(16, 0),
            },
        ];
        //mock data for timetable
        const tTable = this.props.isAdmin ?
            {
                mo: [],
                tu: [],
                we: [],
                th: [],
                fr: [],
            }
            :
            {
                mo: [
                    {
                        name: "Physics",
                        from: new Time(8, 0),
                        to: new Time(8, 45),
                        where: "1A",
                        teacher: "Davos Seaworth",
                    }
                ],
                tu: [
                    {
                        name: "Mathematics",
                        from: new Time(8, 55),
                        to: new Time(9, 45),
                        where: "1A",
                        teacher: "Robb Stark",
                    }
                ],
                we: [
                    {
                        name: "Physics",
                        from: new Time(10, 0),
                        to: new Time(10, 45),
                        where: "1A",
                        teacher: "Vallario Naharis",
                    }
                ],
                th: [
                    {
                        name: "Mathematics",
                        from: new Time(11, 50),
                        to: new Time(12, 35),
                        where: "1A",
                        teacher: "Illiano Mopati",
                    }
                ],
                fr: [
                    {
                        name: "Informatics",
                        from: new Time(12, 45),
                        to: new Time(13, 30),
                        where: "1A",
                        teacher: "Turgho nodho",
                    }
                ],
            };
        this.state = {
            /**
             * This has to be set, without it can't send to backend
             * holds id of current school class
             */
            thisClass: undefined,
            /**
             * First id of new lessons, after connected with backend won't be needed
             */
            numberOfLessons: 1,
            timeTable: tTable,
            /**
             * Data in lessons column on the right.
             */
            lectures: [
                {
                    id: 1,
                    name: "Physics",
                    teacher: "John Snow",
                    where: "room x54"
                },
                {
                    id: 2,
                    name: "Mathematics",
                    teacher: "John Snow",
                    where: "room x54"
                },
                {
                    id: 3,
                    name: "Informatics",
                    teacher: "John Snow",
                    where: "room x54"
                },
                {
                    id: 4,
                    name: "Physics",
                    teacher: "John Snow",
                    where: "room x54"
                },
                {
                    id: 5,
                    name: "Mathematics",
                    teacher: "John Snow",
                    where: "room x54"
                },
                {
                    id: 6,
                    name: "Informatics",
                    teacher: "John Snow",
                    where: "room x54"
                },
                {
                    id: 7,
                    name: "Physics",
                    teacher: "John Snow",
                    where: "room x54"
                },
                {
                    id: 8,
                    name: "Mathematics",
                    teacher: "John Snow",
                    where: "room x54"
                },
                {
                    id: 9,
                    name: "Informatics",
                    teacher: "John Snow",
                    where: "room x54"
                },
            ],
            /**
             * Holds classes from backend
             */
            class: [],
        };
    }

    componentDidMount()
    {
        /**
         * Gets classes from backend on first call.
         * If data comes from lesson page it's copied to the state.
         */
        // console.log("load", this.props.location.data);

        //load data if I wan on lesson page
        if (this.props.location.data)
        {
            // console.log("sdifhsdiufhsifhsiudhf");
            const info = this.props.location.data.data;
            let next = info.numberOfLessons + 1;
            this.setState({
                timeTable: info.timeTable,
                lectures: info.lectures,
                class: info.class,
                thisClass: info.thisClass,
                numberOfLessons: next,
            });
        }

        //create new lesson box
        const data = this.props.location.data;
        // console.log("tvl.vsd", data);
        if (data !== undefined)
        {
            let newLesson = {
                id: data.data.numberOfLessons,
                name: data.subject.name,
                where: "room2",
                teacher: data.teacher.firstName + " " + data.teacher.lastName,
                teacherAllData: data.teacher,
                subjectAllData: data.subject,
            };
            this.setState(st =>
            {
                st.lectures.push(newLesson);
            });
        }

        //download classes
        if (this.state.class.length === 0 && this.props.isAdmin)
        {
            fetch(config.url + "/classes", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(response =>
                {
                    // console.log(response);
                    if (response.status === 200)
                    {
                        response.json().then(elements =>
                        {
                            this.setState({class: elements});
                        });
                    } else if (response.status === 403)
                    {
                        this.props.logout();
                    }
                })
                .catch(e =>
                {
                    // console.log(e);
                });
        }
    }

    onDragOver = ev =>
    {
        ev.preventDefault();
    };

    /**
     * Copies data on drag to string.
     * ev -> event data,
     * rawdata -> data lesson from lectures field
     */
    onDragStart = (ev, rawdata) =>
    {
        const data = rawdata;
        ev.dataTransfer.effectAllowed = "copy";
        ev.dataTransfer.setData("text/plain", JSON.stringify(data));
        //let lectures = this.state.lectures;
        //lectures = lectures.filter(elem => elem.id != data.id);
        //this.setState({ lectures: lectures });
    };

    /**
     * Method moves lesson from timetable back to lessons column on the right
     * ev -> event data,
     * cat -> regulerne jsem zapomnel co to je, ale nikde to nepouzivat tak nic duleziteho
     */
    onDrop = (ev) =>
    {
        let data = ev.dataTransfer.getData("text/plain");
        ev.preventDefault();
        //console.log(JSON.parse(data));
        const obj = JSON.parse(data);
        let lec = {
            id: obj.id,
            name: obj.name,
            where: obj.where,
            teacher: obj.teacher,
            teacherAllData: obj.teacherAllData,
            subjectAllData: obj.subjectAllData,
        };
        let lectures = this.state.lectures;
        lectures.push(lec);
        // console.log("l;ecls", lec);
        this.saveLesson("vse", lec);
        this.setState({lectures: lectures});
    };

    /**
     * Moves lesson
     */
    handleLessonCreate = () =>
    {
        // console.log("Save lesson create.");
        history.push({
            pathname: "/lessonDetail",
            data: this.state,
        });
    };

    /**
     * Here data can be send to backend
     */
    handleTimeTable = () =>
    {
        // console.log(this.state.thisClass);
        // console.log("Save timetable.");
    };

    /**
     * Not tested yet,
     * this sets current timetable according to id from db.
     * Sets id of current class
     * e -> event data
     * id -> id of the class
     */
    setActualClass = (e, id) =>
    {
        this.setState({thisClass: id});
        fetch(config.url + `/classes/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(response =>
            {
                // console.log(response);
                if (response.status === 200)
                {
                    response.json().then(elements =>
                    {
                        /**
                         * If data are okay they are transfered to JSON
                         */
                        let mo = this.state.timeTable.mo;
                        let tu = this.state.timeTable.tu;
                        let we = this.state.timeTable.we;
                        let th = this.state.timeTable.th;
                        let fr = this.state.timeTable.fr;

                        //Creates objects from lessons field
                        for (let obj of elements.lessons)
                        {
                            let lec = {
                                id: obj.id,
                                name: obj.subject.name,
                                where: "room 5",
                                teacher: obj.teacher.firstName + " " + obj.teacher.lastName,
                                hour: obj.hour,
                                teacherAllData: obj.teacher,
                                subjectAllData: obj.subject,
                            };

                            //Pushed to the array according to day.
                            switch (obj.day)
                            {
                                case "mo":
                                    mo.push(lec);
                                    break;
                                case "tu":
                                    tu.push(lec);
                                    break;
                                case "we":
                                    we.push(lec);
                                    break;
                                case "th":
                                    th.push(lec);
                                    break;
                                case "fr":
                                    fr.push(lec);
                                    break;
                                default:
                                // console.log("error day");
                            }
                        }
                        this.setState({
                            timeTable: {
                                mo: mo,
                                tu: tu,
                                we: we,
                                th: th,
                                fr: fr,
                            },
                        });
                    });
                } else if (response.status === 403)
                {
                    this.props.logout();
                }
            })
            .catch(e =>
            {
                // console.log(e);
            });
    };

    /**
     * Deletes lessons from tiemtable
     * type -> Day in a week,
     * data -> lesson object,
     */
    saveLesson = (type, data) =>
    {
        let array;
        let timeTable = this.state.timeTable;

        timeTable.mo = this.state.timeTable.mo.filter(elem => elem.id !== data.id);
        timeTable.tu = this.state.timeTable.tu.filter(elem => elem.id !== data.id);
        timeTable.we = this.state.timeTable.we.filter(elem => elem.id !== data.id);
        timeTable.th = this.state.timeTable.th.filter(elem => elem.id !== data.id);
        timeTable.fr = this.state.timeTable.fr.filter(elem => elem.id !== data.id);
        switch (type)
        {
            case "mo":
                array = timeTable.mo;
                array.push(data);
                timeTable.mo = array;
                break;
            case "tu":
                array = timeTable.tu;
                array.push(data);
                timeTable.tu = array;
                break;
            case "we":
                array = timeTable.we;
                array.push(data);
                timeTable.we = array;
                break;
            case "th":
                array = timeTable.th;
                array.push(data);
                timeTable.th = array;
                break;
            case "fr":
                array = timeTable.fr;
                array.push(data);
                timeTable.fr = array;
                break;
            default:
            // console.log("no day");
        }

        this.setState({timeTable: timeTable});
    };

    /**
     * Deletes lessons from side column
     * Called from TimeTableCard
     */
    deleteFromMenu = data =>
    {
        let lectures = this.state.lectures;
        let lectures2 = lectures.filter(elem => elem.id !== data.id);
        // console.log("Delete form menu", lectures);
        this.setState({lectures: lectures2});
    };

    render()
    {
        const {classes} = this.props;
        // console.log("lectures", this.state.lectures);
        // console.log("timetable", this.state.timeTable);

        return (
            <div className={classes.root}>
                <div className={classes.appBarSpacer}/>

                <div className={classes.timeTable}>
                    {/*Timetable*/}
                    <div className={classes.timeTableBox}>
                        {
                            //Classes menu
                            this.props.isAdmin &&
                            <MenuList className={classes.toolMenu}>
                                {this.state.class.map((item, key) => (
                                    <MenuItem
                                        key={key}
                                        selected={false}
                                        className={classes.menuItem}
                                        onClick={e => this.setActualClass(e, item.id)}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        }
                        <TimeTableRow type="header" data={this.header}/>
                        <TimeTableRow
                            type="mo"
                            data={this.state.timeTable.mo}
                            saveLesson={data => this.saveLesson("mo", data)}
                            deleteFromMenu={data => this.deleteFromMenu(data)}
                            isAdmin={this.props.isAdmin}
                        />
                        <TimeTableRow
                            type="tu"
                            data={this.state.timeTable.tu}
                            saveLesson={data => this.saveLesson("tu", data)}
                            deleteFromMenu={data => this.deleteFromMenu(data)}
                            isAdmin={this.props.isAdmin}
                        />
                        <TimeTableRow
                            type="we"
                            data={this.state.timeTable.we}
                            saveLesson={data => this.saveLesson("we", data)}
                            deleteFromMenu={data => this.deleteFromMenu(data)}
                            isAdmin={this.props.isAdmin}
                        />
                        <TimeTableRow
                            type="th"
                            data={this.state.timeTable.th}
                            saveLesson={data => this.saveLesson("th", data)}
                            deleteFromMenu={data => this.deleteFromMenu(data)}
                            isAdmin={this.props.isAdmin}
                        />
                        <TimeTableRow
                            type="fr"
                            data={this.state.timeTable.fr}
                            saveLesson={data => this.saveLesson("fr", data)}
                            deleteFromMenu={data => this.deleteFromMenu(data)}
                            isAdmin={this.props.isAdmin}
                            className={this.props.classes.gridItem}
                        />
                    </div>
                    {this.props.isAdmin &&
                    <aside
                        className={classes.asideMenu}
                        onDragOver={e => this.onDragOver(e)}
                        onDrop={e => this.onDrop(e)}
                    >
                        <Button
                            className={classes.infoLine}
                            variant="outlined"
                            onClick={this.handleLessonCreate}
                            color="primary"
                        >
                            Create lesson
                        </Button>
                        <Button
                            className={classes.infoLine}
                            variant="outlined"
                            onClick={this.handleTimeTable}
                            color="primary"
                        >
                            Save
                        </Button>
                        <Typography
                            className={classNames(classes.lessonHeader, classes.typographies)}
                            variant="h6"
                            color="primary"
                        >
                            Lessons
                        </Typography>
                        {
                            //Lessons
                            this.state.lectures.map((item, key) => (
                                <Card
                                    key={key}
                                    id={item.id}
                                    className={classes.lectureCard}
                                    draggable
                                    onDragStart={e => this.onDragStart(e, item)}
                                >
                                    <CardContent>
                                        <Typography variant="h6" className={classes.typographies} color="primary">
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            className={classes.typographies}
                                            color="textSecondary"
                                        >
                                            {item.where}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className={classes.typographies}
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            {item.teacher}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                    </aside>}
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    root: {
        marginLeft: -(theme.spacing.unit * 7)
    },
    timeTableBox: {
        width: "85vw",
        flexWrap: "wrap",
        minWidth: 1100,
        marginLeft: theme.spacing.unit * 12,
        [theme.breakpoints.up("1800")]: {
            marginLeft: theme.spacing.unit * 20,
        },
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing.unit * 10,
        },
        [theme.breakpoints.down("sm")]: {
            transform: "scale(0.75)",
            marginTop: -(theme.spacing.unit * 9),
            marginLeft: -(theme.spacing.unit * 6),
        },
        paddingRight: theme.spacing.unit * 5,
    },

    toolMenu: {
        // marginLeft: theme.spacing.unit * 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "white",
        borderRadius: "5px",
        marginBottom: "2em",
        webkitBoxShadow: "0px 5px 5px 0px rgba(173,173,173,1)",
        mozBoxShadow: "0px 5px 5px 0px rgba(173,173,173,1)",
        boxShadow: "0px 5px 5px 0px rgba(173,173,173,1)",
        width: '100%',
        [theme.breakpoints.up("1800")]: {
            // marginLeft: theme.spacing.unit * 20,
        },
        [theme.breakpoints.up("lg")]: {
            // marginLeft: theme.spacing.unit * 12,
        },
        [theme.breakpoints.down("md")]: {
            // marginLeft: theme.spacing.unit * 10,
        },
        [theme.breakpoints.down("sm")]: {
            width: 1410,
            transform: "scale(0.75)",
            marginLeft: -(theme.spacing.unit * 22),
            // marginBottom: 2,
        },
    },

    menuItem: {
        borderRadius: "5px",
        paddingLeft: "2em",
        paddingRight: "2em",
    },

    asideMenu: {
        height: "95vh",
        maxHeight: 670,
        minWidth: "12em",
        backgroundColor: "#ededed",
        borderRadius: "5px",
        overflow: "auto",
        webkitBoxShadow: "0px 5px 5px 0px rgba(173,173,173,1)",
        mozBoxShadow: "0px 5px 5px 0px rgba(173,173,173,1)",
        boxShadow: "0px 5px 5px 0px rgba(173,173,173,1)",
        [theme.breakpoints.down("sm")]: {
            transform: "scale(0.75)",
            marginTop: -(theme.spacing.unit * 9),
            marginLeft: -(theme.spacing.unit * 20),
            marginRight: theme.spacing.unit * 9,
        },
    },

    timeTable: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    lessonHeader: {
        marginBottom: "1ex",
        marginTop: "1ex",
    },

    lectureCard: {
        border: "1px solid black",
        cursor: "pointer",
        maxWidth: "12em",
    },

    infoLine: {
        backgroundColor: "white",
        width: "100%",
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
    },
});

export default withStyles(styles)(withRouter(Timetable));