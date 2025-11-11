import { Link } from 'react-router-dom';

const NavBar = ({ menu }) => {
    return (
        <nav className={menu ? 'nav show' : 'nav'}>
            <ul>
                <li>
                    <Link to="/" class="flip-animate">
                        <span data-hover="HOME">HOME</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile" class="flip-animate">
                        <span data-hover="PROFILE">PROFILE</span>
                    </Link>
                </li>
                <li>
                    <Link to="/journey" class="flip-animate">
                        <img src="/images/J_logo_white_shadow.png" alt="logo" />
                        <span data-hover="OURNEY">
                            {/* <img src="/images/J_logo_white_shadow.png" alt="logo" /> */}
                            OURNEY
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/work" class="flip-animate">
                        <span data-hover="WORK">WORK</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contact" class="flip-animate">
                        <span data-hover="CONTACT">CONTACT</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
