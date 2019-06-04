import React, {Component} from "react";
import {Avatar, IconButton, withStyles} from "@material-ui/core";
import catIcon from "../../resources/icons/cat.jpg";
import Typography from "@material-ui/core/Typography/index";
import meow from "../../resources/cat-meow.mp3";
import styles from "../../resources/styles/Styles";

class Footer extends Component
{
    //plays meow sound, triggered when clicking on the cat icon in the footer
    meow = () =>
    {
        new Audio(meow).play();
    };

    render()
    {
        const {classes} = this.props;

        return (
            <footer className={classes.footer}>
                <Typography color="inherit" variant="h6" noWrap>
                    SmallCat Software
                </Typography>

                <IconButton className={classes.cat} onClick={this.meow}>
                    <Avatar color="inherit" src={catIcon}/>
                </IconButton>
            </footer>
        );
    }
}

export default withStyles(styles)(Footer);
