import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { connect } from 'react-redux';
import { getCanyonsByUserId } from '../../redux/reducers/canyonReducer';
import Container from '@material-ui/core/Container'
import UserCanyon from '../../Components/Profile/UserCanyons/UserCanyon';
import Button from '@material-ui/core/Button';

class Profile extends Component {
    //TODO
    //ADD CONDITIONAL RENDERING TO DISPLAY IMAGE PLACEHODER ONCE S3 IS SET UP

    componentDidMount() {
        this.props.getCanyonsByUserId(this.props.user.user_id);
    }

    render() {
        const { username, profile_pic, date_added, about, user_id } = this.props.user;
        console.log(this.props)
        return (
            <>
                <Header />
                <section>
                    <h1>{username}</h1>
                    {profile_pic
                        ? (
                            <img className='profile-pic' src={profile_pic} alt={username} />
                        )
                        : <img src='https://via.placeholder.com/150/d9f2c7/808080?Text=What do you look like' alt='placeholder_here' />
                    }

                    <h3>Member since {date_added}</h3>
                    <section>
                        {about === null
                            ? (
                                <>
                                    <p>Describe {username} here</p>
                                    <Link className='link description-link' to={`/description/${user_id}`}>
                                        <Button variant="filled" color="primary">Add Description</Button>
                                    </Link>

                                </>
                            )
                            : <div>{about}</div>}
                    </section>
                </section>
                <Container fixed>
                    <h1>My Canyons</h1>
                    <UserCanyon />
                </Container>
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