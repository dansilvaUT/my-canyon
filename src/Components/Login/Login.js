import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducers/userReducer';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            verPassword: '',
            registerView: false
        }
    }
    //TODO
    //CREATE HELPER FUNCTION TO CHECK FOR EMPTY FIELDS
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleView = () => {
        this.setState({ registerView: !this.state.registerView });
    }

    handleLogin = () => {
        const { username, password } = this.state;

        axios.post('/api/auth/login', { username, password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/canyons');
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }

    hanldeSignUp = () => {
        const { username, email, password } = this.state;
        axios.post('/api/auth/register', { username, email, password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/canyons');
            })
            .catch(err => console.log(`Error: ${err.message}`));
    }

    render() {
        return (
            <section>
                <h1>Welcome to MyCanyon!</h1>
                <section>
                    {this.state.registerView
                        ? (
                            <>
                                <h3>Sign Up</h3>
                                <input
                                    value={this.state.email}
                                    name='email'
                                    placeholder='Email'
                                    onChange={e => this.handleInputChange(e)}
                                />
                            </>
                        )
                        : <h3>Login</h3>}
                    <input
                        value={this.state.username}
                        name='username'
                        placeholder='Username'
                        onChange={e => this.handleInputChange(e)} />
                    <input
                        value={this.state.password}
                        name='password'
                        placeholder='Password'
                        type='password'
                        onChange={e => this.handleInputChange(e)}
                    />
                    {this.state.registerView
                        ? (
                            <>
                                <input
                                    value={this.state.verPassword}
                                    name='verPassword'
                                    placeholder='Verify Password'
                                    type='password'
                                    onChange={e => this.handleInputChange(e)}
                                />
                                <button onClick={()=>this.hanldeSignUp()}>Sign Up</button>
                                <p>Have an account? <span onClick={() => this.toggleView()}>Login here</span></p>
                            </>
                        )
                        : (
                            <>
                                <button onClick={() => this.handleLogin()}>Login</button>
                                <p>Don't have an account? <span onClick={() => this.toggleView()}>Sign up here</span></p>
                            </>
                        )}
                </section>
            </section>

        );
    }
}

export default connect(null, { getUser })(Login);