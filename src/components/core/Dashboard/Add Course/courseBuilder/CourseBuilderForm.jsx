import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { GrAddCircle } from 'react-icons/gr';
import { BiAddToQueue, BiRightArrow } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import NestedView from './NestedView';
import { setCourse, setEditCourse, setStep } from '../../../../../slice/CourseSlice';
import { createSection, updateSection } from '../../../../../services/operations/CourseDetailsApi';

export default function CourseBuilderForm() {
  const {register,handleSubmit,setValue ,formState:{errors}}=useForm();
  const[editSectionName,setEditSectionName]=useState(null);
  const {course}=useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false);
  console.log("course",course)
  const dispatch=useDispatch();

  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","");
  }

  const goBack=()=>{
dispatch(setStep(1));
dispatch(setEditCourse(true));
  };

  const goToNext=()=>{
    if(course.courseContent.length===0){
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length==0)){
      toast.error("Please add atleast one lecture in each section")
    return;
    }
    // if every thing is fine
    dispatch(setStep(3));
  }

  const onSubmit=async(data)=>{
    setLoading(true);
    let result;

    if(editSectionName){
      console.log("Edit Section Name",editSectionName)
    //we are editing the section name
    result =await updateSection(
      {
        sectionName:data.SectionName,
        sectionId:editSectionName,
        courseId:course._id,
      },token
    )
  }
  else{
    result=await createSection({
      sectionName:data.SectionName,
      courseId:course._id,
    },token)
  }
console.log(result)
  // update values
  if(result){
    console.log("section result ----")
    console.log(result);
    dispatch(setCourse(result));
    setEditSectionName(null);
    setValue("sectionName","");
   
  };
  setLoading(false);
  }

  const handleChangedEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName===sectionId){
      cancelEdit();
      return; 
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }
  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor='sectionName'
          className="text-sm text-richblack-5"
          >Section Name<sup className="text-pink-200">*</sup></label>
          <input id='sectionName' placeholder='Add a section to build a course'
          {...register("SectionName",{required:true})}
          className='w-full form-style'
          />
          {errors.sectionName &&(
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section Name is Required
            </span>
          )}
          </div>
            <div className='flex items-center gap-x-4'>
              <IconBtn type={"submit"} text={editSectionName?"Edit Section Name":"Create Section"}
              outline={true} disabled={loading}>
              <MdAddCircleOutline size={20} className="text-yellow-50"/>
              </IconBtn>
              {editSectionName &&(
                <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline'>cancel Edit</button>
              )}
            </div>
      </form>


      {/* {
      console.log("Inside Nested View Course Butilder");
} */}
{
      course?.courseContent?.length>0 && (
        <NestedView handleChangedEditSectionName={handleChangedEditSectionName}/>
      )}

      <div className='flex justify-end gap-x-3'>
        <button onClick={goBack}className='rounded-md cursor-pointer flex gap-x-2 bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 items-center'>Back</button>
        <IconBtn text={"Next"} onClick={goToNext}><BiRightArrow/></IconBtn>
      </div>
    </div>
  )
}
