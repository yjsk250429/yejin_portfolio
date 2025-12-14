import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';
import { IoIosArrowRoundUp } from 'react-icons/io';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={`topBtn ${visible ? 'show' : ''}`} onClick={handleClick}>
            <i>
                <IoIosArrowRoundUp />
            </i>
        </div>
    );
};

export default ScrollToTop;
