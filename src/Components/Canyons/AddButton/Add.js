import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Add = props => {
    return (
        <>
            <Link to='/add'>
                <Button variant="contained" color="primary">Add a Canyon</Button>
            </Link>
        </>
    );
}

export default Add;