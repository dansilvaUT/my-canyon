import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducers/userReducer';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.scss';

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
            <Container className='main' maxWidth='md'>
                <h1 className='heading welcome-heading'>Welcome to MyCanyon!</h1>
                <section className='login'>
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
                                />
                            </>
                        )
                        : <h3 className='toggle-header'>Login</h3>}
                    {/* <input
                        value={this.state.username}
                        name='username'
                        placeholder='Username'
                        onChange={e => this.handleInputChange(e)} /> */}
                    <TextField
                        value={this.state.username}
                        label='Username'
                        name='username'
                        onChange={e => this.handleInputChange(e)}
                        variant="filled"

                    />
                    <TextField
                        value={this.state.password}
                        name='password'
                        label='Password'
                        type='password'
                        onChange={e => this.handleInputChange(e)}
                        variant='filled'
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
                                />
                                <Button className='btn sign-up-btn' variant="outlined" onClick={() => this.hanldeSignUp()}>Sign Up</Button>
                                <p>Have an account? <span className='toggle-span' onClick={() => this.toggleView()}>Login here</span></p>
                            </>
                        )
                        : (
                            <>
                                <Button className='btn login-btn' variant="outlined" onClick={() => this.handleLogin()}>Login</Button>
                                <p>Don't have an account? <span className='toggle-span' onClick={() => this.toggleView()}>Sign up here</span></p>
                            </>
                        )}
                </section>
            </Container>

        );
    }
}

export default connect(null, { getUser })(Login);