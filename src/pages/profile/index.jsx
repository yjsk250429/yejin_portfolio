// import ModalDemo from '../../components/ui/modal/Modal';
import Hobby from '../../components/profile/Hobby';
import './style.scss';

const Profile = () => {
    return (
        <main className="profile">
            <section className="basic-info">
                <div className="inner">
                    <div className="left">
                        <video src="/images/profile.mp4" autoPlay muted loop playsInline />
                    </div>
                    <div className="right">
                        <div className="txt txt1">
                            <h3>Profile</h3>
                            <dl>
                                <dt>Name</dt>
                                <dd>정예진</dd>
                            </dl>
                            <dl>
                                <dt>Birth</dt>
                                <dd>2001.04.20</dd>
                            </dl>
                            <dl>
                                <dt>Address</dt>
                                <dd>대한민국, 서울</dd>
                            </dl>
                        </div>
                        <div className="txt txt2">
                            <h3>Education</h3>
                            <dl>
                                <dt>2025.09.24</dt>
                                <dd>
                                    이젠아카데미 UXUI디자인 웹 프론트엔드개발 부트캠프 과정 수료
                                </dd>
                            </dl>
                            <dl>
                                <dt>2025.04.29</dt>
                                <dd>휴스피치학원 스피치 트레이닝 과정 수료</dd>
                            </dl>
                            <dl>
                                <dt>2025.02.20</dt>
                                <dd>단국대학교 죽전캠퍼스 도예과 졸업</dd>
                            </dl>
                        </div>
                        <div className="txt txt3">
                            <h3>License</h3>
                            <dl>
                                <dt>2023.11.03</dt>
                                <dd>컴퓨터활용능력 1급</dd>
                            </dl>
                            <dl>
                                <dt>2023.07.30</dt>
                                <dd>TOEIC 915점</dd>
                            </dl>
                            <dl>
                                <dt>2023.02.06</dt>
                                <dd>ADVANCED DIVER</dd>
                            </dl>
                            <dl>
                                <dt>2020.04.23</dt>
                                <dd>2종 보통 운전면허</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </section>
            <Hobby />

            {/* <ModalDemo /> */}
        </main>
    );
};

export default Profile;
