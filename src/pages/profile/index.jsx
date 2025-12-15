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
        console.log('ScrollTrigger is', ScrollTrigger);
        const wrapper = wrapperRef.current;
        const stage = stageRef.current;
        if (!wrapper || !stage) return;

        // ✅ 배포 디버그용: 콘솔에서 확인 가능
        window.ScrollTrigger = ScrollTrigger;

        const panels = Array.from(stage.querySelectorAll('.profile__panel'));
        if (panels.length < 2) return;

        // 혹시 이전 잔재가 있으면 정리
        ScrollTrigger.getAll().forEach((t) => {
            // 다른 페이지 트리거까지 죽일 수 있으니 "Profile 것만" 죽이는 게 이상적이지만
            // 지금은 원인 분리 위해 일단 전부 정리(문제 해결 후 범위 좁히면 됨)
            t.kill();
        });

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
            // tl이 “겹침 패널” 구조에서는 scrollHeight로 end 잡으면 깨짐 → duration 기반으로 강제
            const h = Math.ceil(tl.totalDuration() * window.innerHeight);
            wrapper.style.height = `${Math.max(h, window.innerHeight)}px`;
        };

        // ✅ 레이아웃 안정화 후 세팅
        setWrapperHeight();

        // ✅ 핵심: wrapper가 스크롤을 만들고, stage는 pin

        const st = ScrollTrigger.create({
            trigger: wrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            pin: stage,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: tl,
            // markers: true, // 필요하면 켜서 배포에서 확인
        });

        // ✅ 배포 디버그용: 콘솔에서 window.__profileST로 확인 가능
        window.__profileST = st;

        // refresh 타이밍(배포에서 폰트/이미지 로딩으로 높이 변하는 케이스 대비)
        ScrollTrigger.refresh();
        requestAnimationFrame(() => {
            setWrapperHeight();
            ScrollTrigger.refresh();
        });
        window.addEventListener(
            'load',
            () => {
                setWrapperHeight();
                ScrollTrigger.refresh();
            },
            { once: true }
        );

        const onResize = () => {
            setWrapperHeight();
            ScrollTrigger.refresh();
        };
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
            </main>
        </div>
    );
};

export default Profile;
