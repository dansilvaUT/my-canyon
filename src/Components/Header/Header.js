import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser, clearUser } from '../../redux/reducers/userReducer';
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

    const logout = () => {
        axios.get('/api/auth/logout')
            .then(() => props.clearUser());
    }
    // console.log(props)
    return (
        <header className='header-container'>
            <Typography className="header-heading" variant="h3" component="h2">
                My Canyon
            </Typography>
            <nav className='navbar'>
                <Link className='link nav-item' to='/canyons'><span>Canyons</span></Link>
                <Link className='link nav-item' to='/profile'><span>Profile</span></Link>
                <Link className='link nav-item' to='/canyoneers'><span>Canyoneers</span></Link>
                {props.id
                    ?
                    (
                        <Link className='link nav-item logout' to='/' onClick={logout}>Logout</Link>
                    )
                    :
                    null}
            </nav>
            <FontAwesomeIcon className='dropdown' icon={faBars} onClick={toggleMenu} />
            {dropdownView
                ?
                (
                    <nav className='mobile-navbar fade-in'>
                        <Link className='link nav-item' to='/canyons'>Canyons</Link>
                        <Link className='link nav-item' to='/profile'>Profile</Link>
                        <Link className='link nav-item' to='/canyoneers'>Canyoneers</Link>
                        {props.id
                            ?
                            (
                                <Link className='link nav-item logout' to='/' onClick={logout}>Logout</Link>
                            )
                            :
                            null}
                    </nav>

                )
                : null}

        </header>
    );
}

const mapStateToProps = reduxState => {
    return {
        id: reduxState.userReducer.user.user_id
    }
}
export default connect(mapStateToProps, { getUser, clearUser })(Header);