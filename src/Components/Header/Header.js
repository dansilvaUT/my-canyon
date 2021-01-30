import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../redux/reducers/userReducer';
import axios from 'axios';
const Header = (props) => {

    //Keep user information on state througout the session on client side.
    useEffect(() => {
        axios.get('/api/auth/me')
            .then(user => props.getUser(user.data));
    });

    return (
        <header>
            <h1>My Canyon</h1>
            <nav>
                <Link to='/canyons'>Canyons</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/canyoneers'>Canyoneers</Link>
                <h4>Welcome {props.username}</h4>
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