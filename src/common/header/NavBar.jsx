import { Link } from 'react-router-dom';

const NavBar = ({ menu }) => {
    return (
        <nav className={menu ? 'nav show' : 'nav'}>
            <ul>
                <li>
                    <Link to="/about">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/journey">
                        <img src="/images/J_logo_white_shadow.png" alt="logo" />
                        ourney
                    </Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
