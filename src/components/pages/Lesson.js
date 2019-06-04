import React, {Component} from "react";
import Box from "../reusables/Box";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router";
import {getEmptyBox} from "../resources";
import config from "../../config";
import MenuItem from "@material-ui/core/MenuItem";
import history from "../history";

// Lessond etail page
class Lesson extends Component
{
    constructor(props)
    {
        // console.log(props);
        super(props);
        let data = getEmptyBox("lesson");
        if (this.props.location.data)
        {
            this.state = {
                packet: this.props.location.data,
                data: data,
                isNew: false,
                subjectsData: [],
                teachersData: [],
                selectList: {
                    teacher: [],
                    subject: [],
                },
            };
        } else
        {
            this.state = {
                packet: "",
                data: data,
                isNew: true,
                subjectsData: [],
                teachersData: [],
                selectList: {
                    teacher: [],
                    subject: [],
                },
            };
        }
    }


    // gets teachers and subjects from db into select box items
    componentDidMount()
    {
        let teachers = [];
        fetch(config.url + "/users/role/TEACHER", {
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
                    response.json().then(teachersData =>
                    {
                        let list = [];
                        let i = 0;
                        this.setState({teachersData: teachersData});
                        for (let object of teachersData)
                        {
                            list.push(
                                <MenuItem key={i++} value={object.id}>
                                    {object.firstName} {object.lastName}
                                </MenuItem>,
                            );
                        }
                        // console.log(list);
                        teachers = list;
                    });
                    return fetch(config.url + "/subjects", {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                } else if (response.status === 403)
                {
                    this.props.logout();
                }
            })
            .then(response =>
            {
                // console.log(response);
                if (response.status === 200)
                {
                    response.json().then(subjectsData =>
                    {
                        let subjects = [];
                        let i = 0;
                        this.setState({subjectsData: subjectsData});
                        for (let object of subjectsData)
                        {
                            subjects.push(
                                <MenuItem key={i++} value={object.id}>
                                    {object.name}
                                </MenuItem>,
                            );
                        }
                        // console.log(subjects);
                        this.setState({
                            selectList: {
                                teacher: teachers,
                                subject: subjects,
                            },
                        });
                    });
                }
            })
            .catch(e =>
            {
                // console.log(e);
            });
    }

    // sends data to timetable page
    handleData = data =>
    {
        // console.log("handling data", data);
        let letter = {
            subject: "",
            teacher: "",
            data: this.state.packet,
        };
        for (let elem of this.state.subjectsData)
        {
            if (elem.id === data.subject)
            {
                letter.subject = elem;
                break;
            }
        }
        for (let elem of this.state.teachersData)
        {
            if (elem.id === data.teacher)
            {
                letter.teacher = elem;
                break;
            }
        }
        // console.log("handling data", letter);
        history.push({
            pathname: "/timetable",
            data: letter,
        });
    };

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.appBarSpacer}/>

                <Box
                    justify="center"
                    image={undefined}
                    data={this.state.data}
                    isInDetailPage={true}
                    callback={d => this.handleData(d)}
                    propertyToEditability={this.state.propertyToEditability}
                    isAdmin={this.props.userType === "ADMIN"}
                    detailName={"lesson"}
                    selectList={this.state.selectList}
                />
            </div>
        );
    }
}

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: "10vh",
    },
});

export default withStyles(styles)(withRouter(Lesson));