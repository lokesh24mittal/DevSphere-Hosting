import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from "../services/operations/authAPI"
import { FaArrowLeft } from "react-icons/fa6";

export default function ForgotPassword() {
    const[emailSent,setEmailSent]=useState(false);
    const[email,setEmail]=useState("");
    const{loading}=useSelector((state)=>state.auth);
const dispach=useDispatch();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispach(getPasswordResetToken(email,setEmailSent));
    }
  return (
    <div className='lg:w-4/12 w-10/12 mx-auto my-auto'>
        {
            loading?(<div className='text-white text-lg flex items-center justify-center'>Loading...</div>):(
                <div className='text-white flex flex-col gap-3 justify-center'>
                    <h1 className='font-bold text-[1.785rem]'>
                        {
                            !emailSent?"Reset your Password":"Check Your Email"
                        }
                    </h1>

                    <p className='text-richblack-100  text-[1.25rem] leading-[1.625rem] '>
                        {
                            !emailSent?
                            "Have no fear. We'll email you instructions to reset your password if you dont have access to your email we can try account recovery":
                            `We have sent the reset email to ${email}`
                        }
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent &&(
                                <label>
                                    <p className=' mt-1 mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address:<sup className='text-yellow-5'>*</sup></p>
                                    <input
                                        required
                                        type="email"
                                        name='email'
                                        value={email}
                                        onChange={((e)=>setEmail(e.target.value))}
                                        placeholder='Enter your Email Address'
                                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                        />
                                </label>
                            )
                        }
                        <br/>
                        <button type='submit' className='bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 mt-6  p-2 rounded-[8px] w-full ' >
                                {
                                    !emailSent?"Reset Password":"Resend Email"
                                }
                            </button>
                    </form>
                   <div> 
               
                                <Link to="/login" className='flex gap-2 items-center'>
                                <FaArrowLeft/>
                                <p>Back to Login</p>
                                </Link>
                            </div>              
                       
                </div>
            )
        }
    </div>
  )
}
