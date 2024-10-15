import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function RequirementField({name,label,setvalue,getvalues,register,errors}) {
    const [requirement,setRequirement]=useState("");
    const [requirementList,setRequirementList]=useState([]);
    const {editCourse,course}=useSelector((state)=>state.course)

    const handleRemoveRequirement=(index)=>{
        const updatedRequirementList=[...requirementList];
        console.log(" updated requirement list",updatedRequirementList)
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
        console.log("At last requiremengt list",requirementList)
    }

    const handleAddRequirement=()=>{
        console.log(requirement)
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            console.log(requirementList)
            setRequirement("");
        }

    };
  

    useEffect(()=>{
        if(editCourse){
            setRequirementList(course?.instructions)
        }
        register(name,{required:true, validate:(value)=>value.length>0})
    },[]);

    useEffect(()=>{
        setvalue(name,requirementList);
    },[requirementList]);
  return (
    <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor={name}>
            {label}<sup className='text-pink-200'>*</sup></label>
        <div className='flex flex-col items-start space-y-2'>
        <input type='text' id={name} value={requirement} onChange={(e)=>setRequirement(e.target.value)} className='w-full form-style'/><br/>
        <button type="button" 
        onClick={handleAddRequirement}
        className='font-semibold text-yellow-50'>Add</button>
</div>
{
    requirementList.length>0&&(
        <ul className='mt-2 list-inside list-disc'>
             {
                requirementList.map((req,index)=>(
            <li key={index} className='flex items-center text-richblack-5'>
                <span>{req}</span>
                <button type='button'  className='text-xs ml-2 text-pure-greys-300' onClick={()=>handleRemoveRequirement(index)}>Clear</button>
            </li>
                ))
            } 
        </ul>
    )
} 
{errors[name] &&(
            <span className='ml-2 text-xs tracking-wide text-pink-200'>{label} is Required</span>
        )}
</div>

  )
}
