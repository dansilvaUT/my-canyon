import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../redux/reducers/userReducer';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import './header.scss';

const Header = (props) => {

    //Keep user information on state througout the session on client side.
    useEffect(() => {
        axios.get('/api/auth/me')
            .then(user => props.getUser(user.data));
    });

    return (
        <header className='header-container'>
            <Typography variant="h3" component="h2">
                My Canyon
            </Typography>
            <nav className='navbar'>
                <Link className='link nav-item' to='/canyons'>Canyons</Link>
                <Link className='link nav-item' to='/profile'>Profile</Link>
                <Link className='link nav-item' to='/canyoneers'>Canyoneers</Link>
                {/* <h4>Welcome {props.username}</h4> */}
            </nav>
        </header>
    );
}

const mapStateToProps = reduxState => {
    return {
        username: reduxState.userReducer.user.username
    }
}
export default connect(mapStateToProps, { getUser })(Header);