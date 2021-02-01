import { Component } from 'react';
import Header from '../../Components/Header/Header';
import axios from 'axios';
import Comment from '../../Components/Comments/Comment';
import './canyon.scss';

class Canyon extends Component {
    constructor() {
        super();
        this.state = {
            canyon: {},
            comments: []
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);

        axios.get(`/api/canyons/${parsedID}`)
            .then(canyon => {
                this.setState({ canyon: canyon.data })
            })
    }

    render() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);
        return (
            <>
                <Header />
                Individual Canyon Here
                <h1>{this.state.canyon.canyon_name}</h1>
                <img src={this.state.canyon.canyon_pic} alt={this.state.canyon.canyon_name} />
                <p>Add by {this.state.canyon.username}</p>
                <p>{this.state.canyon.canyon_description}</p>
                <h1>Comments</h1>
                <Comment id={parsedID}/>
            </>
        );
    }
}



export default Canyon;