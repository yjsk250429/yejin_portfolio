import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const Featured = () => {
    const [activeId, setActiveId] = useState(null);

    const videoRefs = useRef({});

    const conRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const markerWrapperRef = useRef(null);

    const slides = [
        {
            id: 1,
            img: '/images/fromgung.png',
            title: 'From Gung Project',
            desc: '25.08.28 - 25.09.24',
            vod: '/images/fromgung_video.mp4',
        },
        {
            id: 2,
            img: '/images/loccitane2.jpg',
            title: 'L’Occitane Redesign',
            desc: '25.07.31 - 25.08.26',
            vod: '/images/loccitane_video.mp4',
        },
        {
            id: 3,
            img: '/images/pubgxaespa.jpg',
            title: 'PUBG X aespa',
            desc: '25.07.11 - 25.07.14',
            vod: '/images/pubgxaespa_video.mp4',
        },
        {
            id: 4,
            img: '/images/kepco.png',
            title: 'KEPCO renewal',
            desc: '25.06.04 - 25.06.10',
            vod: '/images/d.mp4',
        },
        {
            id: 5,
            img: '/images/clarity_arrow-line.png',
            title: 'view\nall',
            desc: 'projects',
            vod: null,
        },
    ];

    const handleEnter = (id) => {
        setActiveId(id);
    };

    // 호버 이탈 시: 모두 정지
    const handleLeave = () => {
        setActiveId(null);
    };

    useEffect(() => {
        // 모든 비디오 일단 정지/리셋
        Object.values(videoRefs.current).forEach((el) => {
            if (!el) return;
            el.pause();
            el.currentTime = 0;
            el.classList.remove('active');
        });

        if (activeId == null) return;

        const el = videoRefs.current[activeId];
        if (!el) return;

        // 자동재생 정책 대응
        el.muted = true;
        el.playsInline = true;
        el.loop = true;

        el.classList.add('active');
        el.play().catch(() => {
            // 브라우저 정책으로 play 실패 가능 → 조용히 무시
        });
    }, [activeId]);

    useEffect(() => {
        const con = conRef.current;
        const wrap = sliderWrapperRef.current;
        const markerWrap = markerWrapperRef.current;
        if (!con || !wrap || !markerWrap) return;

        let target = 0;
        let current = 0;
        const ease = 0.075;
        let st;
        let maxScroll = 0;
        let rafId;

        const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
        const lerp = (a, b, t) => a + (b - a) * t;
        const getMaxScroll = () => wrap.scrollWidth - window.innerWidth;

        function updateMarker(progress) {
            const start = 70;
            const end = window.innerWidth - markerWrap.offsetWidth - 100;
            const x = lerp(start, Math.max(start, end), progress);
            gsap.set(markerWrap, { x });
        }

        function render() {
            current = lerp(current, target, ease);
            gsap.set(wrap, { x: -current });
            const progress = maxScroll > 0 ? current / maxScroll : 0;
            updateMarker(progress);
            rafId = requestAnimationFrame(render);
        }

        function setupScrollTrigger() {
            if (st) st.kill();
            maxScroll = getMaxScroll();
            st = ScrollTrigger.create({
                trigger: con,
                start: 'top top',
                end: () => `+=${maxScroll}`,
                pin: true,
                scrub: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    target = clamp(maxScroll * self.progress, 0, maxScroll);
                    if (self.progress >= 0.95) {
                        gsap.to(markerWrap, { opacity: 0, duration: 0.5 });
                    } else {
                        gsap.to(markerWrap, { opacity: 1, duration: 0.5 });
                    }
                },
            });
        }

        setupScrollTrigger();
        render();

        const onResize = () => {
            maxScroll = getMaxScroll();
            if (st) {
                st.vars.end = `+=${maxScroll}`;
                st.refresh();
            }
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            st && st.kill();
            rafId && cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section className="con con2" ref={conRef}>
            <h2>(featured projects)</h2>

            <div className="marker-wrapper" ref={markerWrapperRef}>
                <div className="marker">
                    <div className="grab" />
                </div>
            </div>

            <div className="slider">
                <div className="slider-wrapper" ref={sliderWrapperRef}>
                    {slides.map((s) => (
                        <div
                            className="slide"
                            key={s.id}
                            onMouseEnter={() => handleEnter(s.id)}
                            onMouseLeave={handleLeave}
                        >
                            <p className="img-wrap">
                                {/* {s.img && ( */}
                                <img
                                    src={s.img}
                                    alt={s.title}
                                    className={activeId === s.id ? 'img-hover' : ''}
                                />
                                {/* )} */}
                            </p>
                            <div className="txt">
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                            {s.vod && (
                                <video
                                    ref={(el) => (videoRefs.current[s.id] = el)}
                                    src={s.vod}
                                    className="vod"
                                    preload="metadata"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;
