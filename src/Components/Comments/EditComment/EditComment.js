import { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import './editComment.scss';


class EditComment extends Component {

    constructor() {
        super();
        this.state = {
            comment: ''
        }
    }

    componentDidMount() {
        this.setState({ comment: this.props.comment })
    }

    handleInputChange = value => {
        this.setState({ comment: value })
    }

    editComment = () => {
        const { comment } = this.state;
        const { id } = this.props;

        axios.put(`/api/comment/${id}`, { comment })
            .then(() => {
                alert('Comment Updated!');
                window.location.reload();
            })
            .catch(err => console.log(`Client Error: ${err.message}`));
    }


    render() {
        console.log(this.props);
        return (
            <Container className='edit-modal' fixed>
                <TextField
                    variant='filled'
                    name='comment'
                    onChange={(e) => this.handleInputChange(e.target.value)}
                    value={this.state.comment}
                />
                <Button className='btn submit-edit' variant="contained" onClick={() => this.editComment()}>Update</Button>
            </Container>


        );
    }
}

export default EditComment;