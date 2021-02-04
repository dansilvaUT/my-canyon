import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../redux/reducers/userReducer';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './header.scss';

const Header = (props) => {

    const [dropdownView, setDropdownView] = useState(false);

    //Keep user information on state througout the session on client side.
    useEffect(() => {
        axios.get('/api/auth/me')
            .then(user => props.getUser(user.data));
    });

    const toggleMenu = () => {
        setDropdownView(!dropdownView);
    }

    return (
        <header className='header-container'>
            <Typography className="header-heading" variant="h3" component="h2">
                My Canyon
            </Typography>
            <nav className='navbar'>
                <Link className='link nav-item' to='/canyons'>Canyons</Link>
                <Link className='link nav-item' to='/profile'>Profile</Link>
                <Link className='link nav-item' to='/canyoneers'>Canyoneers</Link>
                {/* <h4>Welcome {props.username}</h4> */}
            </nav>
            <FontAwesomeIcon className='dropdown' icon={faBars} onClick={toggleMenu} />
            {dropdownView
                ?
                (
                    <nav className='mobile-navbar fade-in'>
                        <Link className='link nav-item' to='/canyons'>Canyons</Link>
                        <Link className='link nav-item' to='/profile'>Profile</Link>
                        <Link className='link nav-item' to='/canyoneers'>Canyoneers</Link>
                        {/* <h4>Welcome {props.username}</h4> */}
                    </nav>

                )
                : null}

        </header>
    );
}

const mapStateToProps = reduxState => {
    return {
        username: reduxState.userReducer.user.username
    }
}
export default connect(mapStateToProps, { getUser })(Header);