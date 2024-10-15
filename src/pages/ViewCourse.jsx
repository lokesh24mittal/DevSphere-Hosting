import React, { useEffect, useState } from"react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/CourseDetailsApi";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../slice/ViewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";


export default function ViewCourse(){

    const {token}=useSelector((state)=>state.auth);
    const{courseId}=useParams();
    const dispatch=useDispatch();

    useEffect(()=>{
        const courseSpecificDetails=async()=>{
            const courseData=await getFullDetailsOfCourse(courseId,token);
            console.log(courseData,"courseData");
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures=0;

            courseData?.courseDetails?.courseContent.forEach((sec)=>{
                lectures+=sec.subSection.length
            });
            dispatch(setTotalNoOfLectures(lectures));
            
        }
        courseSpecificDetails();
    },[]);

    const [reviewModal,setReviewModal]=useState();
    return(
        <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>

            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6">
            <Outlet/>
                </div>
                </div>
        </div>
                {reviewModal &&<CourseReviewModal setReviewModal={setReviewModal}/>}
        </>
    )
}