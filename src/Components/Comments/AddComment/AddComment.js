import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getCanyon } from '../../../redux/reducers/canyonReducer';
import axios from 'axios';
import { useState, useEffect } from 'react';
const AddComment = props => {
    const [comment, setComment] = useState('');

    const handleCommentInput = value => {
        setComment(value);
    }

    const handleCommentSubmit = () => {
        const { canyonID } = props;
        axios.post(`/api/comments/${canyonID}`, { comment })
            .then(() => {
                props.history.goBack();
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }

    useEffect(() => {
        const { id } = props.match.params;
        const parsedID = parseInt(id)
        props.getCanyon(parsedID)

    });
    return (
        <Container fixed>
            <h1>Add a comment</h1>
            <TextField
                variant='filled'
                label='Add a comment'
                name='comment'
                onChange={(e) => handleCommentInput(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={() => handleCommentSubmit()}>Comment</Button>
        </Container>
    );
}

const mapStateToProps = reduxState => {
    return {
        canyonID: reduxState.canyonReducer.canyon.data?.canyon_id
    }
}
export default connect(mapStateToProps, { getCanyon })(AddComment);