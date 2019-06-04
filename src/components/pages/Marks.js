import React from "react";
import TableView from "../reusables/TableView";
import {withStyles} from "@material-ui/core";
import FilterableListComponent from "../reusables/FilterableListComponent";
import classNames from 'classnames'

//Marks page as well as component which can be used in other pages
class Marks extends FilterableListComponent
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: props.data,
            mainColumn: props.mainColumn || 'Subject',
        };
    }

    // creates a new empty list
    createNewTest = () =>
    {
        const newTest = {undef: 0};
        let data = this.state.data;
        data.forEach(elem =>
        {
            elem.marks.push(newTest);
            //console.log(elem);
        });
        this.setState({data: data});
    };

    // checks basic things, such as if the title is string and if the mark is between 1 - 5 otherwise throws error
    checkNewData = data =>
    {
        // console.log("marks", data);
        //cehcks if title exists
        if (data.column === "")
        {
            return false;
        }

        //checks if the mark is between 1 - 5
        let isNumbersCorrect = true;
        for (let el of data.records)
        {
            if (
                isNaN(parseInt(el.data)) ||
                parseInt(el.data) === undefined ||
                parseInt(el.data) < 1 ||
                5 < parseInt(el.data)
            )
            {
                isNumbersCorrect = false;
            }
        }

        if (!isNumbersCorrect)
        {
            return false;
        }

        //otherwise
        return true;
    };

    // adds new data and deletes the old ones
    addData = result =>
    {
        //console.log(result);
        // find test name
        let testName = result.column;

        // iterate over the students
        let data = this.state.data;
        data.forEach(elem =>
        {
            //adds new mark if it exists
            let test;
            let exist = false;
            for (let mark of elem.marks)
            {
                if (mark[testName])
                {
                    test = mark;
                    exist = true;
                }
            }

            if (!exist)
            {
                //removes last mark
                elem.marks.pop();

                //adjust key
                test = {bla: 0};
                test[testName] = "";
                delete test.bla;
            }

            let added = false;
            for (let el of result.records)
            {
                //important because of comparing with indexu +1
                if (el.id + 1 === elem.id)
                {
                    test[testName] = el.data;

                    if (!exist)
                    {
                        elem.marks.push(test);
                    }
                    added = true;
                    break;
                }
            }

            //if found
            if (!added)
            {
                test[testName] = "-";
                if (!exist)
                {
                    elem.marks.push(test);
                }
            }
        });

        this.setState({data: data});
    };

    render()
    {
        const {classes} = this.props;
        // console.log(this.props.isInDetailPage);
        return (
            <div
                className={classNames(classes.root, this.props.isInDetailPage ? classes.smallMargin : classes.bigMargin)}>
                <TableView
                    data={this.state.data}
                    mainColumn={this.state.mainColumn}
                    mapKey={this.mapKey}
                    createNew={() => this.createNewTest()}
                    addData={d => this.addData(d)}
                    checkNewData={d => this.checkNewData(d)}
                    isTeacher={this.props.isTeacher}
                />
            </div>
        );
    }
}

const styles = () => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: '2vw',
    },
    smallMargin: {
        marginTop: 0,
    },
    bigMargin: {
        marginTop: 50,
    },
});

export default withStyles(styles)(Marks);
