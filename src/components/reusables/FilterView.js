import React, {Component} from "react";
import {FormControl, Paper, TextField, withStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import * as ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import {translate} from "../resources";

class FilterView extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            formData: {
                filter: "",
                text: "",
            },
            selectItems: this.createFilterItems(this.props.list),
            labelWidth: 0,
            error: false,
        };
    }

    componentDidMount()
    {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    //handles change in filter form
    handleChange = event =>
    {
        const {formData} = this.state;
        if (event.target.name && event.target.value)
        {
            formData[event.target.name] = event.target.value;
            this.setState({
                formData,
                error: false
            });
        }
    };

    //sends data to parent component to send it to backend
    handleSubmit = () =>
    {
        const formData = this.state.formData;
        if (formData.filter && formData.text)
        {
            this.props.parentCallBack(formData);
        } else
        {
            this.setState({error: true})
        }
    };

    // similar to method above but calls for reseted data
    reset = () =>
    {
        this.props.parentCallBack('reset');
    };

    // creates items in select element
    createFilterItems = stringList =>
    {
        if (!stringList) return;
        let items = [];
        let i = 0;
        for (let item of stringList)
        {
            items.push(this.createFilterItem(i, item));
            i++;
        }
        return items;
    };

    // creates single item in select element
    createFilterItem = (id, attribute) =>
    {
        return (
            <MenuItem key={id} value={attribute}>
                {translate(attribute)}
            </MenuItem>
        );
    };

    render()
    {
        const state = this.state;
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref =>
                        {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-filter-simple"
                        className={classNames(classes.label, classes.formItem)}
                    >
                        Filter
                    </InputLabel>
                    <Select
                        value={state.formData.filter}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="filter"
                                id="outlined-filter-simple"
                            />
                        }
                        className={classNames(classes.select, classes.formItem)}
                        error={this.state.error && !this.state.formData.filter}
                    >
                        <MenuItem value=""/>
                        {state.selectItems}
                    </Select>
                    <TextField
                        className={classNames(classes.input, classes.formItem)}
                        name="text"
                        placeholder={"Search " + this.props.pageName}
                        onChange={this.handleChange}
                        onKeyPress={event =>
                        {
                            // console.log(event.key);
                            if (event.key === 'Enter')
                            {
                                this.handleSubmit()
                            }
                        }}
                        value={state.formData.text}
                        variant="outlined"
                        error={this.state.error && !this.state.formData.text}
                    />
                    <Button
                        className={classNames(classes.search, classes.formItem)}
                        onClick={this.reset}
                    >
                        Reset
                    </Button>
                    <Button
                        className={classNames(classes.search, classes.formItem)}
                        type="submit"
                        aria-label="Search"
                        onClick={this.handleSubmit}
                    >
                        <SearchIcon/>
                    </Button>
                </FormControl>
            </Paper>
        );
    }
}

const styles = theme => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto",
        },
        flexGrow: 1,
        [theme.breakpoints.down("xs")]: {
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    select: {
        width: "150px",
        marginRight: "2vw",
        color: "green",
    },
    label: {
        color: "green",
    },
    input: {
        marginLeft: 8,
        flexGrow: 1,
        color: "green",
        fontSize: "20px",
    },
    search: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    formControl: {
        margin: theme.spacing.unit,
        display: "flex",
        flexDirection: "row",
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
        margin: 5,
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
});

export default withStyles(styles)(FilterView);
