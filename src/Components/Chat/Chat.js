import { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import io from 'socket.io-client';

// import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

class Chat extends Component {
    constructor() {
        super();

        this.state = {
            message: "",
            messages: [],
            room: ""
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
    };

    render() {
        const messages = this.state.messages.map(obj => obj.message);
        console.log(this.props)
        return (
            <div>
                <Header />
                {messages}
                <input
                    value={this.state.message}
                    onChange={e => {
                        this.handleMessage(e.target.value);
                    }}
                />
                <button onClick={this.sendMsg}>Send Message!</button>
            </div>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        id: reduxState.userReducer.user?.user_id
    }
}

export default connect(mapStateToProps)(Chat);