import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const WhoAmI = () => {
    const [viewProfile, openViewProfile] = useState(false);
    const navigate = useNavigate();

    const boxRef = useRef(null);

    useEffect(() => {
        const el = boxRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { x: '-30vw', y: '300px', rotate: 15, opacity: 0 },
                {
                    x: 0,
                    y: 0,
                    rotate: -5,
                    opacity: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        id: 'whoami-box',
                        trigger: el,
                        start: 'top 90%',
                        end: 'top 60%',
                        scrub: 1.2,
                    },
                }
            );
        }, el);

        return () => ctx.revert(); // ✅ 이 컴포넌트에서 만든 것만 정리
    }, []);

    return (
        <section className="whoami">
            <div className="inner">
                <h2>(Who am I?)</h2>
                <div
                    className="profile-box"
                    ref={boxRef}
                    onMouseEnter={() => openViewProfile(true)}
                    onMouseLeave={() => openViewProfile(false)}
                    onClick={() => navigate('/profile')}
                >
                    <div className={viewProfile ? 'p-box active' : 'p-box'}>
                        <div className="box name">
                            <h3>Profile</h3>
                            <table>
                                <tbody>
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
                                </tbody>
                            </table>
                        </div>
                        <div className="box lic">
                            <h3>License</h3>
                            <table>
                                <tbody>
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
                                </tbody>
                            </table>
                        </div>
                        <div className="box edu">
                            <h3>Education</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>2025.09.24</td>
                                        <td>
                                            이젠아카데미 UXUI디자인 웹 프론트엔드개발 부트캠프 과정
                                            수료
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2025.02.20</td>
                                        <td>단국대학교 죽전캠퍼스 도예과 졸업</td>
                                    </tr>
                                </tbody>
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
                <span>click here to view more</span>
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

export default WhoAmI;
