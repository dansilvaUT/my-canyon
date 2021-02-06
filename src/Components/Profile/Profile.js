import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { connect } from 'react-redux';
import { getCanyonsByUserId } from '../../redux/reducers/canyonReducer';
import Container from '@material-ui/core/Container'
import UserCanyon from '../../Components/Profile/UserCanyons/UserCanyon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import './profile.scss';

class Profile extends Component {
    //TODO
    //ADD CONDITIONAL RENDERING TO DISPLAY IMAGE PLACEHODER ONCE S3 IS SET UP

    componentDidMount() {
        // this.props.user.user_id
        this.props.getCanyonsByUserId(2);
    }

    render() {
        const { username, profile_pic, date_added, about, user_id } = this.props.user;
        console.log(this.props)
        return (
            <>
                <Header />
                <section className="profile-container">
                    <section className="user-container">
                        <section className="user-info">
                            {profile_pic
                                ? (
                                    <img className='profile-pic' src={profile_pic} alt={username} />
                                )
                                : <img className='profile-pic' src='https://via.placeholder.com/150/d9f2c7/808080?Text=What do you look like' alt='placeholder_here' />
                            }
                            <Typography className='username-heading' variant="h4">@{username}</Typography>
                            <Typography className='member-heading'>Member since {moment(date_added).format("MMM Do YYYY")}</Typography>
                        </section>
                        <section className="profile-description">
                            {about === null
                                ? (
                                    <>
                                        <p>Describe {username} here</p>
                                        <Link className='link description-link' to={`/description/${user_id}`}>
                                            <Button variant="filled" color="primary">Add Description</Button>
                                        </Link>

                                    </>
                                )
                                : <div className="user-description">{about} my name is mulan i did it to save my father please beleive me. The lord of the rings the reutrn of the king. There canyonReducercno be any oone other that the one who is going to break the spell otherwise we will all die. Do you understan thatn?</div>}
                        </section>
                    </section>

                    <Container className="user-canyons-placeholder" fixed>
                        <Typography className='heading profile-canyon-heading'variant="h4">My Canyons</Typography>
                        <UserCanyon />
                    </Container>
                </section>

            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        user: reduxState.userReducer.user,
        userCanyons: reduxState.canyonReducer.userCanyons.data
    }
}

export default connect(mapStateToProps, { getCanyonsByUserId })(Profile);