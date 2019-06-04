import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Typography, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DataToAdd from "../Utils/DataToAdd";

class TableView extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tableHead: null,
            tableBody: null,
            admin: true,
            editButton: {
                edit: "Add test",
                save: "Save marks",
            },
            edit: false,
            activeBut: "Add test",
            newData: new DataToAdd(),
            editableColumn: "",
        };
    }

    // creates head of table
    createHead(object)
    {
        const method = this;
        let keys = Object.keys(object);
        let headerRow = [];
        let i = 0;
        headerRow.push({type: "rowName", data: this.props.mainColumn});
        for (let item of object[keys[2]])
        {
            headerRow.push({type: "columnTitle", data: Object.keys(item)[0]});
            if (
                this.state.newData.column === "" &&
                Object.keys(item)[0] === this.state.editableColumn
            )
            {
                this.state.newData.addColumnName(i, Object.keys(item)[0]);
            }
            i++;
        }
        return (
            <TableHead className={this.props.classes.head}>
                {method.createRow(0, headerRow)}
            </TableHead>
        );
    }

    // creates a table body
    createBody(data)
    {
        let tableRows = [];
        let id = 0;
        for (let object of data)
        {
            let objectKeys = Object.keys(object);
            let listOfTexts = [];
            listOfTexts.push({type: "rowName", data: object[objectKeys[1]]});
            for (let listItem of object[objectKeys[2]])
            {
                listOfTexts.push({
                    type:
                        Object.keys(listItem)[0] !== this.state.editableColumn
                            ? "mark"
                            : "editable",
                    data: listItem[Object.keys(listItem)[0]],
                });
            }
            tableRows.push(this.createRow(id, listOfTexts));
            id++;
        }

        return <TableBody>{tableRows}</TableBody>;
    }

    // creates a table row
    createRow = (id, list) =>
    {
        let listOfCells = [];
        let i = 0;
        for (const item of list)
        {
            listOfCells.push(this.createCell(id, i, item));
            i++;
        }
        return (
            <TableRow key={id} className={id === 0 ? this.props.classes.headerRow : this.props.classes.row}>
                {listOfCells}
            </TableRow>
        );
    };

    // creates one cell
    createCell = (key, id, content) =>
    {
        if (content.data === 0 || content.data === "undef")
        {
            let type = content.data === "undef" ? "title" : "number";
            content.data = (
                <TextField
                    id={key + "i" + id}
                    margin="none"
                    className={
                        content.data === 0
                            ? this.props.classes.inputBoxMark
                            : this.props.classes.inputBoxHeader
                    }
                    variant="outlined"
                    onChange={e => this.addData(e, key, type)}
                />
            );
        } else if (content.type === "columnTitle")
        {
            const columnName = content.data;
            content.data = (
                this.props.isTeacher ?

                    <Button
                        className={this.props.classes.columnButton}
                        variant="outlined"
                        onClick={e => this.editColumn(columnName, e)}
                        color="secondary"
                    >
                        {content.data}
                    </Button>
                    :
                    <Typography className={this.props.classes.typog}>
                        {content.data}
                    </Typography>
            );
        } else if (content.type === "editable")
        {
            this.state.newData.addData(key, content.data);

            content.data = (
                <TextField
                    id={key + "i" + id}
                    margin="none"
                    className={
                        content.data === 0
                            ? this.props.classes.inputBoxMark
                            : this.props.classes.inputBoxHeader
                    }
                    variant="outlined"
                    onChange={e => this.addData(e, key, "number")}
                    defaultValue={content.data}
                />
            );
        }

        return (
            <TableCell size={'small'} key={id} className={id !== 0 ? this.props.classes.centeredCell : this.props.classes.cell}>
                {content.data}
            </TableCell>
        );
    };

    // listener for change in certain field
    addData = (e, id, type) =>
    {
        if (type === "title")
        {
            this.state.newData.addColumnName(e.target.value);
        } else
        {
            this.state.newData.addData(id, e.target.value);
        }
    };

    // listener for add new test button
    handleAdd = () =>
    {
        if (!this.state.edit)
        {
            this.setState({
                activeBut: this.state.editButton.save,
                edit: true,
            });
            this.props.createNew();
        } else
        {
            // console.log(this.state.newData.records);

            //kontrola zda jsou data ok v Marks.js
            let isOk = this.props.checkNewData(this.state.newData);
            // console.log("Tohle je ok", isOk);

            if (isOk)
            {
                this.setState({
                    activeBut: this.state.editButton.edit,
                    edit: false,
                    newData: new DataToAdd(),
                    editableColumn: "",
                });
                this.props.addData(this.state.newData);
            }
        }
    };

    // listener for edit of column
    editColumn = (columnId, e) =>
    {
        //console.log("editColum", e.target.textContent);
        this.state.newData.addColumnName(e.target.textContent);

        this.setState({
            activeBut: this.state.editButton.save,
            edit: true,
            editableColumn: columnId,
        });
    };

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.props.isTeacher && <Button
                    className={classes.addButton}
                    variant="outlined"
                    onClick={this.props.isTeacher && (() => this.handleAdd())}
                    color="primary"
                >
                    {this.state.activeBut}
                </Button>}
                <Paper className={classes.tablePaper}>
                    <Table>
                        {this.createHead(this.props.data[0])}
                        {this.createBody(this.props.data)}
                    </Table>
                </Paper>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "end",
        alignContent: "center",
        margin: theme.spacing.unit * 5,
        [theme.breakpoints.down("xs")]: {
            marginLeft: theme.spacing.unit * 5,
        },
        [theme.breakpoints.down(580)]: {
            marginLeft: '15vw',
            marginRight: 30,
        },
        [theme.breakpoints.down(330)]: {
            marginLeft: '25vw',
        }
    },

    head: {
        backgroundColor: '#2e7d32',
        "& tr > th ": {
            fontWeight: "900",
            fontSize: 'medium',
            color: 'white',
        },

    },

    row: {
        "&:hover": {
            backgroundColor: "lightGray",
        },
    },

    headerRow: {},

    separator: {
        paddingRight: theme.spacing.unit * 5,
    },

    addButton: {
        margin: "1ex",
        webkitBoxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
        mozBoxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
        boxShadow: "1px 1px 1px 1px rgba(173,173,173,1)",
    },

    tablePaper: {
        overflowX: 'auto',
        width: '85vw',
        webkitBoxShadow: "3px 2px 5px 0px rgba(173,173,173,1)",
        mozBoxShadow: "3px 2px 5px 0px rgba(173,173,173,1)",
        boxShadow: "3px 2px 5px 0px rgba(173,173,173,1)",
        [theme.breakpoints.down(580)]: {
            // marginRight: 30,
            maxWidth: '80vw'
        },
    },

    inputBoxHeader: {
        width: "8em",
    },

    inputBoxMark: {
        width: "4em",
    },

    columnButton: {
        fontWeight: "900",
        color: 'white',
        borderColor: 'white',
        fontSize: 'small',
        "&:hover": {
            backgroundColor: "lightGray",
            color: 'black',
            borderColor: 'white',
        },
    },
    centeredCell: {
        textAlign: 'center',
        paddingLeft: '1.5vw',
        paddingRight: '1.5vw',

    },

    typog: {
        fontWeight: "900",
        color: 'white',
        borderColor: 'white',
    }
});

export default withStyles(styles)(TableView);
