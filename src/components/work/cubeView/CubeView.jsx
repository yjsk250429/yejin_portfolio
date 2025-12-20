import { useMemo, useState } from 'react';
import projects from '../../../api/projects';
import './style.scss';

import { EffectCube, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CubeView = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // 현재 선택된 프로젝트
    const current = useMemo(() => {
        if (!projects?.length) return null;
        return projects[Math.min(activeIndex, projects.length - 1)];
    }, [activeIndex]);

    const { web, github, figma } = current?.links ?? {};

    const { code, design } = current?.contribution ?? {};

    return (
        <div className="cubeView">
            <Swiper
                effect={'cube'}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[EffectCube, Pagination, Navigation]}
                className="mySwiper"
                onSlideChange={(swiper) => {
                    // loop 안 쓰면 activeIndex로 OK
                    setActiveIndex(swiper.activeIndex);
                    // loop를 쓸 경우: setActiveIndex(swiper.realIndex);
                }}
            >
                {projects?.map((p) => (
                    <SwiperSlide key={p.id}>
                        {p.thumImg ? (
                            <img src={p.thumImg} alt={p.title} />
                        ) : (
                            <div className="emptyMedia">No Image</div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="content">
                {current ? (
                    <>
                        <strong>{current.label}</strong>
                        <h3>{current.title}</h3>

                        <div className="details">
                            <dl>
                                <dt>TOOLS</dt>
                                <dd>
                                    <ul>
                                        {(current.tools ?? []).map((tool) => (
                                            <li key={tool}>{tool}</li>
                                        ))}
                                    </ul>
                                </dd>
                            </dl>

                            <dl>
                                <dt>LAYOUT</dt>
                                <dd>{current.layout}</dd>
                            </dl>

                            <dl>
                                <dt>TYPE</dt>
                                <dd>{current.type}</dd>
                            </dl>

                            <dl>
                                <dt>CONTRIBUTION</dt>
                                <dd>
                                    <ul>
                                        {code != null && (
                                            <li>
                                                <span>code</span> {code}%
                                            </li>
                                        )}
                                        {design != null && (
                                            <li>
                                                <span>design</span> {design}%
                                            </li>
                                        )}
                                    </ul>
                                </dd>
                            </dl>

                            <dl>
                                <dt>DESCRIPTION</dt>
                                <dd>{current.description}</dd>
                            </dl>
                        </div>
                        <p className="links">
                            {web && (
                                <a className="btn" href={web} target="_blank" rel="noreferrer">
                                    web page
                                </a>
                            )}
                            {github && (
                                <a className="btn" href={github} target="_blank" rel="noreferrer">
                                    github
                                </a>
                            )}
                            {figma && (
                                <a className="btn" href={figma} target="_blank" rel="noreferrer">
                                    figma
                                </a>
                            )}
                        </p>
                    </>
                ) : (
                    <div className="emptyContent">프로젝트 데이터가 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default CubeView;
