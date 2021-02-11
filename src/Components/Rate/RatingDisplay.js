import { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './ratingDisplay.scss';

const RatingDisplay = props => {
    const [average, setAverage] = useState(0);

    useEffect(() => {
        const { id } = props;
        axios.get(`/api/avg/${id}`)
            .then(res => setAverage(res.data.average))
            .catch(err => console.log(`Error: ${err.message}`));
    });
    // console.log('average', average)
    return (
        <>
            <Container className='rating-display'>
                <Rating
                    className='rating-average'
                    value={average}
                    name='rating-average'
                    precision={0.5}
                    readOnly
                />
                <span>{average !== null
                    ? (
                        `(${average})`
                    )
                    : (0)
                }</span>
            </Container>


        </>
    )
}

export default RatingDisplay;