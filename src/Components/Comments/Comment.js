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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import './comment.scss'
class Comment extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            comment: ''
        }
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }
    componentDidMount() {
        const { id } = this.props;
        this.props.getComments(id);
    }

    handleEditToggle = () => {
        this.setState({ isCommentEditing: !this.state.isCommentEditing })
    }

    deleteComment = (id) => {
        // axios.delete(`/api/comments/${comment_id}`)
        let comment_id = id;
        console.log('front-end hit', id)
        axios.delete(`/api/comment/${comment_id}`)
            .then(() => alert('Comment Deleted'))
            .catch(err => console.log(`Error: ${err.message}`));
    }

    render() {
        console.log(this.props)
        return (
            <>
                <Link className='link add-comment-link' to={`/addcomment/${this.props.id}`}>
                    <Button variant="contained" className="add-comment">Add a Comment</Button>
                </Link>
                <Container className="comments-container" fixed>
                    <Container className="mapped-comments">
                        {this.props.comments?.map(comment => (
                            <Box key={comment.comment_id} className="comments-test">
                                <Avatar className="comment-pic" alt={comment.username} src={comment.profile_pic} />
                                <span className="comment-owner">@{comment.username}: </span>
                                <section className='comment-details'>
                                    <article className="user-comment">
                                        {comment.user_comment}
                                        <span className="comment-timestamp">
                                            | {moment(comment.date_added).format("MMM Do YY")}
                                        </span>
                                    </article>
                                </section>
                                {comment.user_id === this.props.userID
                                    ?
                                    (<>
                                        <IconButton aria-label="delete" color="secondary" onClick={() => this.deleteComment(comment.comment_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <Link className='link edit-route-btn' to={`/editcomment/${comment.comment_id}`}>
                                            <IconButton aria-label="delete" color="primary" onClick={() => this.handleOpen()}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </IconButton>
                                        </Link>
                                    </>
                                    ) : null}
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