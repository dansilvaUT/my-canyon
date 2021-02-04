import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './add.scss';

const Add = () => {
    return (
        <>
            <Link class="link" to='/add'>
                <Button className='add-canyon'variant="contained">Add a Canyon</Button>
            </Link>
        </>
    );
}

export default Add;