import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container'
import UserCanyon from '../../Components/Profile/UserCanyons/UserCanyon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PicUpload from './PicUpload';
import Modal from 'react-modal';
import Description from './Description/Description';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './profile.scss';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    handleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { username, profile_pic, date_added, about } = this.props.user;
        // console.log(this.props.user)
        return (
            <>
                <Header />
                <section className="profile-container">
                    <section className="user-container">
                        <section className="user-info">
                            {profile_pic
                                ? (
                                    <>
                                        <img className='profile-pic' src={profile_pic} alt={username} />
                                    </>
                                )
                                :
                                <PicUpload />
                            }
                            <Typography className='username-heading' variant="h4">@{username}</Typography>
                            <Typography className='member-heading' variant='h6'>Member since {moment(date_added).format("MMM Do YYYY")}</Typography>
                        </section>
                        <section className="profile-description">
                            {about === null
                                ? (
                                    <>
                                        <Button variant="filled" className='add-description-user' onClick={() => this.handleModal()} >Add Description</Button>
                                        <Modal
                                            className='add-canyon-modal'
                                            overlayClassName="Overlay"
                                            ariaHideApp={false}
                                            isOpen={this.state.showModal}
                                        >
                                            <FontAwesomeIcon onClick={() => this.handleModal()} className='close-modal' icon={faTimesCircle} />
                                            <Description />
                                        </Modal>
                                    </>
                                )
                                : <div className="user-description">{about}</div>}
                        </section>
                    </section>

                    <Container className="user-canyons-placeholder" fixed>
                        <Typography className='heading profile-canyon-heading' variant="h4">My Canyons</Typography>
                        <UserCanyon userID={this.props.user.user_id} />
                    </Container>
                </section>

            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        user: reduxState.userReducer.user
    }
}

export default connect(mapStateToProps)(Profile);