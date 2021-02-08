import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Comment from '../../Components/Comments/Comment';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Spinner from '../Spinner/Spinner';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';


import './canyon.scss';

class Canyon extends Component {
    constructor() {
        super();
        this.state = {
            canyon: {},
            weather: []
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);

        axios.get(`/api/canyon/${parsedID}`)
            .then(canyon => {
                this.setState({ canyon: canyon.data })
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.weather === this.state.weather) {
            this.getWeather(this.state.canyon.zipcode);
        }
    }

    deleteCanyon = (id) => {
        axios.delete(`/api/canyons/${id}`)
            .then(() => {
                alert('Canyon deleted');
                this.props.history.push('/canyons');
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }

    getWeather = (zipcode) => {
        console.log(zipcode)
        axios.post('/api/weather', { zipcode })
            .then(res => this.setState({ weather: res.data }))
            .catch(err => console.log(`Client Error: ${err.message}`));
    }

    convertToFarenheit = () => {
        let temp = this.state.weather.main?.temp;
        return ((9 / 5) * temp - 459.67).toFixed(2);
    }

    render() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);
        console.log(this.state.weather)
        const { canyon_id } = this.state.canyon;
        let temp = this.convertToFarenheit(this.state.weather.weather?.temp);
        return (
            <>
                <Header />
                {this.props.loading
                    ?
                    (
                        <Spinner />
                    )
                    :
                    (
                        <section className="canyon-container">
                            <Container className='canyon-content'>
                                <Typography className='heading canyon-heading-name' variant="h3">
                                    {this.state.canyon.canyon_name}
                                </Typography>
                                <section className='side-by-side'>
                                    <Container fixed>
                                        <img className='canyon-img' src={this.state.canyon.canyon_pic} alt={this.state.canyon.canyon_name} />
                                        <section className="canyon-owner-details">
                                            <span className="canyon-owner">Added by @{this.state.canyon.username}</span>
                                            <span className="canyon-rating">Rating: {this.state.canyon.canyon_rating}</span>
                                            {this.props.userID === this.state.canyon.canyon_owner
                                                ? (
                                                    <>
                                                        <Button
                                                            className="delete-canyon-btn"
                                                            variant="contained"
                                                            color="secondary"
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => this.deleteCanyon(this.state.canyon.canyon_id)}
                                                        >
                                                            Delete
                                                    </Button>
                                                        <Link className="link" to={`/editcanyon/${canyon_id}`}>
                                                            <Button
                                                                className="edit-canyon-btn"
                                                                variant="contained"
                                                                startIcon={<FontAwesomeIcon icon={faEdit} />}
                                                            >
                                                                Edit
                                                    </Button>
                                                        </Link>

                                                    </>
                                                )
                                                : null}
                                        </section>
                                        <section className='weather-info'>
                                            <span className='weather-city'>{this.state.weather.name} </span>
                                            <span className='weather-temp'>Current Temp: {temp + '\u00B0' + ' F '}</span>
                                            <FontAwesomeIcon className='temp' icon={faTemperatureLow} />
                                        </section>
                                        <article className="canyon-description">"{this.state.canyon.canyon_description}"</article>
                                    </Container>

                                    <Container className='render-comments' fixed>
                                        <Typography className='display-comment-header' variant='h4'>Comments</Typography>
                                        <Comment id={parsedID} />
                                    </Container>
                                </section>

                            </Container>
                        </section >
                    )
                }
            </>
        );
    }
}


const mapStateToProps = reduxState => {
    return {
        userID: reduxState.userReducer.user.user_id,
        loading: reduxState.canyonReducer.isLoading
    }
}
export default connect(mapStateToProps)(Canyon);