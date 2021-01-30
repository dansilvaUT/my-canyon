import { Component } from 'react';
import Header from '../../Components/Header/Header';
import axios from 'axios';

class Canyon extends Component {
    constructor() {
        super();
        this.state = {
            canyon: {}
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);

        axios.get(`/api/canyons/${parsedID}`)
            .then(canyon => {
                this.setState({ canyon: canyon.data})
            })
    }

    render() {
        return (
            <>
                <Header />
                Individual Canyon Here
                <h1>{this.state.canyon.canyon_name}</h1>
                <img src={this.state.canyon.canyon_pic} alt={this.state.canyon.canyon_name} />
                <p>Add by {this.state.canyon.username}</p>
                <p>{this.state.canyon.canyon_description}</p>
            </>
        );
    }
}

export default Canyon;