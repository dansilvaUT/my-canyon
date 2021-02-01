import { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class AddCanyon extends Component {
    constructor() {
        super();
        this.state = {
            canyonName: '',
            canyonPic: '',
            rating: 1,
            city: '',
            state: '',
            description: ''
        }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addCanyon = () => {
        const { canyonName, canyonPic, rating, city, state, description } = this.state;
        axios.post('/api/canyons', {
            canyon_name: canyonName,
            canyon_description: description,
            canyon_pic: canyonPic,
            canyon_rating: rating,
            canyon_city: city,
            canyon_state: state
        })
            .then(() => this.props.history.push('/canyons'))
            .catch(err => console.log("error", err))

    }

    render() {
console.log(this.props)
        return (
            <Container fixed>
                <h1>Enter a new canyon here</h1>
                <TextField
                    value={this.state.canyonName}
                    variant='filled'
                    label='Canyon Name'
                    name='canyonName'
                    onChange={e => this.handleInputChange(e)}
                />
                <TextField
                    variant='filled'
                    label="What's it look like"
                    name='canyonPic'
                    onChange={e => this.handleInputChange(e)}
                />
                <TextField
                    label='Rating'
                    name='rating'
                    variant='filled'
                    type='number'
                    InputProps={{
                        inputProps: {
                            max: 5, min: 1
                        }
                    }}
                    onChange={e => this.handleInputChange(e)}
                />
                <TextField
                    variant='filled'
                    label='City'
                    name='city'
                    onChange={e => this.handleInputChange(e)}
                />
                <TextField
                    variant='filled'
                    label='State'
                    name='state'
                    onChange={e => this.handleInputChange(e)}
                />
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    name='description'
                    multiline
                    rows={6}
                    variant="filled"
                    onChange={e => this.handleInputChange(e)}
                />
                <Button variant="contained" color="primary" onClick={() => this.addCanyon()}>Add It!</Button>
            </Container>
        );
    }
}

export default AddCanyon;