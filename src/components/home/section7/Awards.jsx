import './style.scss';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
    const pathRef = useRef(null);

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
                    scrub: 1,
                    // markers: true,
                },
            }
        );
    }, []);

    return (
        <section className="awards">
            <div className="con con1">
                <div className="inner">
                    <h2>awards & exibition</h2>
                    <p>
                        도예 전공생으로서의 다양한 전시 경험은 사용자 경험 중심의 시각을 키울 수
                        있게 해 주었습니다.
                        <br /> 전시 기획 및 작품 제작 경험은 기술적 감각뿐 아니라, 프로젝트 관리와
                        협업 과정에도 연결되어 역량을 발휘할 수 있었습니다.
                    </p>
                </div>
            </div>

            <div className="con con2"></div>

            <div className="con con3"></div>

            <div className="con con4"></div>

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
