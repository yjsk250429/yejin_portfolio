import { useEffect, useRef, useState } from 'react';
import CubeView from '../../components/work/cubeView/CubeView';
import './style.scss';
import { FaList } from 'react-icons/fa';
import gsap from 'gsap';

const Work = () => {
    const [revealed, setRevealed] = useState(false);

    const sectionRef = useRef(null);
    const h2Ref = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const h2 = h2Ref.current;
        const inner = innerRef.current;
        if (!section || !h2 || !inner) return;

        const ctx = gsap.context(() => {
            gsap.set(inner, { opacity: 0, y: -30 });

            // ✅ 중앙 고정 + scale로 크게 시작
            gsap.set(h2, {
                position: 'fixed',
                left: '50%',
                top: '50%',
                xPercent: -50,
                yPercent: -50,
                margin: 0,
                zIndex: 10,
                scale: 3.2, // ✅ 150/40 = 3.75
                transformOrigin: '50% 50%',
                willChange: 'transform',
            });

            setRevealed(true);
        }, section);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const h2 = h2Ref.current;
        const inner = innerRef.current;
        if (!section || !h2 || !inner) return;
        if (!revealed) return;

        const overlaySpan = h2.querySelector('span:nth-child(2)');
        if (!overlaySpan) return;

        const onRevealEnd = (e) => {
            if (e.propertyName !== 'transform') return;

            gsap.context(() => {
                const fromRect = h2.getBoundingClientRect();

                // ✅ 원래 자리로 돌리기 (relative)
                gsap.set(h2, {
                    position: 'relative',
                    left: 'auto',
                    top: 'auto',
                    xPercent: 0,
                    yPercent: 0,
                    zIndex: 1,
                    marginLeft: '250px',
                    marginTop: '100px',
                    marginBottom: '30px',
                });

                const toRect = h2.getBoundingClientRect();
                const dx = fromRect.left - toRect.left;
                const dy = fromRect.top - toRect.top;

                // ✅ scale도 같이 유지한 채 “from 위치”로 순간이동
                gsap.set(h2, { x: dx, y: dy, transformOrigin: '50% 50%' });

                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                // ✅ 이동 + scale 축소 동시에
                tl.to(
                    h2,
                    {
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 1,
                    },
                    0
                );

                tl.to(
                    inner,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                    },
                    0.15
                );
            }, section);

            overlaySpan.removeEventListener('transitionend', onRevealEnd);
        };

        overlaySpan.addEventListener('transitionend', onRevealEnd);
        return () => overlaySpan.removeEventListener('transitionend', onRevealEnd);
    }, [revealed]);

    return (
        <main className="work">
            <section className="projects" ref={sectionRef}>
                <h2 ref={h2Ref} className={`revealing-text ${revealed ? 'revealed' : ''}`}>
                    <span>FEATURED PROJECTS</span>
                    <span>
                        <span>FEATURED PROJECTS</span>
                    </span>
                </h2>

                <div className="inner" ref={innerRef}>
                    <p className="btns">
                        <button className="seeCube">
                            <span></span>
                        </button>
                        <button className="seeList">
                            <i>
                                <FaList />
                            </i>
                        </button>
                    </p>
                    <CubeView />
                </div>
            </section>
        </main>
    );
};

export default Work;
