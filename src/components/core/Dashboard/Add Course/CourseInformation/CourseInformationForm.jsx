import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import RequirementField from './RequirementField';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { setCourse, setStep  } from '../../../../../slice/CourseSlice';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/CourseDetailsApi';
import Upload from '../Upload';
import ChipInput from './ChipInput';
import { MdNavigateNext } from 'react-icons/md';


export default function CourseInformationForm() {
    const {step} =useSelector((state)=>state.course)
   
    const {token}=useSelector((state)=>state.auth);
     const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();
     const dispatch=useDispatch();
     const {course,editCourse}=useSelector((state)=>state.course);
     const[loading,setLoading]=useState(false);
     const[courseCategories,setCourseCategories]=useState([]);

     useEffect(()=>{
            const getCategories=async()=>{
                setLoading(true);
                const categories=await fetchCourseCategories();
                if(categories.length>0){
                    setCourseCategories(categories);
                }
                console.log("course Categories are--------  ", courseCategories)
                setLoading(false);
                
            }
                if(editCourse){
                    setValue("courseTitle",course.courseName);
                    setValue("courseShotDesc",course.courseDescription);
                    setValue("coursePrice",course.price);
                    setValue("courseTags",course.tag);
                    setValue("courseBenifits",course.whatYouWillLearm);
                    setValue("courseCategory",course.category);
                    setValue("courseRequirements",course.instructions);
                    setValue("courseImage",course.thumbnail);
            }
                getCategories();

                
     },[]);

     const isformUpdated=()=>{
        const currentValues=getValues();
        if
        (
            currentValues.courseTitle!==course.courseName ||
            currentValues.courseShortDesc!==course.courseDescription ||
            currentValues.coursePrice!==course.price ||
            currentValues.courseTags.toString()!==course.tag.toString() ||
            currentValues.courseBenifits!==course.whatYouWillLearn ||
            currentValues.courseCategory._id!==course.category._id ||
            currentValues.courseImage!==course.thumbnail ||
            currentValues.courseRequirements.toString()!==course.instructions.toString() 
        )
            return true;
        else{
            return false
        }
     }

    //  handle next button click
     const onSubmit=async(data)=>{
        console.log("On Handle onSubmit")
        console.log(course)
        if(editCourse){
           if(isformUpdated){
            const currentValues=getValues();
            const formData=new FormData();

            formData.append("courseId",course._id);
            if(currentValues.courseTitle!==course.courseName){
                formData.append("courseName",data.courseTitle)
            }
            if(currentValues.courseShortDesc!==course.courseDescription){
                formData.append("courseDescription",data.courseShortDesc)
            }
            if(currentValues.coursePrice!==course.price){
                formData.append("price",data.coursePrice)
            }
            if(currentValues.courseBenifits!==course.whatYouWillLearn){
                formData.append("whatYouWillLearn",data.courseBenifis)
            }
            if(currentValues.courseCategory._id!==course.category._id){
                formData.append("category",data.courseCategory)
            }
            if(currentValues.courseRequirements.toString()!==course.instructions.toString()){
                formData.append("instructions",JSON.stringify(data.courseRequirements))
            }
            if(currentValues.courseImage!==course.thumbnail){
                formData.append("thumbnailImage",data.courseImage);
            }

            setLoading(true);
            const result=await editCourseDetails(formData,token);
            setLoading(false);
            console.log(result);
            if(result){
                console.log("setting step 2",result)
                dispatch(setStep(2));
                console.log(step,"step")
                dispatch(setCourse(result));
            }
            
           }
           else{
            toast.error("No changes made so far")
        }
        return;
        }
        // create a new Course
        const formData=new FormData();
                    formData.append("courseName",data.courseTitle);
                    formData.append("courseDescription",data.courseShortDesc);
                    formData.append("price",data.coursePrice);
                    formData.append("tag",JSON.stringify(data.courseTags));
                    formData.append("whatYouWillLearn",data.CourseBenifits);
                    formData.append("category",data.courseCategory);
                    formData.append("instructions",JSON.stringify(data.courseRequirements));
                    formData.append("thumbnailImage",data.courseImage);
                    formData.append("status",COURSE_STATUS.DRAFT);

                    setLoading(true);
                    console.log(data)
                    const result=await addCourseDetails(formData,token);
                    
                    if(result){
                        console.log("result from course Information",result);
                        dispatch(setStep(2));
                        dispatch(setCourse(result));
                    }
                    setLoading(false);

        
     }
  return (
    <div>
<form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 text-white'>
<div className="flex flex-col space-y-2">
    <label htmlFor='courseTitle' className="text-sm text-richblack-5">Course Title <sup className='text-pink-200'>*</sup></label>
    <input className="w-full form-style" id="courseTitle" placeholder='Enter Course Title' {...register("courseTitle",{required:true})}
    />
    {
        errors.courseTitle &&(
            <span  className='ml-2 text-xs tracking-wide text-pink-200'>Course Title is Required</span>
        )
    }
    </div>
    <div className="flex flex-col space-y-2">
    <label htmlFor='courseShortDesc'className="text-sm text-richblack-5" >Course Short Description <sup className='text-pink-200'>*</sup></label>
    <textarea className="w-full min-h-[140px] resize-x-none form-style" 
    id="courseShortDesc" placeholder='Enter Description' {...register("courseShortDesc",{required:true})}/>
    {
        errors.courseShortDesc &&(
            <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Description is Required</span>
        )
    }
    </div>
    <div className='flex flex-col space-y-2'>
    <label htmlFor='coursePrice' className='text-sm text-richblack-5'>Course Price <sup className='text-pink-200'>*</sup></label>
    <div className="relative">
    <input className="w-full form-style !pl-12" id="coursePrice" placeholder='Enter Course Price'
     {...register("coursePrice",{required:true,valueAsNumber:true,pattern:{
        value:/^(0|[1-9]\d*)(\.\d+)?$/,
     }})}/>
    <HiOutlineCurrencyRupee className='absolute top-1/2 left-3 inline-block -translate-y-1/2 text-richblack-400 text-2xl'/>
    </div>
    {
        errors.coursePrice &&(
            <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Price is Required</span>
        )
    }
    </div>

    <div className='flex flex-col space-y-2'>
        <label htmlFor='courseCategory' className='text-sm text-richblack-5'>Course Category<sup className='text-pink-200'>*</sup></label>
        <select id="courseCategory" defaultValue="" {...register("courseCategory",{required:true})} className='form-style w-full'>
        <option value='' disabled>Choose a category</option>
        {
            !loading && courseCategories?.map((category,index)=>(
            
                <option key={index} value={category?._id}>{category?.name}</option>
            ))
        }
        </select>{
            errors.courseCategory &&(
                <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Category is required</span>
                 )
        }
    </div>
{/* //create a custom component for handling tag input */}
<ChipInput label="Tags"
 name="courseTags"
  placeholder="Enter tags and press Enter"
   register={register}
    errors={errors}
     setValue={setValue} 
     getValues={getValues}/>
    
    {/* create a component for uploading and showing preview a media */}
        <Upload name="courseImage"
        label="course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse?course?.thumbnail:null}
        />

        {/* benifit of the course */}
        <div className='flex flex-col space-y-2'>
            <label className='text-sm text-richblack-5' htmlFor='courseBenifits'>
                Benifits of the course <sup className='text-pink-200'>*</sup>
            </label>
            <textarea id="courseBenifits" placeholder='Enter benifits of the course' {...register("CourseBenifits",{required:true})}
            className='min-h-[130px] w-full resize-x-none form-style'/>
            {
                errors.courseBenifits &&(
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>Benifits of the course are required</span>
                )
            }
        </div>
        
        <RequirementField name="courseRequirements" label="Requirements/Instructions" register={register} errors={errors} setvalue={setValue} getValues={getValues}/> 

        <div className='flex flex-col space-y-2'>
            {
            editCourse &&(
                <button onClick={()=>dispatch(setStep(2))}
                        className='flex w-fit items-center gap-x-2 bg-richblack-300 cursor-pointer rounded-md py-[8px] px-[20px] font-semibold text-richblack-900'
                >Continue without Saving</button>
            )

}
<IconBtn customClasses={"w-fit"} disabled={loading}  text={!editCourse ?"Next":"Save Changes"}>
    <MdNavigateNext/>
    </IconBtn>
</div>

</form>
    </div>
  )
}
