import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCanyons } from '../../redux/reducers/canyonReducer';
import { getCanyonsByUserId } from '../../redux/reducers/canyonReducer';
import Search from '../Canyons/Search/Search';
import Add from '../Canyons/AddButton/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Spinner from '../Spinner/Spinner';
import Modal from 'react-modal';
import AddCanyon from '../Canyons/AddCanyon/AddCanyon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import RatingDisplay from '../Rate/RatingDisplay';
import './canyons.scss';

class Canyons extends Component {

    constructor() {
        super();
        this.state = {
            inputField: '',
            showModal: false
        }
    }
    componentDidMount() {
        this.props.getCanyons();
    }


    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { canyons } = this.props;
        // console.log(this.props);
        return (
            <>
                <Container className='canyons-container'>
                    <section className='search search-form-canyons'>
                        <Search onChange={e => this.setState({ inputField: e.target.value })} placeholder='Search for a Canyon' />
                        <Add openModal={this.handleOpenModal} />
                        <Modal
                            className='add-canyon-modal'
                            overlayClassName="Overlay"
                            ariaHideApp={false}
                            isOpen={this.state.showModal}
                        >
                            <FontAwesomeIcon className='close-modal' onClick={this.handleCloseModal} icon={faTimesCircle} />
                            <AddCanyon />
                        </Modal>

                    </section>
                    <section className='canyons'>
                        {this.props.loading
                            ? (
                                <Spinner />
                            )
                            : (
                                <>
                                    {canyons?.filter(canyon => (
                                        canyon.canyon_name.toLowerCase().includes(this.state.inputField.toLowerCase())
                                    )).map(canyon => (
                                        <Link key={canyon.canyon_id} to={`/canyon/${canyon.canyon_id}`} className='canyon-link'>
                                            <Card className='canyon-card' key={canyon.canyon_id}>
                                                <CardContent>
                                                    <img className='canyons-img' src={canyon.canyon_pic} alt={canyon.canyon_name} />
                                                    <Typography className="canyon-name" variant="h5" component="h2">
                                                        {canyon.canyon_name}
                                                    </Typography>
                                                        <RatingDisplay id={canyon.canyon_id}/>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </>
                            )}
                    </section>
                </Container>
            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        canyons: reduxState.canyonReducer.canyons.data,
        loading: reduxState.canyonReducer.isLoading
    }
}

export default connect(mapStateToProps, { getCanyons, getCanyonsByUserId })(Canyons);