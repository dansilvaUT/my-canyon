import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const Description = props => {
    const [description, setDescription] = useState('');

    const handleInputChange = value => {
        setDescription(value);
    }

    const addDescription = () => {
        const { user_id: id } = props;
        axios.put(`/api/edit/${id}`, { description })
            .then(() => {
                alert('Description Added');
                props.history.goBack();
            })
            .catch(err => console.log(`Client Error: ${err.message}`));
    }
    console.log(props)
    return (
        <Container fixed>
            <TextField
                value={description}
                name='description'
                label='Description'
                type='text'
                multiline
                rows={6}
                onChange={e => handleInputChange(e.target.value)}
                variant='filled'
            />
            <Button className='btn sign-up-btn' variant="outlined" onClick={() => addDescription()}>Update Description</Button>
        </Container>
    );
}


const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.userReducer.user.user_id
    }
}
export default connect(mapStateToProps)(Description);
