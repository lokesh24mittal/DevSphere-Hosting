import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn';
import CourseTable from './CourseTable';
import { fetchInstructorCourses } from '../../../../services/operations/CourseDetailsApi';
import { VscAdd } from 'react-icons/vsc';

export default function MyCourses() {
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        const fetchCourses=async()=>{
            const result=await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
                console.log(result,"result from my courses")
            }
        }
        
        fetchCourses();
    },[]);
  return (
    <div>
        <div className='mb-14 flex items-center justify-between'>
            <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
            <IconBtn text="Add Course" onClick={()=>navigate("/dashboard/add-course")}> 
            <VscAdd/>
            </IconBtn>

        </div>
        {courses&& <CourseTable courses={courses} setCourses={setCourses}/>}

    </div>
  )
}
