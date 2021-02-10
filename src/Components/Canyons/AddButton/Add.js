import Button from '@material-ui/core/Button';
import './add.scss';

const Add = props => {
    return (
        <>
            <Button className='btn add-canyon' variant="contained" onClick={props.openModal}>Add a Canyon</Button>
        </>
    );
}

export default Add;