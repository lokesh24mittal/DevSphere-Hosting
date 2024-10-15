import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { ToastBar } from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { setCourse } from '../../../../../slice/CourseSlice';
import { createSubSection, updateSubSection } from '../../../../../services/operations/CourseDetailsApi';
import Upload from '../Upload';

export default function SubSectionModal({
    modalData,setModalData, add=false,view=false,edit=false
}) {
    const {register,handleSubmit, setValue,formState:{errors},getValues}=useForm();

    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);

    useEffect(()=>{
        console.log('Modal Data in Sub SEction Modal',modalData.videoURL)
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("LectureVideo",modalData.videoURL);
        }
    },[]);

    const isformUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.lectureTitle!==modalData.title||
            currentValues.lectureDesc!==modalData.dscription||
            currentValues.LectureVideo!==modalData.videoURL
        ){
            return true;
        }else{
            return false;
        }
    }
    const onSubmit=async(data)=>{
        if(view){
            return;
        }
        if(edit){
            if(!isformUpdated){
                toast.error("No changes made to the form")
            }
            else{
                handleEditSubSection();
            }
            return
        }

        // add
        const formData=new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("videoFile",data.LectureVideo);
        setLoading(true);
        // api call
        const result=await createSubSection(formData,token);
        if(result){
            console.log("Hi from result from subs ection creare")
            const updatedCourseContent=course.courseContent.map((section)=>
                section._id===modalData?result:section);
            const updatedCourse={...course,courseContent:updatedCourseContent}
            console.log(updatedCourse,"create sub section result");
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);

    }
    const handleEditSubSection=async()=>{
        console.log("I am under handle edit sub section")
        const currentValues=getValues();
        const formData=new FormData();

        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);
        console.log(modalData._id,"model data id");

        if(currentValues.lectureTitle!==modalData.title){
            formData.append("title",currentValues.lectureTitle)
        };

        if(currentValues.lectureDesc!==modalData.description){
            formData.append("description",currentValues.lectureDesc)
        }


        if(currentValues.LectureVideo!==modalData.videoUrl){
            formData.append("videoFile",currentValues.LectureVideo);
        }


        setLoading(true);
        // api call
        const result=await updateSubSection(formData,token);
        if(result){
            console.log("Update SubSection Result",result)
            const updatedCourseContent=course.courseContent.map((section)=>
                section._id===modalData.sectionId?result:section);
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);


    }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
            <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                <p
                className='text-xl font-semibold text-richblack-5'
                >{view&&"Viewing"} {add&&"Adding"} {edit&&"Editing"} Lecture</p>
                <button onClick={()=>(!loading ?setModalData(null):{})}>
                    <RxCross1 className='text-2xl text-richblack-5'/>
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 px-8 py-10'>

                {/* lecture video upload */}
                <Upload name="LectureVideo" label="LectureVideo" register={register} setValue={setValue} 
                    errors={errors} video={true} viewData={view?modalData.videoURL:null} editData={edit?modalData.videoURL:null}/>

                    {/* lecture title */}
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='lectureTitle'>
                    Lecture Title {!view &&<sup className="text-pink-200">*</sup>}</label>
                <input id='lectureTitle' placeholder='Enter Lecture Title' disabled={view ||loading}
                    {...register("lectureTitle",{required:true})}
                     className='w-full form-style'
                     />
                     {errors.lectureTitle &&
                     (<span className='ml-2 text-xs tracking-wide text-pink-200'>Lecture Title is Required</span>)}
            </div>
            {/* lectire description */}
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='lectureDesc'>Label Description{" "}{!view &&<sup className="text-pink-200">*</sup>}</label>
                <textarea disabled={view||loading} id="lectureDesc" placeholder='Enter Lecture Description' {...register("lectureDesc",{required:true})}
                className='w-full min-h-[130px] resize-x-none form-style'/>
                {
                    errors.lectureDec &&(<span className='ml-2 text-xs tracking-wide text-pink-200'> 
                        Lecture Description is Required
                    </span>)
                }
            </div>
            {
                !view &&(
                    <div className='flex justify-end'>
                        <IconBtn text={loading?"Loading...":edit?"Save Changes":"Save"}/>
                    </div>
                )
            }
            </form>
        </div>
    </div>
  )
}
