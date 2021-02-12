import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from '../../Canyons/Search/Search';
import { getCanyonsByUserId } from '../../../redux/reducers/canyonReducer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import RatingDisplay from '../../Rate/RatingDisplay';
import '../../Canyons/canyons.scss';

const Canyons = props => {

    const [inputField, setInputField] = useState('');

    const { getCanyonsByUserId, userID } = props;
    useEffect(() => {
        getCanyonsByUserId(userID);
    }, [getCanyonsByUserId, userID])

    // console.log(props);
    const { userCanyons } = props;
    return (
        <>
            <section className='canyons-container'>

                <section className='canyons'>
                    <Container className='search search-form-canyons'>
                        <Search onChange={e => setInputField(e.target.value)} placeholder='Search for a Canyon' />
                    </Container>
                    {userCanyons?.filter(canyon => (
                        canyon.canyon_name.toLowerCase().includes(inputField.toLowerCase())
                    )).map(canyon => (
                        <Link key={canyon.canyon_id} to={`/canyon/${canyon.canyon_id}`} className='canyon-link'>
                            <Card className='canyon-card' key={canyon.canyon_id}>
                                <CardContent>
                                    <img className='canyons-img' src={canyon.canyon_pic} alt={canyon.canyon_name} />
                                    <Typography className='canyon-name' variant="h5" component="h2">
                                        {canyon.canyon_name}
                                    </Typography>
                                        Rating: <RatingDisplay id={canyon.canyon_id}/>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </section>

            </section>
        </>

    );

}

const mapStateToProps = reduxState => {
    return {
        userCanyons: reduxState.canyonReducer.userCanyons.data,
    }
}

export default connect(mapStateToProps, { getCanyonsByUserId })(Canyons);