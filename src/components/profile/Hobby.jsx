import React, { useEffect, useRef, useState } from 'react';
import './CircleCarousel.scss';

const slidesData = Array.from({ length: 20 }, (_, i) => `Slide ${i + 1}`);
const dotsCount = 16;
const step = -360 / dotsCount;

const getAngleIncrement = (dots, next, prev, stepValue) => {
    let inc;
    const half = dots / 2;
    let prevIndex = prev;

    if (prevIndex > dots) prevIndex = dots - 1;

    if (Math.abs((inc = next - prevIndex)) <= half) return stepValue * inc;
    if (Math.abs((inc = next - prevIndex + dots)) <= half) return stepValue * inc;
    if (Math.abs((inc = next - prevIndex - dots)) <= half) return stepValue * inc;

    return 0;
};

const Hobby = ({ speed = 300, autoplay = 2500 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [angle, setAngle] = useState(0);

    const prevIndexRef = useRef(0);
    const angleRef = useRef(0);
    const autoplayRef = useRef(null);

    const slidesCount = slidesData.length;

    const setSlide = (targetIndex) => {
        let next = targetIndex;

        if (next < 0) next = slidesCount - 1;
        else if (next >= slidesCount) next = 0;

        setActiveIndex(next);
    };

    const handleNext = () => {
        setSlide(activeIndex + 1);
    };

    const handlePrev = () => {
        setSlide(activeIndex - 1);
    };

    const handleDotClick = (index) => {
        setSlide(index);
    };

    const startAutoplay = () => {
        if (!autoplay) return;
        stopAutoplay();

        autoplayRef.current = setInterval(() => {
            setActiveIndex((prev) => {
                let next = prev + 1;
                if (next >= slidesCount) next = 0;
                return next;
            });
        }, autoplay);
    };

    const stopAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    };

    // angle 계산 (activeIndex가 바뀔 때만)
    useEffect(() => {
        const prev = prevIndexRef.current;
        const next = activeIndex;

        if (next < dotsCount) {
            const inc = getAngleIncrement(dotsCount, next, prev, step);
            angleRef.current += inc;
            setAngle(angleRef.current);
        }

        prevIndexRef.current = next;
    }, [activeIndex]);

    // autoplay 설정
    useEffect(() => {
        startAutoplay();
        return () => {
            stopAutoplay();
        };
        // autoplay 값이 바뀌었을 때만 재설정
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoplay]);

    return (
        <section className="container">
            <div
                className="circle-carousel"
                onMouseEnter={stopAutoplay}
                onMouseLeave={startAutoplay}
            >
                <div className="slides">
                    {slidesData.map((label, index) => (
                        <div
                            key={index}
                            className={`slide ${index === activeIndex ? 'active' : ''}`}
                        >
                            <h2>{label}</h2>
                        </div>
                    ))}
                </div>

                <div
                    className="pagination"
                    style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                        transitionDuration: `${speed}ms`,
                    }}
                >
                    {Array.from({ length: dotsCount }, (_, i) => (
                        <div
                            key={i}
                            className={`item ${i === activeIndex ? 'active' : ''}`}
                            style={{
                                transform: `rotate(${(360 / dotsCount) * i}deg)`,
                            }}
                        >
                            <div className="dot" onClick={() => handleDotClick(i)}>
                                <span>{i + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="next" onClick={handleNext}>
                    Next
                </div>
                <div className="prev" onClick={handlePrev}>
                    Prev
                </div>
            </div>
        </section>
    );
};

export default Hobby;
