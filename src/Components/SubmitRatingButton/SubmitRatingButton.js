import Button from '@material-ui/core/Button';
import './submitRatingButton.scss';

const SubmitRatingButton = props => {
    return (
        <section>
            <Button className='btn submit-rating-btn'
                variant='contained'
                onClick={() => props.submitRating()}>Submit Rating
            </Button>
        </section>
    )
}

export default SubmitRatingButton;