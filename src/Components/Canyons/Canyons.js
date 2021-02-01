import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCanyons } from '../../redux/reducers/canyonReducer';
import Search from '../Canyons/Search/Search';
import Add from '../Canyons/AddButton/Add';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './canyons.scss';

class Canyons extends Component {

    constructor() {
        super();
        this.state = {
            inputField: ''
        }
    }
    componentDidMount() {
        this.props.getCanyons();
    }

    render() {

        const { canyons } = this.props;
        return (
            <section className='canyons-container'>
                <Header />
                <section className='canyons'>
                    <Container className='search search-form-canyons'>
                        <Search onChange={e => this.setState({ inputField: e.target.value })} placeholder='Search for a Canyon' />
                        <Add />
                    </Container>
                    {canyons?.filter(canyon => (
                        canyon.canyon_name.toLowerCase().includes(this.state.inputField.toLowerCase())
                    )).map(canyon => (
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