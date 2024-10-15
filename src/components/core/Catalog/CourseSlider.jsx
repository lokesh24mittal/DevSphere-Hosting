import React from 'react'
// import Swiper from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Course_Card from './Course_Card';
import { Pagination ,Autoplay,Navigation } from 'swiper/modules';

export default function CourseSlider({Courses}) {
    console.log("Insde course slider",Courses);
  return (
    <div>
                {
                    Courses?.length?(
                        <Swiper
                         slidesPerView={1} loop={true} spaceBetween={25} pagination={true} 
                         modules={[Autoplay,Pagination,Navigation]}
                         className='max-h-[30rem]'
                         autoplay={{
                            delay:1000,
                            disableOnInteraction:false
                         }}
                         navigation={true}
                         breakpoints={{
                            1024:{slidesPerView:3}
                         }}
                        >
                        {Courses.map((course,index)=>(
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"h-[250px]"}/>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    ):
                    (<p className='text-xl text-richblack-5'>"No Course Found"</p>)
                }
    </div>
  )
}
