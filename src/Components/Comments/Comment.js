import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../redux/reducers/commentReducer';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AddComment from '../Comments/AddComment/AddComment';
import EditComment from '../Comments/EditComment/EditComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import './comment.scss'
const Comment = props => {

    const { getComments, id } = props;

    const [showAdd, setAdd] = useState(false);
    const [showEdit, setEdit] = useState(null);


    useEffect(() => {
        getComments(id);
    }, [getComments, id]);


    const handleAdd = () => {
        setAdd(!showAdd);
    }

    const editToggle = (index) => {
        // setEdit(!showEdit);
        console.log(index)
        setEdit(index);
    }

    const deleteComment = (id) => {
        let comment_id = id;
        axios.delete(`/api/comment/${comment_id}`)
            .then(() => {
                alert('Comment Deleted');
                window.location.reload();
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }

    console.log('comment', props)
    return (
        <>
            <Button variant="contained" className="add-comment" onClick={() => handleAdd()}>Comment</Button>
            {showAdd
                ?
                (
                    <AddComment canyonID={props.id} />
                ) :
                null}
            <Container className="comments-container">
                <Container className="mapped-comments">
                    {props.comments?.map((comment, index) => (
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
                                    {comment.user_id === props.userID
                                        ?
                                        (<>

                                            <FontAwesomeIcon className='delete-comment' icon={faTrashAlt} onClick={() => deleteComment(comment.comment_id)} />
                                            <FontAwesomeIcon className='edit-comment' id={index} icon={faEdit} onClick={() => editToggle(index)} />

                                            {showEdit === index
                                                ?
                                                (
                                                    <EditComment id={comment.comment_id} comment={comment.user_comment}/>
                                                )
                                                : null
                                            }
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

const mapStateToProps = reduxState => {
    return {
        comments: reduxState.commentReducer.comments.data,
        userID: reduxState.userReducer.user.user_id
    }
}

export default connect(mapStateToProps, { getComments })(Comment);