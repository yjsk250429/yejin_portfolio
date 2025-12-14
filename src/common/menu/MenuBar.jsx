import { useNavigate } from 'react-router-dom';
import { useModalStore } from '../../store';
import NavBar from './NavBar';
import './style.scss';

const MenuBar = () => {
    const { menuOpen, closeMenu } = useModalStore();
    const navigate = useNavigate();

    if (!menuOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="all-menu">
                <div className="inner">
                    <NavBar />
                    <p className="close" onClick={closeMenu}>
                        <span></span>
                        <span></span>
                    </p>
                    <p
                        className="logo-page"
                        onClick={() => {
                            navigate('/about');
                            closeMenu();
                        }}
                    >
                        <img src="/images/J_logo_black_shadow.png" alt="logo" />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;
