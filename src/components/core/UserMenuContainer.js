import React from "react";
import UserMenuComponent from "./UserMenuComponent";
import ContainerWithMenu from "../reusables/ContainerWithMenu";

class UserMenuContainer extends ContainerWithMenu
{
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
        return (
            <UserMenuComponent
                handleToggle={this.handleToggle}
                handleClose={this.handleClose}
                data={this.state}
                logout={this.props.logout}
                userName={this.props.userName}
            />
        );
    }
}

export default UserMenuContainer;
