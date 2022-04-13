import React from 'react';
import MovieData from '../movieData/MovieData.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper';

const MovieDatas = ({ datas }) => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 20,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className='mySwiper'
    >
      {datas.map((data) => (
        <SwiperSlide>
          <MovieData data={data} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieDatas;
