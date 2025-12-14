import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Footer = () => {
    const textLeftRef = useRef(null);
    const textRightRef = useRef(null);

    useEffect(() => {
        if (textLeftRef.current) {
            gsap.set(textLeftRef.current, { xPercent: 0 });

            gsap.to(textLeftRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 15,
                ease: 'linear',
            });
        }
        if (textRightRef.current) {
            gsap.set(textRightRef.current, { xPercent: -50 });

            gsap.to(textRightRef.current, {
                xPercent: 0,
                repeat: -1,
                duration: 15,
                ease: 'linear',
            });
        }
    }, []);

    return (
        <footer id="footer">
            <ul className="txt-loop loop1" ref={textLeftRef}>
                <li>#AWARENESS #DETAILED #COOPERATION #INTEGRITY #PERSISTANCE #RELIABLE</li>
                <li>#AWARENESS #DETAILED #COOPERATION #INTEGRITY #PERSISTANCE #RELIABLE</li>
            </ul>
            <ul className="txt-loop loop2" ref={textRightRef}>
                <li>#FRONTEND #UX/UI #WEBDESIGN #CODING #DEVELOPE #PUBLISH</li>
                <li>#FRONTEND #UX/UI #WEBDESIGN #CODING #DEVELOPE #PUBLISH</li>
            </ul>
            <div className="inner">
                <strong>
                    섬세한 손길로 코드의 완성도를 높이는,
                    <br />
                    프론트엔드 개발자 정예진입니다
                </strong>
                <h2>Contact</h2>
                <ul className="contacts">
                    <li>
                        <img src="/images/mail.png" alt="email" />
                        <span>yejin00700@naver.com</span>
                    </li>
                    <li>
                        <img src="/images/mobile.png" alt="mobile" />
                        <span>010-9623-1025</span>
                    </li>
                </ul>
                <p className="copy">&copy;2025 JUNG YE JIN. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
