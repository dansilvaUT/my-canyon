import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import './addComment.scss';
const AddComment = props => {
    const [comment, setComment] = useState('');

    const handleCommentInput = value => {
        setComment(value);
    }

    const handleCommentSubmit = () => {
        const { canyonID } = props;
        axios.post(`/api/comments/${canyonID}`, { comment })
            .then(() => {
                alert('Comment Added!');
                window.location.reload();
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }
    // console.log('add comment', props)
    return (
        <Container className='add-comment-container' fixed>
            <section className='comment-controls'>
                <TextField
                    label='Add a comment'
                    name='comment'
                    onChange={(e) => handleCommentInput(e.target.value)}
                />
                <FontAwesomeIcon className='submit-comment' icon={faCommentAlt} onClick={() => handleCommentSubmit()} />
            </section>

        </Container>
    );
}

export default AddComment;