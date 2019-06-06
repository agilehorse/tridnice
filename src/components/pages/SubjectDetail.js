import React, {Component} from 'react'
import Box from "../reusables/Box";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router";
import {getEmptyBox} from "../resources";
import config from "../../config";
import history from "../history";
import Marks from "./Marks";
import {marksList, studentSubjectMarks} from "../MockJSONs";

//Subject detail page
class SubjectDetail extends Component
{
    constructor(props)
    {
        // console.log(props);
        super(props);
        if (this.props.location.data)
        {
            this.state = {
                data: this.props.location.data,
                isNew: false,
            }
        } else
        {
            let data = getEmptyBox('subject');
            this.state = {
                data: data,
                isNew: true,
            }
        }
    }

    handleData = (data) =>
    {
        // console.log('handling data');
        // console.log(data);

        // adds subject to database if it is new, otherwise updates already existing one
        if (this.state.isNew)
        {
            fetch(config.url + "/subjects", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(data)
            })
                .then((response) =>
                {
                    // console.log(response);
                    if (response.status === 201)
                    {
                        history.push("/subjects")
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
        } else
        {
            fetch(config.url + "/subjects/" + data.id, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(data)
            })
                .then((response) =>
                {
                    // console.log(response);
                    if (response.status === 204)
                    {
                        history.push("/subjects")
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

        return (
            <div className={classes.root}>
                <div className={classes.appBarSpacer}/>

                <div className={classes.boxDiv}>
                    <Box
                        justify="center"
                        data={this.state.data}
                        isInDetailPage={true}
                        callback={this.handleData}
                        isAdmin={this.props.userType === 'ADMIN'}
                        detailName={'subject'}
                    />
                </div>
                {this.props.userType !== 'ADMIN' &&
                <Marks data={this.props.userType === 'TEACHER' ? marksList : studentSubjectMarks}
                       logout={this.props.logout}
                       isTeacher={this.props.userType === 'TEACHER'}
                       className={classes.marks}
                       mainColumn={this.props.userType === 'TEACHER' ? 'Student' : 'Test'}
                       isInDetailPage={true}
                />}
            </div>
        );
    }
}

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: '10vh',
        flexDirection: 'column',
    },
    boxDiv: {
        width: 1100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: -(theme.spacing.unit * 5),
        [theme.breakpoints.down(330)]: {
            marginLeft: '15vw',
        }
    },
});

export default withStyles(styles)(withRouter(SubjectDetail))