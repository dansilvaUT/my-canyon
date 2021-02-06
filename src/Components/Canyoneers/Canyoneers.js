import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/reducers/userReducer';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner/Spinner';
import './canyoneers.scss';

class Canyoneers extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        console.log(this.props)
        return (
            <>
                <Header />
                <section className="canyoneers-dashboard">
                    <Typography className="heading canyoneers-header" variant="h3" >
                        Canyoneer Profiles
                </Typography>
                    {this.props.loading

                        ?
                        (
                            <Spinner />
                        )
                        :
                        (
                            <Container className="canyoneers-container" >
                                {this.props.users?.map(users => (
                                    <Card className="canyoneer-content" key={users.user_id}>
                                        <CardContent className="canyoneer-info">
                                            <Avatar className="canyoneer-pic" alt="display-user" src={users.profile_pic} />
                                            <Typography className='heading'variant="h5" component="h2">
                                                @{users.username}
                                            </Typography>
                                            <Typography className='description' variant="h6">
                                                {users.about}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link className='link' to={`/chat/${users.user_id}`}>
                                                <IconButton color="primary">
                                                    <FontAwesomeIcon icon={faComments} />
                                                </IconButton>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Container>
                        )}
                </section>
            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        users: reduxState.userReducer.users.data,
        loading: reduxState.userReducer.loading
    }
}
export default connect(mapStateToProps, { getUsers })(Canyoneers);