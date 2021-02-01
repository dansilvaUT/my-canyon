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
class Canyoneers extends Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        console.log(this.props.users)
        return (
            <>
                <Header />
                <Container fixed >
                    {this.props.users?.map(users => (
                        <Card key={users.user_id}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                <Avatar alt="Remy Sharp" src={users.profile_pic}/>
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {users.username}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                                <Button>Add Friend</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Container>
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