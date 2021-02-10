import { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../redux/reducers/commentReducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AddComment from '../Comments/AddComment/AddComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import './comment.scss'
class Comment extends Component {

    constructor() {
        super();
        this.state = {
            comment: '',
            showModal: false
        }
    }

    handleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.getComments(id);
    }

    deleteComment = (id) => {
        let comment_id = id;
        axios.delete(`/api/comment/${comment_id}`)
            .then(() => {
                alert('Comment Deleted');
                window.location.reload();
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }

    render() {
        console.log('comment', this.props.id)
        return (
            <>
                <Button variant="contained" className="add-comment" onClick={() => this.handleModal()}>Comment</Button>
                {this.state.showModal
                    ?
                    (
                        <AddComment canyonID={this.props.id} />
                    ) :
                    null}
                <Container className="comments-container">
                    <Container className="mapped-comments">
                        {this.props.comments?.map(comment => (
                            <Box key={comment.comment_id} className="comments-test">
                                <section className='author-details' >
                                    <Avatar className="comment-pic" alt={comment.username} src={comment.profile_pic} />
                                    <span className="comment-owner">@{comment.username}: </span>
                                </section>
                                <section className='comment-details'>
                                    <article className="user-comment">
                                        <span className="comment-timestamp">
                                            {moment(comment.date_added).format("MMM Do YY")}
                                        </span>
                                        <p className='comment'>{comment.user_comment}</p>
                                        {comment.user_id === this.props.userID
                                            ?
                                            (<>
                                                <IconButton className='delete' aria-label="delete" color="secondary" onClick={() => this.deleteComment(comment.comment_id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <Link className='link edit-route-btn' to={`/editcomment/${comment.comment_id}`}>
                                                    <IconButton className='edit' aria-label="delete" color="primary">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </IconButton>
                                                </Link>
                                            </>
                                            ) : null}
                                    </article>
                                </section>

                            </Box>
                        ))}
                    </Container>

                </Container>
            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        comments: reduxState.commentReducer.comments.data,
        userID: reduxState.userReducer.user.user_id
    }
}

export default connect(mapStateToProps, { getComments })(Comment);