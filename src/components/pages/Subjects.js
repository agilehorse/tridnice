import React from "react";
import BoxView from "../reusables/BoxView";
import {Avatar, withStyles} from "@material-ui/core";
import FilterableListComponent from "../reusables/FilterableListComponent";
import config from "../../config";
import Typography from "@material-ui/core/Typography";
import load from "../../resources/icons/load.svg";
import FilterView from "../reusables/FilterView";

//Subjects page
class Subjects extends FilterableListComponent
{
    constructor(props)
    {
        super(props);
        this.state = {
            list: [],
            filterableProperties: [],
            loading: true,
            name: 'subject',
        };
    }

    componentDidMount()
    {
        //gets list of subjects from DB
        fetch(config.url + "/subjects", {
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
                if (response.status === 200)
                {
                    response.json().then(backendData =>
                    {
                        // console.log(backendData);
                        this.setState({
                            list: backendData,
                            filterableProperties:
                                Object.keys(backendData[0])
                                    .filter(property => property !== 'id'),
                            loading: false,
                        })
                    });
                } else if (response.status === 403)
                {
                    this.props.logout();
                } else
                {
                    this.setState({loading: false})
                }
            })
            .catch((e) =>
                {
                    // console.log(e);
                    this.setState({loading: false})
                }
            );
    };

    render()
    {
        // console.log(this.state);
        const {classes} = this.props;
        return this.state.loading
            ?
            <div className={classes.progress}><Typography
                className={classes.loadingText}>Loading</Typography>
                <Avatar
                    style={{borderRadius: 0}}
                    clid="loadIcon"
                    src={load}
                    alt="loading icon"
                />
            </div>
            :
            <div>
                <div className={classes.appBarSpacer}/>
                <FilterView list={this.state.filterableProperties} parentCallBack={this.getFilterViewData}
                            pageName={"subjects"}/>
                <BoxView data={this.state.list} detailName={'subject'} isAdmin={this.props.isAdmin}/>
            </div>

    }
}

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,

    progress: {
        display: 'flex',
        margin: 'auto',
        marginTop: '41vh',
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginRight: theme.spacing.unit * 2,
        display: 'flex',
        alignItems: 'center',
        color: 'green',
        fontWeight: '600',
        fontSize: '1.5em'
    },
});

export default withStyles(styles)(Subjects);