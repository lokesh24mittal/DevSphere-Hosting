import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { setSignupData } from '../../../slice/AuthSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function SignupFrom() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const[formData,setFormData]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const[showPassword,setShowPassword]=useState(false);
    const[showComfPassowrd,setShowComfPassword]=useState(false);
    const[accountType,setAccountType]=useState("Student");

    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();
        if(formData.password !==formData.confirmPassword){
            toast.error("Password and Comfirm Password are not matching")
            return;
        }
       console.log(accountType);
        const finalData={
            ...formData,accountType
        };
        console.log("Printing final account data");
        console.log(finalData);
        //send signup data to state
        //to be used after otp verification
        dispatch(setSignupData(finalData,navigate))
        //send otp for user for validation
        dispatch(sendOtp(formData.email,navigate));

        console.log("Printing final account data");
        console.log(finalData);
    }
  return (
    <div className='mt-5 '>

        {/* student instructyor tab */}
        <div className="flex bg-richblack-800 p-1 gap-x-1 rounded-full max-w-max">
            <button 
            className={`${accountType==="Student"?('bg-richblack-700 text-richblack-5'):("bg-transparent text-richblack-300")}
            py-2 px-5 rounded-full transition-all duration-200
            `} onClick={()=>{setAccountType("Student")}}>Student</button>
             <button 
            className={`${accountType==="Instructor"?('bg-richblack-700 text-richblack-5'):("bg-transparent text-richblack-300")}
            py-2 px-5 rounded-full transition-all duration-200
            `} onClick={()=>{setAccountType("Instructor")}}>Instructor</button>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
            <div className='flex flex-col lg:flex-row justify-between'>
                <label>
                <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup>*</sup></p>
                <input type='text'
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler}
                    placeholder='Enter first name'
                    className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />
                </label>

                <label>
                <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup>*</sup></p>
                <input type='text'
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={changeHandler}
                    placeholder='Enter last name'
                    className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />
                </label>
            </div>

            <label className="w-full">
                <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup>*</sup></p>
                <input type='email'
                    required
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter email Address'
                    className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />
            </label>
            <div className='flex justify-between flex-col lg:flex-row'>
            <label className="relative">
                <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup>*</sup></p>
                <input type={`${showPassword ? ("text") : ("password")}`}
                    required
                    name="password"
                    placeholder='Enter password'
                    onChange={changeHandler}
                    value={formData.password}
                    className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />
                <span
                    className="absolute right-3 top-[38px] cursor-pointer"
                    onClick={(() => setShowPassword((prev) => !prev))}>
                    {
                        showPassword ? (<AiOutlineEyeInvisible fontSize={24} color='#agb2bf' />) : (<AiOutlineEye fontSize={24} color='#agb2bf' />)
                    }
                </span>
            </label>

            <label className="relative">
                <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem]'>Comfirm Password<sup>*</sup></p>
                <input type={`${showComfPassowrd ? ("text") : ("password")}`}
                    required
                    name="confirmPassword"
                    placeholder='Enter comfirm pass...'
                    onChange={changeHandler}
                    value={formData.confirmPassword}
                    className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />
                <span
                    className="absolute right-3 top-[38px] cursor-pointer"
                    onClick={(() => setShowComfPassword((prev) => !prev))}>
                    {
                        showComfPassowrd ? (<AiOutlineEyeInvisible fontSize={24} color='#agb2bf' />) : (<AiOutlineEye fontSize={24} color='#agb2bf' />)
                    }
                </span>
            </label>
            </div>

            <button type='submit' className='bg-yellow-50 rounded-[8px] font-medium text-richblack-800 px-[12px] py-[8px] mt-2'> 
            Create Account
            </button>
        </form>
    </div>
  )
}
