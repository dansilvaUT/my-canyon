import { Component } from 'react';
import { connect } from 'react-redux';
import { getComment } from '../../../redux/reducers/commentReducer';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../comment.scss';


class EditComment extends Component {

    constructor() {
        super();
        this.state = {
            comment: this.props?.comment || ''
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);
        this.props.getComment(parsedID);
        this.setState({ comment: this.props?.comment })
    }

    handleInputChange = value => {
        this.setState({ comment: value })
    }

    editComment = () => {
        const { comment } = this.state;
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);

        axios.put(`/api/comment/${parsedID}`, { comment })
            .then(() => {
                alert('Comment Updated!');
                this.props.history.goBack();
            })
            .catch(err => console.log(`Client Error: ${err.message}`));
    }
    render() {
        return (
            <Container className='edit-modal' fixed>
                <TextField
                    variant='filled'
                    name='comment'
                    onChange={(e) => this.handleInputChange(e.target.value)}
                    value={this.state.comment}
                />
                <Button variant="contained" color="primary" onClick={() => this.editComment()}>Update</Button>
            </Container>


        );
    }
}

const mapStateToProps = reduxState => {
    return {
        comment: reduxState.commentReducer.comment.data?.user_comment,
        commentID: reduxState.commentReducer.comment.data?.comment_id
    }
}
export default connect(mapStateToProps, { getComment })(EditComment);