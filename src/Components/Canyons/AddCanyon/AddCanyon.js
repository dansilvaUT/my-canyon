import { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './addCanyon.scss';

class AddCanyon extends Component {
    constructor() {
        super();
        this.state = {
            canyonName: '',
            canyonPic: '',
            state: '',
            description: '',
            zipcode: null
        }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addCanyon = () => {
        const { canyonName, canyonPic, state, description, zipcode } = this.state;
        axios.post('/api/canyons', {
            canyon_name: canyonName,
            canyon_description: description,
            canyon_pic: canyonPic,
            canyon_state: state,
            zipcode
        })
            .then(() => {
                alert('Canyon Added!');
                window.location.reload();
            })
            .catch(err => console.log("error", err))
    }
    
    render() {
        // console.log(this.props)
        return (
            <section className='add-canyon-wrapper'>
                <Container className='add-canyon-container' fixed>
                    <Typography className='heading add-canyon-heading' variant='h2'>
                        Add a new Canyon here...
                </Typography>
                    <TextField
                        value={this.state.canyonName}
                        variant='filled'
                        label='Canyon Name'
                        name='canyonName'
                        onChange={e => this.handleInputChange(e)}
                    />
                    {this.state.canyonPic === ''
                        ?
                        (
                            <img
                                className='canyon-img-placeholder'
                                src='https://via.placeholder.com/150/2f373dFFFFFFC?Text=Digital.com'
                                alt='placeholder' />
                        )
                        :
                        (
                            <img
                                className='canyon-img-placeholder'
                                alt='canyon-to-be-added'
                                src={this.state.canyonPic} />
                        )
                    }

                    <TextField
                        className='input'
                        variant='filled'
                        label="What's it look like"
                        name='canyonPic'
                        onChange={e => this.handleInputChange(e)}
                    />
                    <TextField
                        className='input'
                        variant='filled'
                        label='Zipcode'
                        name='zipcode'
                        onChange={e => this.handleInputChange(e)}
                    />
                    <TextField
                        className='input'
                        variant='filled'
                        label='State'
                        name='state'
                        onChange={e => this.handleInputChange(e)}
                    />
                    <TextField
                        className='input'
                        id="filled-multiline-static"
                        label="Description"
                        name='description'
                        multiline
                        rows={6}
                        variant="filled"
                        onChange={e => this.handleInputChange(e)}
                    />
                    <Button className='submit-canyon-btn' variant="contained" onClick={() => this.addCanyon()}>
                        Add It!
                    <FontAwesomeIcon className='folder-icon' icon={faFolderPlus} />
                    </Button>
                </Container>
            </section>

        );
    }
}

export default AddCanyon;