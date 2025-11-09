const Footer = () => {
    return (
        <footer id="footer">
            <ul className="txt-loop loop1">
                <li>#AWARENESS</li>
                <li>#DETAILED</li>
                <li>#COOPERATION</li>
                <li>#INTEGRITY</li>
                <li>#PERSISTANCE</li>
                <li>#RELIABLE</li>
            </ul>
            <ul className="txt-loop loop2">
                <li>#FRONTEND</li>
                <li>#UX/UI</li>
                <li>#WEBDESIGN</li>
                <li>#CODING</li>
                <li>#DEVELOPE</li>
                <li>#PUBLISH</li>
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
