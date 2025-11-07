import { useState } from 'react';
import './style.scss';

const Profile = () => {
    const [viewProfile, openViewProfile] = useState(false);

    return (
        <section className="profile">
            <div className="inner">
                <h2>Who am I?</h2>
                <div
                    className="profile-box"
                    onMouseEnter={() => openViewProfile(true)}
                    onMouseLeave={() => openViewProfile(false)}
                >
                    <div className={viewProfile ? 'p-box active' : 'p-box'}>
                        <div className="box name">
                            <h3>Profile</h3>
                            <table>
                                <tr>
                                    <td>Name</td>
                                    <td>정예진</td>
                                </tr>
                                <tr>
                                    <td>Birth</td>
                                    <td>2001.04.20</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>대한민국, 서울</td>
                                </tr>
                            </table>
                        </div>
                        <div className="box lic">
                            <h3>License</h3>
                            <table>
                                <tr>
                                    <td>2025.09.24</td>
                                    <td>컴퓨터활용능력 1급</td>
                                </tr>
                                <tr>
                                    <td>2025.02.20</td>
                                    <td>TOEIC 915점</td>
                                </tr>
                                <tr>
                                    <td>2025.02.20</td>
                                    <td>2종보통운전면허</td>
                                </tr>
                            </table>
                        </div>
                        <div className="box edu">
                            <h3>Education</h3>
                            <table>
                                <tr>
                                    <td>2025.09.24</td>
                                    <td>
                                        이젠아카데미 UXUI디자인 웹 프론트엔드개발 부트캠프 과정 수료
                                    </td>
                                </tr>
                                <tr>
                                    <td>2025.02.20</td>
                                    <td>단국대학교 죽전캠퍼스 도예과 졸업</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <strong>Frontend Developer</strong>
                    <ul className="s-tag">
                        <li>#ux/ui_designer</li>
                        <li>#web_publisher</li>
                    </ul>
                    <ul className="b-tag">
                        <li>#DEDICATED</li>
                        <li>#RELIABLE</li>
                        <li>#INTEGRITY</li>
                        <li>#PERSISTANCE</li>
                    </ul>
                    <div className="img-box">
                        <img src="/images/profile.jpeg" alt="JUNG YE JIN" />
                    </div>
                </div>
                <p>
                    안녕하세요,
                    <br />
                    섬세한 감각과 구조적인 사고로 완성도 높은 웹을 만드는
                    <br />
                    프론트엔드 개발자 정예진입니다.
                </p>
            </div>
        </section>
    );
};

export default Profile;
