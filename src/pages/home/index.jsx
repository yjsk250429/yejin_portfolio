import Intro from '../../components/home/section1/Intro';
import Value from '../../components/home/section2/Value';
import Card from '../../components/home/section3/Card';
import Skills from '../../components/home/section4/Skills';
import Featured from '../../components/home/section5/Featured';
import Awards from '../../components/home/section6/Awards';
import Contact from '../../components/home/section7/Contact';
import './style.scss';

const Home = () => {
    return (
        <main className="home">
            <Intro />
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
