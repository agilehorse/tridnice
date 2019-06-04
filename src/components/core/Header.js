import React from "react";
import AppBar from "@material-ui/core/AppBar/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import {Avatar, IconButton} from "@material-ui/core";
import bookIcon from "../../resources/icons/openBook.jpg";
import Typography from "@material-ui/core/Typography/index";
import UserMenu from "./UserMenu";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles/index";
import CssBaseline from "@material-ui/core/CssBaseline/index";
import styles from "../../resources/styles/Styles";
import menu from "../../resources/icons/menu.svg";

function Header(props)
{
    const {classes} = props;
    const isLoggedIn = props.data.loggedIn;
    return (
        <AppBar
            position="fixed"
            className={classNames(
                classes.appBar,
                props.menuVisible && classes.appBarShift,
            )}
        >
            <CssBaseline/>
            <Toolbar disableGutters={!props.menuVisible} className={classes.toolbar}>
                {isLoggedIn && (
                    <IconButton
                        aria-label="Open drawer"
                        onClick={isLoggedIn ? props.handleToggle : undefined}
                        className={classNames(
                            classes.menuButton,
                            props.menuVisible && classes.hide,
                        )}
                    >
                        <Avatar
                            style={{width: "30px", height: "30px"}}
                            clid="menuIcon"
                            src={menu}
                            alt="menu icon"
                        />
                    </IconButton>
                )}
                <Avatar
                    clid="headerIcon"
                    src={bookIcon}
                    alt="logo"
                    className={classes.bookIcon}
                />
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    School E-book
                </Typography>
            </Toolbar>
            {isLoggedIn && <UserMenu userName={props.data.userName} logout={props.logout}/>}
        </AppBar>
    );
}

export default withStyles(styles, {withTheme: true})(Header);
