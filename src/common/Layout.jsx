import { Outlet, useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import ScrollToTop from './scrolltotop/ScrollToTop';
import MenuBar from './menu/MenuBar';

const Layout = () => {
    const { pathname } = useLocation();
    const showFooterPages = ['/', '/contact'];
    const showFooter = showFooterPages.includes(pathname);

    return (
        <div className="wrap">
            <ScrollToTop />
            <MenuBar />
            <Header />
            <main className="main">
                <Outlet />
            </main>
            {showFooter && <Footer />}
        </div>
    );
};

export default Layout;
