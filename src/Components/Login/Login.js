import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducers/userReducer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import './login.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            verPassword: '',
            registerView: false,
            message: '',
            error: false
        }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleView = () => {
        this.setState({ registerView: !this.state.registerView });
    }

    toggleError = () => {
        this.setState({ error: !this.state.error });
    }

    handleError = message => {
        this.setState({ message });
        this.toggleError();
        setTimeout(() => {
            this.setState({ message: '' });
            this.toggleError();
        }, 1500);
    }

    handleLogin = () => {
        const { username, password } = this.state;
        if (username === '' || password === '') {
            return this.handleError('All fields must be filled out!');
        }
        axios.post('/api/auth/login', { username, password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/profile');
            })
            .catch(err => {
                console.log(`Error: ${err.message}`);
                this.handleError(err.response.data);
            });
    }

    hanldeSignUp = () => {
        const { username, email, password, verPassword } = this.state;
        if (username === '' || email === '' || password === '') {
            return this.handleError('All fields must be filled out!');
        }
        if (password !== verPassword) {
            return this.handleError('Passwords do not match!');
        }

        axios.post('/api/auth/register', { username, email, password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/canyons');
            })
            .catch(err => {
                console.log(`Error: ${err.message}`);
                this.handleError(err.response.data);
            });
    }

    render() {
        return (
            <section className='main'>
                <h1 className='heading welcome-heading'>Welcome to MyCanyon!</h1>
                <section className='login'>
                    {this.state.error
                        ? <Alert severity="error">{this.state.message}</Alert>
                        : null
                    }

                    {this.state.registerView
                        ? (
                            <>
                                <h3 className='toggle-header'>Sign Up</h3>
                                <TextField
                                    value={this.state.email}
                                    name='email'
                                    label='Email'
                                    onChange={e => this.handleInputChange(e)}
                                    variant='filled'
                                    className='input input-login fade-in fade-out'
                                />
                            </>
                        )
                        : <h3 className='toggle-header'>Login</h3>}
                    <TextField
                        value={this.state.username}
                        label='Username'
                        name='username'
                        onChange={e => this.handleInputChange(e)}
                        variant="filled"
                        className='input input-login'
                    />
                    <TextField
                        value={this.state.password}
                        name='password'
                        label='Password'
                        type='password'
                        onChange={e => this.handleInputChange(e)}
                        variant='filled'
                        className='input input-login'
                    />
                    {this.state.registerView
                        ? (
                            <>
                                <TextField
                                    value={this.state.verPassword}
                                    name='verPassword'
                                    label='Verify Password'
                                    type='password'
                                    onChange={e => this.handleInputChange(e)}
                                    variant='filled'
                                    className='input input-login fade-in fade-out'
                                />
                                <Button className='btn sign-up-btn' variant="outlined" onClick={() => this.hanldeSignUp()}>Sign Up</Button>
                                <p className='toggle-queue'>Have an account? <span className='toggle-span' onClick={() => this.toggleView()}>Login here</span></p>
                            </>
                        )
                        : (
                            <>
                                <Button className='btn login-btn' variant="contained" onClick={() => this.handleLogin()}>Login</Button>
                                <p className='toggle-queue'>Don't have an account? <span className='toggle-span' onClick={() => this.toggleView()}>Sign up here</span></p>
                            </>
                        )}
                </section>
            </section>

        );
    }
}

export default connect(null, { getUser })(Login);