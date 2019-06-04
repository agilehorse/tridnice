import React, {Component} from "react"
import {IconButton, Tooltip} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer/index";
import List from "@material-ui/core/List/index";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles/index';
import Divider from "@material-ui/core/Divider/index";
import styles from "../../resources/styles/Styles"
import LeftArrow from '@material-ui/icons/ChevronLeft'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import history from '../history';

import {getMenuIcon, getMenuText} from '../resources'


class SideMenu extends Component
{
    constructor(props)
    {
        // console.log(props.userType);

        super(props);
        this.state = {
            menu: this.createMenu(this.getMenuItemTypes(props.userType)),
        }
    }

    //returns list of side menu items depending on which user type it is
    getMenuItemTypes(userType)
    {
        if (!userType) return;
        const map = {
            ADMIN: ['people', 'subjects', 'classes', 'timetable'],
            TEACHER: ['people', 'subjects', 'timetable'],
            STUDENT: ['people', 'subjects', 'timetable', 'marks'],
        };
        return map[userType];
    }

    // creates list of menu item components
    createMenu(menuItems)
    {
        if (!menuItems) return;
        let menu = [];
        for (let i = 0; i < menuItems.length; i++)
        {
            let menuItem = this.createMenuItem(i, menuItems[i]);
            menu.push(menuItem);
        }
        return menu;
    }

    // creates menu item component
    createMenuItem(id, itemType)
    {
        let menuText = getMenuText(itemType);
        return (
            <ListItem button key={id} onClick={() => SideMenu.handleClick(itemType)}>
                <Tooltip title={menuText} placement="right">
                    <ListItemIcon>
                        {getMenuIcon(itemType)}
                    </ListItemIcon>
                </Tooltip>

                <ListItemText style={{marginLeft: '-15px'}} primary={menuText}/>
            </ListItem>
        );
    }

    //goes to the page with url name of itemType
    static handleClick(itemType)
    {
        history.push('/' + itemType)
    }

    render()
    {
        const {classes} = this.props;
        const state = this.state;
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !this.props.menuVisible && classes.drawerPaperClose),
                }}
                open={this.props.menuVisible}
            >
                {/*Left arrow icon*/}
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.props.handleToggle}>
                        <LeftArrow/>
                    </IconButton>
                </div>
                <Divider/>
                {/*menu items*/}
                <List>{state.menu}</List>
            </Drawer>
        )
    }
}

export default withStyles(styles, {withTheme: true})(SideMenu);