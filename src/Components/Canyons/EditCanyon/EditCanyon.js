import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCanyon } from '../../../redux/reducers/canyonReducer';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EditCanyon extends Component {

    constructor() {
        super();
        this.state = {
            canyonPic: '',
            description: ''
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);
        this.props.getCanyon(parsedID);

        const { canyonPic, canyonDesc } = this.props;
        this.setState({ canyonPic, description: canyonDesc })
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    editCanyon = () => {
        axios.put(`/api/canyon/${this.props.canyon_id}`, {
            canyon_pic: this.state.canyonPic,
            canyon_description: this.state.description
        })
            .then(() => {
                alert('Canyon has been updated');
                this.props.history.goBack();
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }

    render() {
        return (
            <Container fixed>
                <h1>Enter a new canyon here</h1>
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
                <Button variant="contained" color="primary" onClick={() => this.editCanyon()}>Update Canyon</Button>
            </Container>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        canyonPic: reduxState.canyonReducer.canyon.data?.canyon_pic,
        canyonDesc: reduxState.canyonReducer.canyon.data?.canyon_description,
        canyon_id: reduxState.canyonReducer.canyon.data?.canyon_id
    }
}

export default connect(mapStateToProps, { getCanyon })(EditCanyon);