import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const Featured = () => {
    const conRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const markerWrapperRef = useRef(null);

    // ✅ 슬라이드 5개로 변경
    const slides = [
        {
            id: 1,
            img: '/images/fromgung.png',
            title: 'From Gung Project',
            desc: 'team',
        },
        {
            id: 2,
            img: '/images/loccitane.png',
            title: 'L’Occitane Redesign',
            desc: 'team',
        },
        {
            id: 3,
            img: '/images/images/03.jpg',
            title: 'PUBG X aespa',
            desc: 'individual',
        },
        {
            id: 4,
            img: '/images/kepco.png',
            title: 'KEPCO renewal',
            desc: 'team',
        },
        {
            id: 5,
            img: '/images/images/05.jpg',
            title: 'view\nall',
            desc: 'projects',
        },
    ];

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
            <h2>Featured Projects</h2>

            <div className="marker-wrapper" ref={markerWrapperRef}>
                <div className="marker">
                    <div className="grab" />
                </div>
            </div>

            <div className="slider">
                <div className="slider-wrapper" ref={sliderWrapperRef}>
                    {slides.map((s) => (
                        <div className="slide" key={s.id}>
                            <p className="img-wrap">
                                <img src={s.img} alt={s.title} />
                            </p>
                            <div className="txt">
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;
