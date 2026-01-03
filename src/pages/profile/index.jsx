import BasicInfo from '../../components/profile/basic/BasicInfo';
import Hobby from '../../components/profile/hobby/Hobby';
import Motto from '../../components/profile/motto/Motto';
import './style.scss';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Experience from '../../components/profile/experience/Experience';

gsap.registerPlugin(ScrollTrigger);

const startRot = [0, 5, 0, -5];
const endRot = [-10, -5, 10, 5];
const progressColors = ['#ecb74c', '#7dd8cd', '#e0ff57', '#7dd8cd'];

const Profile = () => {
    const wrapperRef = useRef(null);
    const stageRef = useRef(null);

    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        const stage = stageRef.current;
        if (!wrapper || !stage) return;

        const panels = Array.from(stage.querySelectorAll('.profile__panel'));
        if (panels.length < 2) return;

        gsap.set(panels, { yPercent: 0 });
        gsap.set(panels.slice(1), { yPercent: 100 });

        const tl = gsap.timeline({ defaults: { ease: 'none' } });

        // ✅ Experience 전용 구간 타임라인 생성 함수
        const buildExperienceSegment = (panelEl) => {
            const exp = panelEl.querySelector('.experience');
            if (!exp) return null;

            const header = exp.querySelector('.sticky-header');
            const cards = Array.from(exp.querySelectorAll('.card'));
            const indicesWrap = exp.querySelector('.indices');
            const indices = Array.from(exp.querySelectorAll('.index'));
            const progressWrap = exp.querySelector('.progress-bar');
            const progress = exp.querySelector('.progress');

            if (!header || cards.length === 0 || !progressWrap || !progress || !indicesWrap)
                return null;

            // 초기 상태 강제 세팅(패널 들어올 때마다 안정적으로)
            gsap.set(header, { opacity: 1 });
            gsap.set([indicesWrap, progressWrap], { opacity: 0 });
            gsap.set(progress, { height: '0%', backgroundColor: '#353531' });

            cards.forEach((card, i) => {
                gsap.set(card, { top: '150%', rotation: startRot[i] ?? 0 });
            });
            indices.forEach((idxEl) => gsap.set(idxEl, { opacity: 0.25 }));

            const seg = gsap.timeline();

            // 0~1: 헤더 페이드아웃
            // seg.to(header, { opacity: 0, duration: 1 });

            // // 1부터: UI(인덱스/프로그레스) 등장
            // seg.to([indicesWrap, progressWrap], { opacity: 1, duration: 0.4 }, 1);

            // 카드 N개를 순차적으로 올림
            const n = cards.length;
            for (let i = 0; i < n; i++) {
                const t = 1 + i; // 각 카드 구간 시작 타임
                const card = cards[i];

                // 인덱스 강조
                seg.to(
                    indices,
                    {
                        opacity: (idx) => (idx === i ? 1 : 0.25),
                        duration: 0.2,
                    },
                    t
                );

                // 프로그레스 업데이트 (높이/색상)
                seg.to(
                    progress,
                    {
                        height: `${((i + 1) / n) * 100}%`,
                        backgroundColor: progressColors[i] ?? '#353531',
                        duration: 0.35,
                    },
                    t
                );

                // 이전 카드들: 중앙 고정 + 최종 회전(안전 보정)
                for (let k = 0; k < i; k++) {
                    seg.set(cards[k], { top: '50%', rotation: endRot[k] ?? 0 }, t);
                }

                // 현재 카드: 150% -> 50%, startRot -> endRot
                seg.to(
                    card,
                    {
                        top: '50%',
                        rotation: endRot[i] ?? 0,
                        duration: 1,
                        ease: 'power2.out',
                    },
                    t
                );
            }

            // 마지막 살짝 홀드(여운)
            seg.to({}, { duration: 0.6 });

            return seg;
        };

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

            // ✅ (D) Experience 구간: next 패널이 Experience면 tl에 합치기
            const expSeg = buildExperienceSegment(next);
            if (expSeg) {
                tl.add(expSeg, '+=0'); // 패널이 올라온 직후 이어서 실행
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

        const onResize = () => {
            setWrapperHeight();
            ScrollTrigger.refresh();
        };

        // 초기 보정
        requestAnimationFrame(() => {
            setWrapperHeight();
            ScrollTrigger.refresh();
        });

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
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

                <section className="profile__panel">
                    <Experience />
                </section>
            </main>
        </div>
    );
};

export default Profile;
