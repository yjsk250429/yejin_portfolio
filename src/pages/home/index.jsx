import Intro from '../../components/home/section1/Intro';
import WhoAmI from '../../components/home/section2/WhoAmI';
import Value from '../../components/home/section3/Value';
import Card from '../../components/home/section4/Card';
import Skills from '../../components/home/section5/Skills';
import Featured from '../../components/home/section6/Featured';
import Awards from '../../components/home/section7/Awards';
import Contact from '../../components/home/section8/Contact';
import './style.scss';

const Home = () => {
    return (
        <main className="home">
            <Intro />
            <WhoAmI />
            <Value />
            <Card />
            <Skills />
            <Featured />
            <Awards />
            <Contact />
        </main>
    );
};

export default Home;
