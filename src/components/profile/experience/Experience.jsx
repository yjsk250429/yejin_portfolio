import './style.scss';

const cardsData = [
    {
        id: 'card-1',
        phase: 'Strength #01',
        top: 'UI/UX Design',
        main: ['User-Centered ', 'Interface'],
    },
    {
        id: 'card-2',
        phase: 'Strength #02',
        top: 'React Projects',
        main: ['Component ', 'Development'],
    },
    { id: 'card-3', phase: 'Strength #03', top: 'API Integration', main: ['Dynamic ', 'Web Apps'] },
    { id: 'card-4', phase: 'Strength #04', top: 'Animation', main: ['Interactive ', 'UI'] },
];

const indicesData = [
    { id: 'index-1', icon: 'color-palette-sharp', en: 'UI/UX Design', ko: '사용자 중심 화면 설계' },
    { id: 'index-2', icon: 'logo-react', en: 'React Projects', ko: '컴포넌트 기반 개발' },
    { id: 'index-3', icon: 'cloud-sharp', en: 'API Integration', ko: '실시간 데이터 연동' },
    { id: 'index-4', icon: 'sparkles-sharp', en: 'Animation', ko: 'GSAP & Lottie 활용' },
];

const Experience = () => {
    return (
        <section className="experience">
            <div className="sticky-header">
                <h1>
                    A Wide Range<span>of Experiences</span>
                </h1>
            </div>

            <div className="progress-bar">
                <div className="progress" />
            </div>

            <div className="indices">
                {indicesData.map((it) => (
                    <div className="index" id={it.id} key={it.id}>
                        <p>
                            <ion-icon name={it.icon}></ion-icon>
                        </p>
                        <p>{it.en}</p>
                        <p>{it.ko}</p>
                    </div>
                ))}
            </div>

            {cardsData.map((it) => (
                <article className="card" id={it.id} key={it.id}>
                    <div className="card-phase">{it.phase}</div>
                    <div className="card-title">
                        <p>{it.top}</p>
                        <h1>
                            {it.main[0]}
                            <span>{it.main[1]}</span>
                        </h1>
                    </div>
                </article>
            ))}
        </section>
    );
};

export default Experience;
