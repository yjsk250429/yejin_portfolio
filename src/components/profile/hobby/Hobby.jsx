import './style2.scss';
const hobbyArr = [
    {
        id: 1,
        title: 'Athletic',
        desc: '요가, 수영, 스쿠버 다이빙을 비롯한 다양한 레저 스포츠를 즐깁니다.\n 물속에서 보내는 시간을 좋아해 자연스럽게 여름을 선호하게 되었습니다.\n운동은 제 삶에 활력을 더해 주고,\n온전히 나 자신을 마주하며 균형을 되찾는 소중한 시간이 됩니다.',
        bg: '/images/hobby04.png',
        // imgs: ['/imges/1.jpg', '/imges/1.jpg', '/imges/1.jpg'],
    },
    {
        id: 2,
        title: 'English',
        desc: '평소 영어 공부를 즐기며, 일상 속에서 자연스럽게\n영어에 노출되는 환경을 만들어가고 있습니다.\n미국 TV 드라마를 시청하고, 영어 원서를 읽거나 영어로 일기를 쓰며,\nChatGPT와 영어로 대화하는 등 다양한 방식으로 영어 감각을 유지하고 있습니다.',
        bg: '/images/hobby03.png',
        // imgs: ['/imges/1.jpg', '/imges/1.jpg', '/imges/1.jpg'],
    },
    {
        id: 3,
        title: 'Analogue',
        desc: '손으로 빚고 기록하던 아날로그적인 경험을 소중히 여깁니다.\n연필과 종이, 오래된 물건이 지닌 시간의 흔적에서 깊은 매력을 느낍니다.\n동시에 변화하는 기술 환경에도 유연하게 대응하며,\nAI를 포함한 새로운 기술을 사유하고 활용하는 창작을 지향합니다.',
        bg: '/images/hobby02.png',
        // imgs: ['/imges/1.jpg', '/imges/1.jpg', '/imges/1.jpg'],
    },
    {
        id: 4,
        title: 'Games',
        desc: '  배틀그라운드와 오버워치를 비롯한 다양한 PC 게임을 즐깁니다.\n그중에서도 배틀그라운드는 전투 상황의 몰입감과 4인 팀 플레이를 통한\n전략적 협업이 돋보이는 게임으로, 팀원들과 전술을 공유하며\n전우애를 쌓아가는 과정에서 가장 큰 매력을 느낍니다.',
        bg: '/images/hobby01.png',
        // imgs: ['/images/2.png', '/imges/1.jpg', '/imges/1.jpg'],
    },
];
const Hobby = () => {
    return (
        <section className="hobby">
            <ul className="hobby__track">
                {hobbyArr.map((hb) => (
                    <li key={hb.id} className="hobby__slide">
                        <div className="bg">
                            <img src={hb.bg} alt={hb.title} />
                        </div>
                        <div className="inner">
                            <h3>{hb.title}</h3>
                            <p>{hb.desc}</p>
                            {/* <div className="imgs-wrap">
                                {hb.imgs.map((src, idx) => (
                                    <img key={idx} src={src} alt={`${hb.title}-${idx + 1}`} />
                                ))}
                            </div> */}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Hobby;
