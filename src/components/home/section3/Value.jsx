import './style.scss';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Value = () => {
    const sectionRef = useRef(null);
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 오른쪽 기준으로 줄어들도록 설정
            gsap.set([box1Ref.current, box2Ref.current, box3Ref.current], {
                transformOrigin: '100% 50%',
                scaleX: 1,
                willChange: 'transform',
            });

            // 스크롤 비율에 따라 순차적으로 줄어듦
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%', // 필요시 조정
                    end: 'top 0%', // 필요시 조정
                    scrub: true,
                    // markers: true,
                },
            });

            tl.to(box1Ref.current, { scaleX: 0, ease: 'none' })
                .to(box2Ref.current, { scaleX: 0, ease: 'none' })
                .to(box3Ref.current, { scaleX: 0, ease: 'none' });
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section className="primaryValue" ref={sectionRef}>
            <div className="inner">
                <h2>primary value</h2>
                <div className="big-text">
                    <div className="box box1" ref={box1Ref}></div>
                    <div className="box box2" ref={box2Ref}></div>
                    <div className="box box3" ref={box3Ref}></div>
                    <p>
                        Designers and developers must look in the same direction. A frontend
                        developer’s role is to perfectly capture the design intent and bring it to
                        life.
                    </p>
                </div>
                <p className="small-text">
                    디자이너와 개발자는 같은 곳을 바라보아야 합니다.
                    <br />
                    디자인 의도를 완벽히 파악하여 구현하는 것이 바로 프론트엔드 개발자가 해야 할
                    일입니다.
                    <br />
                    저는 이해와 협업을 가장 중요한 가치로 여깁니다.
                    <br />
                    기획과 디자인, 그리고 코딩의 삼박자가 맞을 때 비로소 사용자 경험이 완성됩니다.
                </p>
                {/* <div className="circle-loop">
                    <span></span>
                    <span></span>
                    <span></span>
                </div> */}
                {/* <div className="square"></div> */}
            </div>
        </section>
    );
};

export default Value;
