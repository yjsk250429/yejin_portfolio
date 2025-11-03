import './style.scss';

const Skills = () => {
    return (
        <section className="skills">
            <div className="inner">
                <h2>development skills</h2>
                <div className="container">
                    <div className="item tools">
                        <strong>Tools</strong>
                        <em>
                            협업에 필요한 다양한 툴과 프로그램을 다룰 수 있습니다.
                            <br /> Agile 방식의 원활한 협업이 가능합니다.
                        </em>
                    </div>
                    <div className="item frontend">
                        <strong>Frontend</strong>
                        <em>
                            웹페이지 개발에 필요한 주요 기술을 갖추었습니다.
                            <br /> SPA, 동적 기능, 반응형 웹/앱 개발이 가능하며, <br /> 유지보수성을
                            최우선으로 하여 효율적으로 코드를 관리합니다.
                        </em>
                    </div>
                    <div className="item backend">
                        <strong>Backend</strong>
                        <em>
                            백엔드 개발 영역을 이해하고,
                            <br /> 간단한 웹서버를 구축할 수 있습니다.
                        </em>
                    </div>
                    <div className="item ai">
                        <strong>AI</strong>
                        <em>
                            AI 기술로 더욱 빠르게
                            <br />
                            솔루션을 도출합니다.
                        </em>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
