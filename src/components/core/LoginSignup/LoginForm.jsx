import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import CTAButton from '../HomePage/CTAButton';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';

export default function LoginForm() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    function changeHandler(event) {
        setFormData((prevData)=> ({
            ...prevData,
            [event.target.name]: event.target.value
        })
    )
    }
    const{email,password}=formData;


    function submitHandler(event) {
        event.preventDefault();
        dispatch(login(email,password,navigate))
        
        console.log(formData)
    }
    return (
        <form
            onSubmit={submitHandler}
            className='flex flex-col w-full gap-y-4 mt-6'>
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

            <label className="w-full relative">
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
                <Link to="/login/forgot-password">
                    <p className='text-xs mt-1 text-richblue-100 max-w-max ml-auto'>Forgot Password?</p></Link>
            </label>


           <button type='submit'  className='bg-yellow-50 rounded-[8px] font-medium text-richblack-800 px-[12px] py-[8px]'> 
            Sign In
            </button>
            

        </form>
    )
}
