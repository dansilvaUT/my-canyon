import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Container from '@material-ui/core/Container';
import SubmitRating from '../SubmitRatingButton/SubmitRatingButton';
import axios from 'axios';
import './rate.scss';

const Rate = props => {

    const [rating, setRating] = useState(0);

    const handleRatingChange = number => {
        let parsedNum = parseInt(number)
        setRating(parsedNum);
    }

    const submitRating = () => {
        const { canyon_id } = props;
        console.log(rating)
        axios.post('/api/rating', { canyon_id, rating })
            .then(() => alert('Rating Submitted'))
            .catch(err => console.log(`Error: ${err.message}`));
    }

    return (
        <Container className='rating-container' fixed>
            <span>Rate me</span>
            <Container className='rating-controls'>
                <Rating
                    name='rating'
                    precision={0.5}
                    value={rating}
                    onChange={e => handleRatingChange(e.target.value)}
                />
                <SubmitRating submitRating={submitRating} />
            </Container>

        </Container>
    )
}

export default Rate;