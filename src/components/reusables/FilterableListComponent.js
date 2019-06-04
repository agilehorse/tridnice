import {Component} from 'react'
import config from "../../config";

class FilterableListComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            list: this.props.data,
        };
    }

    // asks for filtered data from backend, "childForm.filter" is the attribute which is filtered, "childForm.text" is the value
    getFilterViewData = childForm =>
    {
        let url = childForm === 'reset' ? '' : (childForm.filter + "/" + childForm.text);
        // console.log(`${config.url}/${this.state.name}s/${url}`);
        this.setState({loading: true});
        fetch(`${config.url}/${this.state.name}s/${url}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) =>
            {
                // console.log(response);
                if (response.status === 200)
                {
                    response.json().then(backendData =>
                    {
                        // console.log(backendData);
                        let newData = [];
                        if (!backendData)
                        {
                        } else if (!backendData.length)
                        {
                            newData.push(backendData);
                        } else
                        {
                            newData = backendData;

                        }
                        this.setState({
                            list: newData,
                            filterableProperties: this.state.filterableProperties,
                            loading: false,
                        })
                    });
                } else
                {
                    this.setState({loading: false})
                }
            })
            .catch((e) =>
                {
                    // console.log(e);
                    this.setState({loading: false})
                }
            );
    };
}

export default FilterableListComponent;