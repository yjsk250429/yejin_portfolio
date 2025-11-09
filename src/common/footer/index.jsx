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
    // const loop1Ref = useRef(null);
    // const loop2Ref = useRef(null);

    // useEffect(() => {
    //     const horizontalLoop = (
    //         items,
    //         { repeat = -1, speed = 1, direction = 1, paddingRight = 30 } = {}
    //     ) => {
    //         items = gsap.utils.toArray(items);
    //         const tl = gsap.timeline({ repeat, defaults: { ease: 'none' } });
    //         const length = items.length;
    //         const startX = items[0].offsetLeft;
    //         const widths = [];
    //         const xPercents = [];
    //         const pixelsPerSecond = speed * 100;
    //         let totalWidth, curX, distanceToStart, distanceToLoop, item, i;

    //         gsap.set(items, {
    //             xPercent: (i, el) => {
    //                 const w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
    //                 xPercents[i] =
    //                     (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
    //                     gsap.getProperty(el, 'xPercent');
    //                 return xPercents[i];
    //             },
    //         });

    //         gsap.set(items, { x: 0 });
    //         totalWidth =
    //             items[length - 1].offsetLeft +
    //             (xPercents[length - 1] / 100) * widths[length - 1] -
    //             startX +
    //             items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') +
    //             paddingRight;

    //         for (i = 0; i < length; i++) {
    //             item = items[i];
    //             curX = (xPercents[i] / 100) * widths[i];
    //             distanceToStart = item.offsetLeft + curX - startX;
    //             distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');

    //             const directionFactor = direction === 1 ? 1 : -1;

    //             tl.to(
    //                 item,
    //                 {
    //                     xPercent: directionFactor * ((curX - distanceToLoop) / widths[i]) * 100,
    //                     duration: distanceToLoop / pixelsPerSecond,
    //                 },
    //                 0
    //             ).fromTo(
    //                 item,
    //                 {
    //                     xPercent:
    //                         directionFactor *
    //                         ((curX - distanceToLoop + totalWidth) / widths[i]) *
    //                         100,
    //                 },
    //                 {
    //                     xPercent: directionFactor * xPercents[i],
    //                     duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
    //                     immediateRender: false,
    //                 },
    //                 distanceToLoop / pixelsPerSecond
    //             );
    //         }

    //         tl.progress(1, true).progress(0, true);
    //         return tl;
    //     };

    //     const loop1Items = loop1Ref.current?.querySelectorAll('li');
    //     const loop2Items = loop2Ref.current?.querySelectorAll('li');

    //     if (loop1Items?.length)
    //         horizontalLoop(loop1Items, { repeat: -1, speed: 1, direction: 1, paddingRight: 40 });
    //     if (loop2Items?.length)
    //         horizontalLoop(loop2Items, { repeat: -1, speed: 1, direction: -1, paddingRight: 40 });
    // }, []);

    return (
        <footer id="footer">
            <ul className="txt-loop loop1" ref={textLeftRef}>
                <li>#AWARENESS #DETAILED #COOPERATION #INTEGRITY #PERSISTANCE #RELIABLE</li>
                <li>#AWARENESS #DETAILED #COOPERATION #INTEGRITY #PERSISTANCE #RELIABLE</li>

                {/* <li>#COOPERATION</li>
                <li>#INTEGRITY</li>
                <li>#PERSISTANCE</li>
                <li>#RELIABLE</li>
                <li>#AWARENESS</li>
                <li>#DETAILED</li>
                <li>#COOPERATION</li>
                <li>#INTEGRITY</li>
                <li>#PERSISTANCE</li>
                <li>#RELIABLE</li> */}
            </ul>
            <ul className="txt-loop loop2" ref={textRightRef}>
                <li>#FRONTEND #UX/UI #WEBDESIGN #CODING #DEVELOPE #PUBLISH</li>
                <li>#FRONTEND #UX/UI #WEBDESIGN #CODING #DEVELOPE #PUBLISH</li>

                {/* <li>#WEBDESIGN</li>
                <li>#CODING</li>
                <li>#DEVELOPE</li>
                <li>#PUBLISH</li>
                <li>#FRONTEND</li>
                <li>#UX/UI</li>
                <li>#WEBDESIGN</li>
                <li>#CODING</li>
                <li>#DEVELOPE</li>
                <li>#PUBLISH</li> */}
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
