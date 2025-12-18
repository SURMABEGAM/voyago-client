import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import bus2 from "../assets/bus2.jpg";
import bus3 from "../assets/bus3.jpg";
import bus4 from "../assets/bus4.jpg";
import banner from "../assets/banner.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const HeroSlider = () => {
  return (
    <div className="w-full h-[420px] md:h-[520px] lg:h-[600px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        <SwiperSlide>
          <img
            src={banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img src={bus2} alt="Bus" className="w-full h-full object-cover" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={bus3} alt="Bus" className="w-full h-full object-cover" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={bus4} alt="Bus" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
