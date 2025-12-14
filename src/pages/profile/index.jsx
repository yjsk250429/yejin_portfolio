import BasicInfo from '../../components/profile/basic/BasicInfo';
import Hobby from '../../components/profile/hobby/Hobby';
import Motto from '../../components/profile/motto/Motto';
import './style.scss';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const panels = gsap.utils.toArray(root.querySelectorAll('.profile__panel'));

        const ctx = gsap.context(() => {
            // 초기: 첫 패널만 보이고 나머진 아래에서 대기
            gsap.set(panels, { yPercent: 0 });
            gsap.set(panels.slice(1), { yPercent: 100 });

            const tl = gsap.timeline({ defaults: { ease: 'none' } });

            panels.forEach((panel, i) => {
                const next = panels[i + 1];
                if (!next) return;

                // (A) 다음 섹션 덮어쓰기 전환
                tl.to(next, { yPercent: 0, duration: 1 }, '+=0');

                // (B) BasicInfo 내부 트랙(세로 이동)
                const rightMask = next.querySelector('.basic-info .right');
                const rightTrack = next.querySelector('.basic-info .right__track');
                if (rightMask && rightTrack) {
                    tl.set(rightTrack, { y: 0 }, '+=0');

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
                    tl.set(hobbyTrack, { x: 0 }, '+=0');

                    tl.to(
                        hobbyTrack,
                        {
                            x: () => {
                                const maxScroll = hobbyTrack.scrollWidth - window.innerWidth;
                                return maxScroll > 0 ? -maxScroll : 0;
                            },
                            duration: () => {
                                const maxScroll = hobbyTrack.scrollWidth - window.innerWidth;
                                const factor = maxScroll > 0 ? maxScroll / window.innerWidth : 0;
                                return Math.max(1, factor);
                            },
                        },
                        '+=0'
                    );
                }
            });

            // ✅ 핵심: trigger를 root로 되돌리고, end는 타임라인 duration 기반으로
            ScrollTrigger.create({
                trigger: root,
                start: 'top top',
                end: () => `+=${tl.totalDuration() * window.innerHeight}`,
                scrub: 0.8,
                pin: true, // pin: root 와 동일 (trigger가 root니까)
                anticipatePin: 1,
                invalidateOnRefresh: true,
                animation: tl,
            });

            // 로딩/레이아웃 안정화 후 refresh 한 번 더 (배포에서 특히 중요)
            ScrollTrigger.refresh();
            requestAnimationFrame(() => ScrollTrigger.refresh());
            window.addEventListener('load', ScrollTrigger.refresh, { once: true });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <main className="profile profile--cover" ref={rootRef}>
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
    );
};

export default Profile;
