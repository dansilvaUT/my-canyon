import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>My Canyon</h1>
            <nav>
                <Link to='/canyons'>Canyons</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/canyoneers'>Canyoneers</Link>
            </nav>
        </header>
    );
}

export default Header;