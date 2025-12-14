import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../common/Layout';
import { About, Contact, Home, Journey, Profile, Work } from '../pages';
import ScrollToTop from '../common/scrolltotop/ScrollToTop';

export const MyRoutes = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/journey" element={<Journey />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
