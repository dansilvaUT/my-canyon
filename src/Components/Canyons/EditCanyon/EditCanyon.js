import { Component } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import './editCanyon.scss';

class EditCanyon extends Component {

    constructor() {
        super();
        this.state = {
            canyonPic: '',
            description: ''
        }
    }
    componentDidMount() {
        const { canyonPic, canyonDesc } = this.props;
        this.setState({ canyonPic, description: canyonDesc });
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    editCanyon = () => {
        axios.put(`/api/canyon/${this.props.canyonID}`, {
            canyon_pic: this.state.canyonPic,
            canyon_description: this.state.description
        })
            .then(() => {
                alert('Canyon has been updated');
                window.location.reload();
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }

    render() {
        console.log('edit canyon', this.props)
        return (
            <section className='edit-canyon-wrapper'>
                <Container className='edit-canyon-container' fixed>
                    <Typography className='heading' variant='h4'>
                        Submit your Edits here...
                </Typography>
                    <img className='current-canyon' alt='current-canyon' src={this.state.canyonPic}/>
                    <TextField
                        variant='filled'
                        name='canyonPic'
                        onChange={e => this.handleInputChange(e)}
                        value={this.state.canyonPic}
                    />
                    <TextField
                        id="filled-multiline-static"
                        name='description'
                        multiline
                        rows={6}
                        variant="filled"
                        onChange={e => this.handleInputChange(e)}
                        value={this.state.description}

                    />
                    <Button className='submit-canyon-edit' variant="contained" onClick={() => this.editCanyon()}>
                        Update Canyon
                    <FontAwesomeIcon className='folder-icon' icon={faFolderPlus} />
                    </Button>
                </Container>
            </section>
        );
    }
}

export default EditCanyon;