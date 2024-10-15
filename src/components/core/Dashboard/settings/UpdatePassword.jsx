import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/settingsApi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import IconBtn from '../../../common/IconBtn';

export default function UpdatePassword() {
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();

    const[showOldPassword,setShowOldPassword]=useState(false);
    const[showNewPassword,setShowNewPassword]=useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();

    const submitPassForm=async(data)=>{
        try{
            await changePassword(token,data);
            
        }catch(err){
            console.log("error",err)
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit(submitPassForm)}>
        <div className='my-10 flex flex-col p-8 px-12 gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800'>
            <h2 className='text-lg font-semibold text-richblack-5'>Password</h2>
            <div className='flex flex-col gap-5 lg:flex-row'>
                <div className='relative flex flex-col gap-2 lg:w-[40%]'>
                    <label htmlFor='oldPassword' className='lable-style'>
                        Current Password
                    </label>
                    <input 
                    type={showOldPassword?"text":"password"}
                    name='oldPassword'
                    placeholder='Enter Current Password'
                    className='form-style'
                    {...register("oldPassword",{required:true})}
                    />
                    <span
                    onClick={()=>setShowOldPassword((prev)=>!prev)}
                    className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                        {showOldPassword?(
                            <AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>
                        ):(
                            <AiOutlineEye fontSize={24} fill='AFB2FB'/>
                        )}
                    </span>
                    {errors.oldPassword &&(
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please Enter Current Password
                        </span>
                    )}
                </div>

                <div className='relative flex flex-col gap-2 lg:w-[40%]'>
                    <label htmlFor='newPassword' className='lable-style'>
                        New Password
                    </label>
                    <input 
                    type={showNewPassword?"text":"password"}
                    name='newPassword'
                    placeholder='Enter New Password'
                    className='form-style'
                    {...register("newPassword",{required:true})}
                    />
                    <span
                    onClick={()=>setShowNewPassword((prev)=>!prev)}
                    className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                        {showNewPassword?(
                            <AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>
                        ):(
                            <AiOutlineEye fontSize={24} fill='AFB2FB'/>
                        )}
                    </span>
                    {errors.newPassword &&(
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please Enter your new Password
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div className='flex justify-end gap-2'>
            <button onClick={()=>{navigate("/dashboard/my-profile")}}
            className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
            >
                Cancel
            </button>
            <IconBtn type={"submit"} text={"update"}/>

        </div>
    </form>
    </>
  )
}
