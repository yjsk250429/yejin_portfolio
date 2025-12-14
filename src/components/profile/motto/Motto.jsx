import './mottoStyle.scss';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Motto = () => {
    const [revealed, setRevealed] = useState(false);

    const sectionRef = useRef(null);
    const h2Ref = useRef(null);
    const pRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const h2 = h2Ref.current;
        const p = pRef.current;
        const cont = containerRef.current;

        if (!section || !h2 || !p || !cont) return;

        const ctx = gsap.context(() => {
            // p/컨테이너는 처음부터 숨김(깜빡임 방지)
            gsap.set([p, cont], { opacity: 0, y: -30 });

            // h2를 중앙 고정
            gsap.set(h2, {
                position: 'fixed',
                left: '50%',
                top: '50%',
                xPercent: -50,
                yPercent: -50,
                margin: 0,
                zIndex: 10,
            });

            // reveal 시작 (CSS transition 시작)
            setRevealed(true);
        }, section);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const h2 = h2Ref.current;
        const p = pRef.current;
        const cont = containerRef.current;

        if (!section || !h2 || !p || !cont) return;
        if (!revealed) return;

        // ✅ CSS reveal(두 번째 span의 transform transition)이 끝난 순간만 캐치
        const overlaySpan = h2.querySelector('span:nth-child(2)');
        if (!overlaySpan) return;

        const onRevealEnd = (e) => {
            // transform transition 끝났을 때만 반응 (opacity 등 다른 transition 방지)
            if (e.propertyName !== 'transform') return;

            const ctx = gsap.context(() => {
                // FLIP: 중앙(fixed) -> 원래 자리(relative) 부드럽게 이동
                const fromRect = h2.getBoundingClientRect();

                gsap.set(h2, {
                    position: 'relative',
                    left: 'auto',
                    top: 'auto',
                    xPercent: 0,
                    yPercent: 0,
                    zIndex: 1,
                    clearProps: 'margin',
                });

                const toRect = h2.getBoundingClientRect();
                const dx = fromRect.left - toRect.left;
                const dy = fromRect.top - toRect.top;

                gsap.set(h2, { x: dx, y: dy, willChange: 'transform' });

                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                tl.to(h2, { x: 0, y: 0, duration: 1 }, 0);
                tl.to([p, cont], { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.15);
            }, section);

            // 이벤트는 한 번만 실행되면 되므로 제거
            overlaySpan.removeEventListener('transitionend', onRevealEnd);
        };

        overlaySpan.addEventListener('transitionend', onRevealEnd);

        return () => {
            overlaySpan.removeEventListener('transitionend', onRevealEnd);
        };
    }, [revealed]);
    return (
        <section className="motto" ref={sectionRef}>
            <div className="inner">
                <h2 ref={h2Ref} className={`revealing-text ${revealed ? 'revealed' : ''}`}>
                    <span>JUNGYEJIN</span>
                    <span>
                        <span>JUNGYEJIN</span>
                    </span>
                </h2>
                <p ref={pRef}>
                    “Consistency matters more than speed.”
                    <br />
                    장기적인 시야를 가지고 끊임없이 나아가는 것이 저의 모토입니다.
                </p>
                <div className="container" ref={containerRef}>
                    <div className="photo-container">
                        <div className="photo-cont-item animation-1">
                            <div className="photo-item photo-1"></div>
                            <div className="photo-item photo-2"></div>
                            <div className="photo-item photo-3"></div>
                            <div className="photo-item photo-4"></div>
                            <div className="photo-item photo-5"></div>
                            <div className="photo-item photo-6"></div>

                            <div className="photo-item photo-1"></div>
                            <div className="photo-item photo-2"></div>
                            <div className="photo-item photo-3"></div>
                            <div className="photo-item photo-4"></div>
                            <div className="photo-item photo-5"></div>
                            <div className="photo-item photo-6"></div>
                        </div>

                        <div className="photo-cont-item animation-2">
                            <div className="photo-item photo-7"></div>
                            <div className="photo-item photo-8"></div>
                            <div className="photo-item photo-9"></div>
                            <div className="photo-item photo-10"></div>
                            <div className="photo-item photo-11"></div>
                            <div className="photo-item photo-12"></div>

                            <div className="photo-item photo-7"></div>
                            <div className="photo-item photo-8"></div>
                            <div className="photo-item photo-9"></div>
                            <div className="photo-item photo-10"></div>
                            <div className="photo-item photo-11"></div>
                            <div className="photo-item photo-12"></div>
                        </div>

                        <div className="photo-cont-item animation-3">
                            <div className="photo-item photo-13"></div>
                            <div className="photo-item photo-14"></div>
                            <div className="photo-item photo-15"></div>
                            <div className="photo-item photo-16"></div>
                            <div className="photo-item photo-17"></div>
                            <div className="photo-item photo-18"></div>

                            <div className="photo-item photo-13"></div>
                            <div className="photo-item photo-14"></div>
                            <div className="photo-item photo-15"></div>
                            <div className="photo-item photo-16"></div>
                            <div className="photo-item photo-17"></div>
                            <div className="photo-item photo-18"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Motto;
