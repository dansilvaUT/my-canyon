import { Component } from 'react';
import Header from '../../Components/Header/Header';
import axios from 'axios';
import { connect } from 'react-redux';
import Comment from '../../Components/Comments/Comment';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import EditCanyon from '../Canyons/EditCanyon/EditCanyon';
import Modal from 'react-modal';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Spinner from '../Spinner/Spinner';
import Rate from '../Rate/Rate';
import RatingDisplay from '../Rate/RatingDisplay';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';


import './canyon.scss';

class Canyon extends Component {
    constructor() {
        super();
        this.state = {
            canyon: {},
            weather: [],
            showModal: false,
            isRated: null
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);

        axios.get(`/api/canyon/${parsedID}`)
            .then(canyon => {
                this.setState({ canyon: canyon.data })
            });

        axios.get(`/api/checkrating/${parsedID}`)
            .then((res) => { this.setState({ isRated: res.data }); console.log('hit', res) })
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
        axios.post('/api/weather', { zipcode })
            .then(res => this.setState({ weather: res.data }))
            .catch(err => console.log(`Client Error: ${err.message}`));
    }

    convertToFarenheit = () => {
        let temp = this.state.weather.main?.temp;
        return ((9 / 5) * temp - 459.67).toFixed(2);
    }

    handleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { id } = this.props.match.params;
        const parsedID = parseInt(id);
        console.log('is rated?', this.state.isRated)
        const { canyon_id, canyon_description, canyon_pic } = this.state.canyon;
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
                                            <span className="canyon-rating">
                                                <RatingDisplay id={parsedID} />
                                            </span>
                                            {this.props.userID === this.state.canyon.canyon_owner
                                                ? (
                                                    <>
                                                        <Button
                                                            className="btn delete-canyon-btn"
                                                            variant="contained"
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => this.deleteCanyon(this.state.canyon.canyon_id)}
                                                        >
                                                            Delete
                                                    </Button>
                                                        <Button
                                                            onClick={() => this.handleModal()}
                                                            className="btn edit-canyon-btn"
                                                            variant="contained"
                                                            startIcon={<FontAwesomeIcon icon={faEdit} />}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Modal
                                                            className='add-canyon-modal'
                                                            overlayClassName="Overlay"
                                                            ariaHideApp={false}
                                                            isOpen={this.state.showModal}
                                                        >
                                                            <FontAwesomeIcon onClick={() => this.handleModal()} className='close-modal' icon={faTimesCircle} />
                                                            <EditCanyon canyonID={canyon_id} canyonDesc={canyon_description} canyonPic={canyon_pic} />
                                                        </Modal>
                                                    </>
                                                )
                                                : null}
                                        </section>
                                        <section className='weather-info'>
                                            <span className='weather-city'>{this.state.weather.name} </span>
                                            <span className={`weather-temp ${temp > 50 ? "warm" : "cold"}`}>Current Temp: {temp + '\u00B0 F '}</span>
                                            <FontAwesomeIcon className='temp' icon={faTemperatureLow} />
                                        </section>
                                        {this.state.isRated
                                            ? (
                                                null
                                            )
                                            : (
                                                <Rate canyon_id={canyon_id} />
                                            )}
                                        <article className="canyon-description">"{this.state.canyon.canyon_description}"</article>
                                    </Container>

                                    <Container className='render-comments'>
                                        <Typography className='heading display-comment-header' variant='h4'>Comments</Typography>
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