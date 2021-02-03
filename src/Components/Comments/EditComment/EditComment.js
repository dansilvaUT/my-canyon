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
            comment: ''
        }
    }

    componentDidMount() {
        this.props.getComment(this.props.comment_id);
        this.setState({ comment: this.props.comment })
    }

    handleInputChange = value => {
        this.setState({ comment: value })
    }

    editComment = () => {
        const { comment_id: id } = this.state.comment;
        axios.put(`/api/comment/${id}`);
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
        comment: reduxState.commentReducer.comment.data?.user_comment
    }
}
export default connect(mapStateToProps, { getComment })(EditComment);