import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import ban1 from '../assets/banner1.jpg';
import ban2 from '../assets/banner2.jpg';
import ban3 from '../assets/banner3.jpg';
import ban4 from '../assets/banner4.jpg';
import { Link } from 'react-router';

const Banner = () => {
    const slides = [ban1, ban3, ban2, ban4];

    return (
        <div className="relative h-[65vh]">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                speed={1000}
                spaceBetween={0}
                className="h-[65vh]"
            >
                {slides.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${image})` }}>
                            <div className="w-full h-full bg-black/55"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="text-center text-white px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3">
                        Save Lives, <span className="text-primary">Donate Blood</span>
                    </h1>
                    <p className="text-lg text-white/90 md:text-2xl mb-6">
                        Every drop counts. Join us in making a difference today.
                    </p>
                    <div className="flex gap-4 justify-center">

                        <Link to="/register">
                            <button className="btn btn-primary btn-md md:btn-lg">
                                Join as Donor
                            </button>
                        </Link>
                        <Link to="/search">
                            <button className="btn btn-outline btn-md md:btn-lg text-white border-white hover:bg-white hover:text-[#2B2D42]">
                                Search Donors
                            </button>
                        </Link>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
