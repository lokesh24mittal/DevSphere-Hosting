import React, { useEffect,useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/authAPI';
import { FaArrowLeft } from 'react-icons/fa';
import { IoTimerOutline } from 'react-icons/io5';

export default function VerifyEmail() {
    const {loading,signupData} =useSelector((state)=>state.auth);
    const[otp,setOtp]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])

    function handleOnSubmit(e){
        e.preventDefault();
        const{
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }=signupData
        console.log(accountType,firstName,lastName,email,password,confirmPassword,otp)
        dispatch(signup(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }
  return (
    <div className='text-richblack-900 flex flex-col my-auto mx-auto items-center justify-center'>
        {
            loading?(
               " Loading..."
            ):
            (
                <div >
                    <h1 className='font-bold text-2xl text-richblack-5 mb-3'>Verify Email</h1>
                    <p className='text-richblack-400 mb-3'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit}>

                       <OTPInput
                       value={otp}
                       onChange={setOtp}
                       numInputs={6}
                       renderInput={(props)=><input {...props} className='bg-richblack-600 h-20' placeholder='-'/>
                    }
                       />

                       <button className='bg-yellow-50 rounded-[8px] w-full font-medium text-richblack-800 px-[12px] py-[8px] mt-2'
                        type='submit'>
                        Verify Email
                       </button>
                    </form>
                    <div className='flex justify-between mt-3'>
                    <div className='text-richblack-5'>
                    <Link to ="/login">
                    <div className='flex gap-2 items-center'>
                            <FaArrowLeft />
                            <p>Back to Login</p>
                            </div>
                            </Link>
                    </div>
                    <div className='text-richblue-300 flex gap-1 items-center'>
                    <IoTimerOutline />
                    <button onClick={()=>dispatch(sendOtp(signupData.email))}>
                        Resend it
                    </button>
                    </div>
                    </div>

                </div>
            )
        }
    </div>
  )
}
