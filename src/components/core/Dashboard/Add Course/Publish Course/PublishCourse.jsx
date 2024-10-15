import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import {  useNavigate } from 'react-router-dom';
import { resetCourseState, setStep } from '../../../../../slice/CourseSlice';
import { editCourseDetails } from '../../../../../services/operations/CourseDetailsApi';

export default function PublishCourse() {
  const {handleSubmit, register, setValue, getValues}=useForm();
  const {course} =useSelector((state)=>state.course);
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();

  const [loading,setLoading]=useState();
  useEffect(()=>{
    if(course?.status===COURSE_STATUS.PUBLISHED){
      setValue("public", true)
    }
  },[])
  const onSubmit=()=>{
handleCoursePublish();
  }
  const handleCoursePublish=async()=>{
    if((course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true) ||
  (course.status===COURSE_STATUS.DRAFT &getValues("public") ===false)){
    // no update in form
    // no need to make api call
    goToCourses();
    return;
  }
    // if form is updated
    const formData=new FormData();
    formData.append("courseId",course._id);
    const courseStatus=getValues("public")? COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
    formData.append("status",courseStatus);
    
    // api call
    setLoading(true);
    const result=await editCourseDetails(formData,token);
    if(result){
      goToCourses();
    }
    setLoading(false);
  }
  const goToCourses=()=>{
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  }
  const goBack=()=>{
    dispatch(setStep(2));
  }
  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-white'>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='public'>
            <input type="checkbox" id="public" {...register("public")} className="rounded h-4 w-4"/>
            <span className='ml-3'>Make this course as Public</span>
            </label>
          </div>
          <div className='flex justify-end gap-x-3'>
            <button className='flex items-cnter rounded-md bg-richblack-300 p-3'
            disabled={loading}
            type='button'
            onClick={goBack}>Go Back</button>
            <IconBtn disabled={loading} text={"save Changes"}/>
          </div>
        </form>
    </div>
  )
}
