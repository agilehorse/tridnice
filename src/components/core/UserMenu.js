import React from "react";
import ContainerWithMenu from "../reusables/ContainerWithMenu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Avatar, withStyles} from "@material-ui/core";
import profileIcon from "../../resources/icons/profile.jpg";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import history from "../history";

class UserMenu extends ContainerWithMenu
{
    //closes user menu
    handleClose = event =>
    {
        if (this.state.anchorEl.contains(event.target))
        {
            return;
        }
        this.setState({menuVisible: false});
    };

    render()
    {
        const {classes} = this.props;
        const state = this.state;
        return (
            <div className={classes.root}>
                <Typography className={classes.name} variant="h6" noWrap>
                    {this.props.userName}
                </Typography>
                {/*Icon button*/}
                <Button
                    buttonRef={node =>
                    {
                        this.state.anchorEl = node;
                    }}
                    aria-owns={state.menuVisible ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                >
                    <Avatar src={profileIcon} alt="profile icon"/>
                </Button>
                {/*The menu*/}
                <Popper
                    open={state.menuVisible}
                    anchorEl={state.anchorEl}
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
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={() => history.push('/profile')}>Profile</MenuItem>
                                        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }
}

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

export default withStyles(styles, {withTheme: true})(UserMenu);
