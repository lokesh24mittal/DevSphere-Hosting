import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars';
import getAvgRating from '../../../utils/avgRating';

export default function Course_Card({course,height}) {
    console.log("Inside course card");
    console.log("course under course card",course);
    const [averageReviewCount,setAverageReviewCount]=useState(0);

    useEffect(()=>{
        const count=getAvgRating(course.ratingAndReviews);
        setAverageReviewCount(count);
    },[course])
  return (
        <Link to={`/courses/${course._id}`}>
        <div>
            <div className='rounded-lg'>
                <img src={course?.thumbnail} alt={course.courseName} className={`${height} w-full rounded-xl object-cover`}/>
            </div>
            <div className='flex flex-col gap-2 px-1 py-3'>
                <p className='text-xl text-richblack-5'
                >{course?.courseName}</p>
                <p className='text-sm text-richblack-50'
                >{course?.Instructor?.firstName}{" "}{course?.Instructor?.lastName}</p>
                <div className='flex items-center gap-2'>
                    <span className='text-yellow-5'>{averageReviewCount ||0}</span>
                    <RatingStars Review_Count={averageReviewCount}/>
                    <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
                </div>
                <p className='text-xl text-richblack-5'>Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
  )
}
