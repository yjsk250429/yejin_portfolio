import './style.scss';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
    const pathRef = useRef(null);
    useEffect(() => {
        AOS.init({
            duration: 700, // 애니메이션 지속 시간 (ms)
            once: false, // 한 번만 애니메이션 실행
            easing: 'ease-out', // 애니메이션 가속 곡선
        });
    }, []);

    useEffect(() => {
        const path = pathRef.current;
        const pathLength = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
        });

        gsap.fromTo(
            path,
            { strokeDashoffset: pathLength },
            {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.svg-container',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3,
                    // markers: true,
                },
            }
        );
    }, []);

    const awards = [
        {
            id: 1,
            date: '25.09.24',
            content: '이젠아카데미  2차 프로젝트 최우수상 수상',
        },
        {
            id: 2,
            date: '25.01.08 - 25.01.12',
            content: '도예과 대학연합동아리\n세라믹플러스 18기 전시회 <결합>',
        },
        {
            id: 3,
            date: '24.11.20 - 11.24',
            content: '단국대학교 도예과\n제50회 졸업전시회 <서사;>',
        },
        {
            id: 4,
            date: '24.11.06',
            content: '2024 대한민국현대조형미술대전 특선 수상',
        },
        {
            id: 5,
            date: '24.09.26 - 24.09.29',
            content: '단국대학교 중앙동아리\n단국서예회 100회 전시회 <단국서예전>',
        },
        {
            id: 6,
            date: '24.07.22 - 24.07.31',
            content: '굽네 플레이타운 도예과 대학 연합 전시 <다다닭>',
        },
        {
            id: 7,
            date: '22.07.01',
            content: '2022 대한민국 현대여성미술대전 특선 수상',
        },
    ];

    return (
        <section className="awards">
            <div className="inner">
                <h2>awards & exibition</h2>
                <p>
                    도예 전공생으로서의 다양한 전시 경험은 사용자 경험 중심의 시각을 키울 수 있게 해
                    주었습니다.
                    <br /> 전시 기획 및 작품 제작 경험은 기술적 감각뿐 아니라, 프로젝트 관리와 협업
                    과정에도 연결되어 역량을 발휘할 수 있었습니다.
                </p>
                {awards.map((awd) => (
                    <div className={`awd awd${awd.id}`} data-aos="zoom-in">
                        <strong>{awd.date}</strong>
                        <em>{awd.content}</em>
                    </div>
                ))}
            </div>
            <div className="svg-container">
                <svg
                    width="514"
                    height="1923"
                    viewBox="0 0 514 1923"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        ref={pathRef}
                        d="M233.008 1C233.008 1 8.07839 150.796 1.19106 316.279C-8.81896 556.791 377.972 505.108 344.493 741.538C318.663 923.945 52.5093 819.747 52.5093 1064.15C52.5093 1342.65 549.7 1284.56 510.835 1557.84C475.408 1806.95 1.19107 1922 1.19107 1922"
                        stroke="black"
                    />
                </svg>
            </div>
        </section>
    );
};

export default Awards;
