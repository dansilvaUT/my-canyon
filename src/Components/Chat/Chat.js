import { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './chat.scss';

class Chat extends Component {
    constructor() {
        super();

        this.state = {
            message: '',
            messages: [],
            room: ''
        };
    }


    componentDidMount() {
        this.setSocketListeners();
        this.startChat();
        this.socket.on("startChat", messages => {
            this.chatStarted(messages);
        });
    }

    chatStarted = messages => {
        this.setState({
            messages: messages
        });
    };

    setSocketListeners = () => {
        this.socket = io();

        this.socket.on("sendMsg", messages => {
            this.setState({
                messages,
                message: ''
            });
        });
    };

    startChat = () => {
        this.socket.emit("endChat", this.state.chat);
        const viewedUserId = +this.props.match.params.id;
        const { id } = this.props;

        let greater;
        let lesser;

        if (viewedUserId > id) {
            greater = viewedUserId;
            lesser = id;
        } else {
            greater = id;
            lesser = viewedUserId;
        }

        const chatRoomId = greater + ":" + lesser;
        this.setState({
            room: chatRoomId
        });

        this.socket.emit("startChat", { chatRoomId, viewedUserId, id });
    };

    handleMessage = value => {
        this.setState({
            message: value
        });
    };

    sendMsg = () => {

        this.socket.emit("sendMsg", {
            room: this.state.room,
            message: this.state.message,
            user1: this.props.id
        });
        this.setState({ message: '' })
    };

    render() {
        const messages = this.state.messages.map(obj => (
            <Box className='messages' key={obj.message_id}>
                {this.props.id === obj.sender_id
                    ?
                    (
                        <section className="message-display-right">
                            <article className='my-message'>
                                {obj.message}
                                {/* <span className='time-stamp'>{moment(obj.date_sent).fromNow()}</span> */}
                            </article>
                            <span className='message-username'>{obj.username}</span>
                        </section>

                    )
                    :
                    (
                        <section className="message-display-left">
                            <span className='message-username'>{obj.username}</span>
                            <article className='other-message'>
                                {/* <span className='time-stamp'>
                                    {moment('hour').fromNow()}
                                </span> */}
                                {obj.message}
                            </article>
                        </section>

                    )
                }
            </Box>
        ));

        console.log(this.state.messages)
        return (
            <section className='chat-wrapper'>
                <Header />
                <Container className="chat-container" fixed>
                    <Container maxWidth="sm" className="messages-container">
                        {messages}
                    </Container>
                    <section className='chat-controls'>
                        <TextField
                            name='message'
                            label='Message'
                            className='message-input'
                            onChange={e => this.handleMessage(e.target.value)}
                            value={this.state.message}
                        />
                        <Button
                            onClick={this.sendMsg}
                            className="send-message-btn"
                            variant="contained"
                            startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                        >
                            Send
                </Button>
                    </section>

                </Container>

            </section>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        id: reduxState.userReducer.user?.user_id
    }
}

export default connect(mapStateToProps)(Chat);