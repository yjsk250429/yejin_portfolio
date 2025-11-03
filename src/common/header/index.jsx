import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { useState } from 'react';

const Header = () => {
    const [menu, openMenu] = useState(false);

    return (
        <header id="header">
            <div className="inner">
                <h1>
                    <Link to="/">
                        <img src="/images/J_logo_white_shadow.png" alt="JungYejin" />
                    </Link>
                </h1>
                <p className={menu ? 'menu active' : 'menu'} onClick={() => openMenu(!menu)}>
                    <span></span>
                    <span></span>
                </p>
                <NavBar menu={menu} />
            </div>
        </header>
    );
};

export default Header;
