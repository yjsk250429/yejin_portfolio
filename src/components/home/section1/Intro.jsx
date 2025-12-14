import './style.scss';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const videoRef = useRef(null);
    const innerRef = useRef(null); // ✅ (1) innerRef 추가
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const SCALE_END = 120; // .bg 최종 스케일
        const SCROLL_LEN = '300%'; // 섹션 pin 전체 길이(조절 지점)
        const HOLD_RATIO = 0.35; // 전체 pin 시간 중 '홀드' 비율(0~1)

        const ctx = gsap.context(() => {
            gsap.set('#zoom', {
                scale: 1,
                transformOrigin: '65.5% 60%',
                transformBox: 'fill-box', // ✅ SVG에서 transformOrigin 퍼센트가 올바르게 동작
                willChange: 'transform',
            });
            gsap.set(bgRef.current, { opacity: 1 }); // (페이드는 래퍼 div에 계속 줘도 OK)

            gsap.set(innerRef.current, { opacity: 1, y: 0, willChange: 'transform,opacity' }); // ✅ (2) inner 초기값

            // 타임라인: 앞부분은 .bg 애니메이션, 뒷부분은 '더미 트윈'으로 시간만 소비(=핀만 유지)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${SCROLL_LEN}`, // 이 길이만큼 pin 유지
                    scrub: 2,
                    pin: true,
                    anticipatePin: 1,
                    // markers: true,
                },
            });

            // 스케일은 벡터 그룹(#zoom)에게,
            tl.to('#zoom', {
                scale: SCALE_END,
                ease: 'none',
                duration: 0.2,
            });
            // 페이드는 .bg 래퍼에 (영상 노출)
            tl.to(
                bgRef.current,
                {
                    opacity: 0,
                    ease: 'none',
                    duration: 0.2,
                },
                0
            ); // ⬅️ bg 스케일과 동시에 시작

            // ①-동시에) .inner 반투명 + 아래로 300px
            tl.to(
                innerRef.current,
                {
                    opacity: 0.5,
                    y: 300,
                    ease: 'none',
                    duration: 1 - HOLD_RATIO,
                },
                0 // ✅ (3) bg 트윈과 '동시에' 시작
            );

            // ② 아무 것도 안 하는 더미 트윈 = 핀 유지 구간(영상 노출 시간)
            tl.to({}, { duration: HOLD_RATIO });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="intro" ref={sectionRef}>
            <div className="bg" ref={bgRef}>
                {/* <img src="/images/Subtract.png" alt="bg" /> */}
                <svg
                    viewBox="0 0 1920 1080"
                    className="bg-svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <g id="zoom">
                        <path
                            className="cls-1"
                            d="M.5.5v1080h1920V.5H.5ZM1678.66,676c-10.16,40.97-39.01,65.02-71.02,90.96-16.97,13.76-46.97,37.65-93.79,55.08-20.71,7.71-129.9,48.36-224.9-3.24-18.67-10.14-51.96-28.83-67.15-67.15-9.85-24.85-7.68-46.99-6.47-59.06,7.33-73.21,64.6-117.2,79.28-127.82-29.85,70.13-24.89,136.34,8.9,161.8,15.7,11.83,36.49,13.57,47.73,14.56,49.23,4.32,84.7-22.86,91.94-28.67,14.01-11.24,35.98-28.87,39.65-53.9,4.5-30.65-22.13-47.32-112.99-133.43-35.97-34.09-109.23-104.86-160.25-106.8-13.39-.51-25.01,3.25-25.01,3.25-26.95,8.72-41.22,32.3-47.35,42.42-34.15,56.43-23.17,152.66-22.04,161.87,10.09,82.13,38.19,142.42,64.54,197.78,23.93,50.27,47.98,89.78,65.53,116.49-53.19-45.54-125.5-122.41-167.46-235.42-25.53-68.76-29.71-123.63-30.74-142.38-5.62-102.19,24.41-182.54,54.2-226.52,10.98-16.21,29.97-39.35,59.87-55.82,12.98-7.15,24.47-13.48,38.72-12.87,31.57,1.37,52.55,35.77,68.87,58.98,0,0,32.12,45.67,116.49,117.3,50.6,42.96,101.82,66.46,173.51,99.36,63.66,29.21,109.84,43.44,121.58,84.28,5.62,19.56,1.15,37.59-1.66,48.92Z"
                        />
                    </g>
                </svg>
            </div>

            {/* 같은 섹션 안에서 겹치게 유지 */}
            <video
                className="intro-video"
                ref={videoRef}
                src="/images/intro_video_demo3.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="inner" ref={innerRef}>
                <h2>from Clay to Code:</h2>
                <div className="glitch" data-text="Crafting The Digital">
                    Crafting The Digital
                </div>
            </div>
            <p className={`scrolldown ${visible ? 'hide' : ''}`}>scroll</p>
        </section>
    );
};

export default Intro;
