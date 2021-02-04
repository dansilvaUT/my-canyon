import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/reducers/userReducer';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import './canyoneers.scss';
class Canyoneers extends Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        console.log(this.props.users)
        return (
            <>
                <Header />
                <section className="canyoneers-dashboard">
                <Typography className="canyoneers-header" variant="h3" >
                    Canyoneer Profiles
                </Typography>
                <Container className="canyoneers-container" >
                    {this.props.users?.map(users => (
                        <Card className="canyoneer-content" key={users.user_id}>
                            <CardContent className="canyoneer-info">
                                <Avatar className="canyoneer-pic" alt="display-user" src={users.profile_pic}/>
                                <Typography variant="h5" component="h2">
                                    @{users.username}
                                </Typography>
                                <Typography variant="p">
                                    {users.about}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                                <Button>Add Friend</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Container>
                </section>
                
            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        users: reduxState.userReducer.users.data
    }
}
export default connect(mapStateToProps, { getUsers })(Canyoneers);