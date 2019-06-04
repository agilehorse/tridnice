import React, {Component} from 'react'
import Box from "../reusables/Box";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router";
import {getEmptyBox} from "../resources"
import config from "../../config";
import history from "../history";
import MenuItem from "@material-ui/core/MenuItem";

//User detail page
class UserDetail extends Component
{
    constructor(props)
    {
        super(props);
        let list = [
            <MenuItem key={0} value={'ADMIN'}>ADMIN</MenuItem>,
            <MenuItem key={1} value={'STUDENT'}>STUDENT</MenuItem>,
            <MenuItem key={2} value={'TEACHER'}>TEACHER</MenuItem>
        ];
        if (this.props.location.data)
        {
            this.state = {
                data: this.props.location.data,
                isNew: false,
                selectList: {
                    role: list,
                },
            }
        } else
        {
            let data = getEmptyBox('user');
            this.state = {
                data: data,
                isNew: true,
                selectList: {
                    role: list,
                },
            }
        }
    }

    handleData = (data) =>
    {
        // console.log('handling data');
        // console.log(data);

        // adds user to database if it is new, otherwise updates already existing one
        if (this.state.isNew)
        {
            fetch(config.url + "/users", {
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
                        history.push("/people")
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
            fetch(config.url + "/users/" + data.id, {
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
                        history.push("/people")
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
                <Box
                    justify="center"
                    image={undefined}
                    data={this.state.data}
                    isInDetailPage={true}
                    callback={this.handleData}
                    propertyToEditability={this.state.propertyToEditability}
                    isAdmin={this.props.userType === 'ADMIN'}
                    isNew={this.state.isNew}
                    detailName={'user'}
                    selectList={this.state.selectList}
                />
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
    }
});

export default withStyles(styles)(withRouter(UserDetail))