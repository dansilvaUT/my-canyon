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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import './canyoneers.scss';
class Canyoneers extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            messages: [],
            room: '',
            joined: false,
            startChat: false,
            user: ''
        }
    }
    componentDidMount() {
        this.props.getUsers();
    }

    startChat = () => {
        this.setState({ startChat: !this.state.startChat });
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
                                    <Avatar className="canyoneer-pic" alt="display-user" src={users.profile_pic} />
                                    <Typography variant="h5" component="h2">
                                        @{users.username}
                                    </Typography>
                                    <Typography variant="h6">
                                        {users.about}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link className='link' to={`/chat/${users.user_id}`}>
                                        <IconButton color="primary">
                                            <FontAwesomeIcon icon={faComments} />
                                        </IconButton>
                                    </Link>

                                    {/* {this.state.startChat
                                        ?
                                        (
                                            <div className="">
                                                {this.state.joined ? <h1>My Room: {this.state.room}</h1> : null}
                                                <div>
                                                    {this.state.messages.map(messageObj => <h2 key={messageObj.id}>{messageObj.message}</h2>)}
                                                </div>
                                                {
                                                    this.state.joined
                                                        ?
                                                        <div>
                                                            <input value={this.state.input} onChange={e => {
                                                                this.setState({
                                                                    input: e.target.value
                                                                })
                                                            }} />
                                                            <button onClick={this.sendMessage}>Send</button>
                                                        </div>
                                                        :
                                                        <div>
                                                            <input value={this.state.room} onChange={e => {
                                                                this.setState({
                                                                    room: e.target.value
                                                                })
                                                            }} />
                                                            <button onClick={this.joinRoom}>Join</button>
                                                        </div>
                                                }
                                            </div>
                                        ) : null} */}
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