import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { Switch, Route, Link } from 'react-router-dom';
import AddCanyon from '../AddCanyon/AddCanyon';
import { connect } from 'react-redux';
import { getCanyons } from '../../redux/reducers/canyonReducer';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './canyons.scss';
class Canyons extends Component {

    componentDidMount() {
        this.props.getCanyons();
    }


    render() {
        const { canyons } = this.props;
        return (
            <section className='canyons-container'>
                <Header />

                <Link to='/canyons/add'>
                    <button>Add Canyon</button>
                </Link>
                <Switch>
                    <Route path='/canyons/add' component={AddCanyon} />
                </Switch>
                <section className='canyons'>
                    {canyons?.map(canyon => (
                        <Link key={canyon.canyon_id} to={`/canyon/${canyon.canyon_id}`} className='canyon-link'>
                            <Card className='canyon-card' key={canyon.canyon_id}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        <img className='canyons-img' src={canyon.canyon_pic} alt={canyon.canyon_name} />
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {canyon.canyon_name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Rating: {canyon.canyon_rating}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        </Link>

                    ))}
                </section>

            </section>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        canyons: reduxState.canyonReducer.canyons.data
    }
}

export default connect(mapStateToProps, { getCanyons })(Canyons);