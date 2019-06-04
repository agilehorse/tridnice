import {Component} from "react";

class ContainerWithMenu extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            menuVisible: false,
        };
    }

    //toggles if the menu opening
    handleToggle = () =>
        this.setState(state => ({menuVisible: !state.menuVisible}));
}

export default ContainerWithMenu;
