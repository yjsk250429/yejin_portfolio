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
            // 1) 패널 스택 초기화: 첫 패널 보임, 나머지는 아래 대기
            gsap.set(panels, { yPercent: 0 });
            gsap.set(panels.slice(1), { yPercent: 100 });

            const tl = gsap.timeline({ defaults: { ease: 'none' } });

            // 2) 패널 전환 + (특정 패널 구간: 내부 이동) 구성
            panels.forEach((panel, i) => {
                const next = panels[i + 1];
                if (!next) return;

                // (A) 다음 섹션이 아래에서 위로 올라와 덮어쓰기
                tl.to(next, { yPercent: 0, duration: 1 }, '+=0');

                // (B) BasicInfo 섹션이면: .right__track을 위로 이동 (스크롤바 없이 내용만 지나가게)
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
                                return Math.max(1, factor); // 내용이 길수록 세로 스크롤 구간 길게
                            },
                        },
                        '+=0'
                    );
                }

                // (C) Hobby 섹션이면: .hobby__track을 좌로 이동 (가로 스크롤 연출)
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
                                return Math.max(1, factor); // 가로 길이에 비례해서 구간 길게
                            },
                        },
                        '+=0'
                    );
                }
            });

            // 3) 타임라인 기반 ScrollTrigger (전체 스크롤 길이는 tl duration에 비례)
            ScrollTrigger.create({
                trigger: document.body,
                start: 'top top',
                end: () => `+=${root.scrollHeight + window.innerHeight}`,
                scrub: 0.8,
                pin: root,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                animation: tl,
            });

            ScrollTrigger.refresh();
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
