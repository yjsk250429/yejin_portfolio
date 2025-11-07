import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';
import { IoIosArrowRoundForward } from 'react-icons/io';
gsap.registerPlugin(ScrollTrigger);
const Card = ({ imageSrc = '/images/ceramic_pictures.png' }) => {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const magRef = useRef(null);

    const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
            if (magRef.current) {
                magRef.current.style.backgroundImage = `url("${imageSrc}")`;
                magRef.current.style.backgroundRepeat = 'no-repeat';
            }
        };
    }, [imageSrc]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // 초기 상태: 아주 작게 시작
        gsap.set(section, {
            scale: 0.06, // 점처럼 보이게 (0.03~0.1 사이 조절)
            transformOrigin: 'center center',
            willChange: 'transform',
            force3D: true,
        });

        // pin 동안 스크롤에 맞춰 scale → 1
        // PIN_LEN: pin 유지 거리(스크롤 양). 커질수록 오래 고정됨.
        const PIN_LEN = '120%';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top center', // 섹션 상단이 뷰포트 50%에 닿는 순간 고정 시작
                end: `+=${PIN_LEN}`, // 이 길이만큼 pin 유지(= 스크롤 양)
                pin: true, // ✅ 고정
                scrub: 0.8, // 스크롤에 따라 부드럽게
                anticipatePin: 1,
                pinSpacing: true, // pin 해제 후 자연스러운 흐름 유지
                // markers: true,
            },
            onComplete: () => gsap.set(section, { clearProps: 'willChange' }),
        });

        // pin 구간 동안 scale 업 (0.06 → 1)
        tl.to(section, {
            scale: 1,
            ease: 'none',
            duration: 1, // 타임라인 상대 시간(스크롤 비율) -> 1 전체
        });

        return () => {
            tl.scrollTrigger && tl.scrollTrigger.kill();
            tl.kill();
        };
    }, []);

    useEffect(() => {
        const card = cardRef.current;
        const img = imgRef.current;
        const mag = magRef.current;
        if (!card || !img || !mag) return;

        const handleMove = (e) => {
            const cardRect = card.getBoundingClientRect();
            const imgRect = img.getBoundingClientRect();
            const mx = e.clientX - cardRect.left;
            const my = e.clientY - cardRect.top;
            const inside = mx > 0 && my > 0 && mx < cardRect.width && my < cardRect.height;

            mag.style.opacity = inside ? '1' : '0';
            if (!inside) return;

            card.style.setProperty('--holeX', `${mx}px`);
            card.style.setProperty('--holeY', `${my}px`);
            card.style.setProperty('--holeR', `${mag.clientWidth / 2}px`);

            const ix = e.clientX - imgRect.left;
            const iy = e.clientY - imgRect.top;
            const cx = Math.max(0, Math.min(ix, imgRect.width));
            const cy = Math.max(0, Math.min(iy, imgRect.height));

            // ✅ 확대 배율 (원하는 만큼 조절: 1.8~2.5 권장)
            const ZOOM = 1.3;
            mag.style.backgroundSize = `${imgRect.width * ZOOM}px ${imgRect.height * ZOOM}px`;

            // ✅ 배경 위치: 마우스가 확대경 중심에 오도록
            let bgX = -(cx * ZOOM - mag.clientWidth / 2);
            let bgY = -(cy * ZOOM - mag.clientHeight / 2);

            // ✅ 가장자리 클램프: 빈 공간(공백) 방지
            const minBgX = -(imgRect.width * ZOOM - mag.clientWidth);
            const minBgY = -(imgRect.height * ZOOM - mag.clientHeight);
            bgX = Math.min(0, Math.max(minBgX, bgX));
            bgY = Math.min(0, Math.max(minBgY, bgY));
            mag.style.backgroundPosition = `${bgX}px ${bgY}px`;

            // 확대경 위치(마우스 기준 중앙 정렬)
            mag.style.left = `${mx - mag.clientWidth / 2}px`;
            mag.style.top = `${my - mag.clientHeight / 2}px`;
        };

        const handleLeave = () => {
            mag.style.opacity = '0';
            card.style.setProperty('--holeX', `-9999px`);
            card.style.setProperty('--holeY', `-9999px`);
        };

        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);
        return () => {
            card.removeEventListener('mousemove', handleMove);
            card.removeEventListener('mouseleave', handleLeave);
        };
    }, [naturalSize]);

    return (
        <section className="story" ref={sectionRef}>
            <div className="card" ref={cardRef}>
                <img ref={imgRef} className="card-image" src={imageSrc} alt="pics" />
                <div className="text">
                    <h2>
                        도예과 졸업생은
                        <br />
                        어쩌다 개발자가 되었나?
                    </h2>
                    <p className="more">
                        스토리 보러가기
                        <i>
                            <IoIosArrowRoundForward />
                        </i>
                    </p>
                    <p>
                        대학에서 도예를 전공했지만, 졸업 후 프론트엔드에 입문하게 되었습니다.
                        <br />
                        오랜 시간 손으로 무언가를 만드는 일을 해왔던 저는 “코드”라는 새로운 재료를
                        발견합니다.
                    </p>
                </div>
                <div className="magnifying-glass" ref={magRef} />
            </div>
        </section>
    );
};

export default Card;
