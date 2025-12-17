import './style.scss';
import { EffectCube, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CubeView = () => {
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
            >
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
            </Swiper>
            <div className="content">
                <strong></strong>
                <h3></h3>
                <dl>
                    <dt>TOOLS</dt>
                    <dd>
                        <ul>
                            <li></li>
                        </ul>
                    </dd>
                </dl>
                <dl>
                    <dt>LAYOUT</dt>
                    <dd></dd>
                </dl>
                <dl>
                    <dt>TYPE</dt>
                    <dd></dd>
                </dl>
                <dl>
                    <dt>CONTRIBUTION</dt>
                    <dd>
                        <ul>
                            <li>
                                <span></span>%
                            </li>
                        </ul>
                    </dd>
                </dl>
                <dl>
                    <dt>DESCRIPTION</dt>
                    <dd></dd>
                </dl>
                <p className="links">
                    <button></button>
                </p>
            </div>
        </div>
    );
};

export default CubeView;
