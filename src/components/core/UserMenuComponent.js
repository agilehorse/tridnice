import React from "react";
import Button from "@material-ui/core/Button/index";
import {Avatar, withStyles} from "@material-ui/core";
import profileIcon from "../../resources/icons/profile.jpg";
import Popper from "@material-ui/core/Popper/index";
import Grow from "@material-ui/core/Grow/index";
import Paper from "@material-ui/core/Paper/index";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/index";
import MenuList from "@material-ui/core/MenuList/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import Typography from "@material-ui/core/Typography/index";
import history from "../history";

const styles = theme => ({
    root: {
        display: "flex",
        marginLeft: "auto",
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
    name: {
        display: "flex",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
});

function UserMenuComponent(props)
{
    const {classes} = props;

    return (
        <div className={classes.root}>
            <Typography className={classes.name} variant="h6" noWrap>
                {props.userName}
            </Typography>
            <Button
                buttonRef={node =>
                {
                    props.data.anchorEl = node;
                }}
                aria-owns={props.data.menuVisible ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={props.handleToggle}
            >
                <Avatar src={profileIcon} alt="profile icon"/>
            </Button>
            <Popper
                open={props.data.menuVisible}
                anchorEl={props.data.anchorEl}
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={props.handleClose}>
                                <MenuList>
                                    <MenuItem onClick={() => history.push('/profile')}>Profile</MenuItem>
                                    <MenuItem onClick={props.logout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(UserMenuComponent);
