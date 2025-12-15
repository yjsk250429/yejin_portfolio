import BasicInfo from '../../components/profile/basic/BasicInfo';
import Hobby from '../../components/profile/hobby/Hobby';
import Motto from '../../components/profile/motto/Motto';
import './style.scss';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
    const wrapperRef = useRef(null); // 스크롤 공간(Flow)
    const stageRef = useRef(null); // 실제 화면(Pin)

    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        const stage = stageRef.current;
        if (!wrapper || !stage) return;

        const panels = Array.from(stage.querySelectorAll('.profile__panel'));
        if (panels.length < 2) return;

        // 1) 초기 위치
        gsap.set(panels, { yPercent: 0 });
        gsap.set(panels.slice(1), { yPercent: 100 });

        const tl = gsap.timeline({ defaults: { ease: 'none' } });

        panels.forEach((panel, i) => {
            const next = panels[i + 1];
            if (!next) return;

            // (A) 다음 섹션 덮어쓰기
            tl.to(next, { yPercent: 0, duration: 1 }, '+=0');

            // (B) BasicInfo 내부 트랙(세로 이동)
            const rightMask = next.querySelector('.basic-info .right');
            const rightTrack = next.querySelector('.basic-info .right__track');
            if (rightMask && rightTrack) {
                tl.set(rightTrack, { y: 0, clearProps: 'transform' }, '+=0');

                tl.to(
                    rightTrack,
                    {
                        y: () => {
                            const max = rightTrack.scrollHeight - rightMask.clientHeight;
                            return max > 0 ? -max : 0;
                        },
                        duration: () => {
                            const max = rightTrack.scrollHeight - rightMask.clientHeight;
                            const factor = max > 0 ? max / window.innerHeight : 0;
                            return Math.max(1, factor);
                        },
                    },
                    '+=0'
                );
            }

            // (C) Hobby 내부 트랙(가로 이동)
            const hobbyTrack = next.querySelector('.hobby__track');
            if (hobbyTrack) {
                tl.set(hobbyTrack, { x: 0, clearProps: 'transform' }, '+=0');

                tl.to(
                    hobbyTrack,
                    {
                        x: () => {
                            const max = hobbyTrack.scrollWidth - window.innerWidth;
                            return max > 0 ? -max : 0;
                        },
                        duration: () => {
                            const max = hobbyTrack.scrollWidth - window.innerWidth;
                            const factor = max > 0 ? max / window.innerWidth : 0;
                            return Math.max(1, factor);
                        },
                    },
                    '+=0'
                );
            }
        });

        const setWrapperHeight = () => {
            const h = Math.ceil(tl.totalDuration() * window.innerHeight);
            wrapper.style.height = `${Math.max(h, window.innerHeight)}px`;
        };

        setWrapperHeight();

        const st = ScrollTrigger.create({
            id: 'profileST',
            trigger: wrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            pin: stage,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: tl,
        });

        window.__profileST = st;

        const onLoad = () => {
            setWrapperHeight();
            ScrollTrigger.refresh();
        };

        const onResize = () => {
            setWrapperHeight();
            ScrollTrigger.refresh();
        };

        ScrollTrigger.refresh();
        requestAnimationFrame(() => {
            setWrapperHeight();
            ScrollTrigger.refresh();
        });

        window.addEventListener('load', onLoad, { once: true });
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('load', onLoad);
            st.kill();
            tl.kill();
        };
    }, []);
    return (
        <div className="profile" ref={wrapperRef}>
            <main className="profile profile--cover" ref={stageRef}>
                <section className="profile__panel">
                    <Motto />
                </section>

                <section className="profile__panel">
                    <BasicInfo />
                </section>

                <section className="profile__panel">
                    <Hobby />
                </section>
            </main>
        </div>
    );
};

export default Profile;
