import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const itemsData = [
    {
        id: 1,
        img: '/images/img1.jpg',
        alt: 'Interactive Fashion Slider',
        text: 'Interactive Fashion Slider — React · Swiper · GSAP',
    },
    {
        id: 2,
        img: '/images/img1.jpg',
        alt: 'E-commerce Product Gallery',
        text: 'E-commerce Product Gallery — Next.js · SSR/ISR · 접근성(A11y)',
    },
    {
        id: 3,
        img: '/images/img1.jpg',
        alt: 'Dashboard',
        text: 'Analytics Dashboard — React Query · Recharts · 상태관리(Zustand)',
    },
    {
        id: 4,
        img: '/images/pic1.jpg',
        alt: 'Auth',
        text: 'Auth & Profile — Firebase Auth · OAuth · 보안 규칙',
    },
    {
        id: 5,
        img: '/images/img-1.jpg',
        alt: 'REST API',
        text: 'REST API Board — Express · MongoDB · JWT · CRUD',
    },
    {
        id: 6,
        img: '/images/img1.jpg',
        alt: 'Design System',
        text: 'Design System — TypeScript · Storybook · 재사용 컴포넌트',
    },
    {
        id: 7,
        img: '/images/img1.jpg',
        alt: 'Performance',
        text: 'Performance Optimizations — Code-split · Lazy · Lighthouse 95+',
    },
    {
        id: 8,
        img: '/images/img1.jpg',
        alt: 'CI/CD',
        text: 'CI/CD & 배포 — GitHub Actions · Vercel · 환경변수/시크릿',
    },
];

const Journey = () => {
    const wrapRef = useRef(null);

    useLayoutEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        const ctx = gsap.context(() => {
            // 초기 상태 (원본 코드와 동일)
            gsap.set('.con2 .item-img img', {
                transformOrigin: 'center center',
                scale: 1.25,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                willChange: 'transform, clip-path',
            });

            // 아이템별 리빌
            gsap.utils.toArray('.con2 .item').forEach((item) => {
                const img = item.querySelector('.item-img img');
                if (!img) return;

                gsap.fromTo(
                    img,
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
                    {
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        ease: 'none', // scrub일 때는 none이 더 자연스러움
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%', // ✅ 더 일찍 시작
                            end: 'bottom 30%', // ✅ 더 늦게 끝남(구간 길어짐)
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            });
        }, wrap);
        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, []);

    return (
        <main className="journey" ref={wrapRef}>
            <section className="con con1">
                <div className="inner">
                    <h2>Section 1</h2>
                </div>
            </section>

            <section className="con con2">
                <div className="inner">
                    <h2>Section 2</h2>

                    <div className="items">
                        {itemsData.map((it) => (
                            <article key={it.id} className="item">
                                <div className="item-img">
                                    <img src={it.img} alt={it.alt} />
                                </div>
                                <div className="item-info">
                                    <p>{it.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="con con3">
                <div className="inner">
                    <h2>Section 3</h2>
                </div>
            </section>

            <section className="con con4">
                <div className="inner">
                    <h2>Section 4</h2>
                </div>
            </section>
        </main>
    );
};

export default Journey;
