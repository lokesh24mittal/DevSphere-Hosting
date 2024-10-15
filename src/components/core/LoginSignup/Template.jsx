import React from 'react'
import Frame from "../../../assets/Images/frame.png";
import HighLightText from '../HomePage/HighLightText';
import SignupFrom from './SignupFrom';
import LoginForm from './LoginForm';
export default function Template({ title, desc1, desc2, image, formType }) {
  return (
    <div className='w-11/12 flex lg:flex-row flex-col-reverse justify-between max-w-[1160px] mt-10 py-12 mx-auto gap-x-12 gap-y-8'>
      <div className='lg:w-5/12'>
        <h1 className='text-white font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
        <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
          <span className='text-richblack-200'>{desc1}</span>
          <br />
          <span className='font-edu-sa font-bold italic'><HighLightText text={desc2} /></span></p>

        {
          formType === "signup" ? (<SignupFrom />) : (<LoginForm />)
        }
      </div>


      {/* right */}
      <div className="sm:mx-auto relative w-11/12 max-w-[450px]">
        <img
          src={Frame}
          alt="frame"
          width={558}
          height={554}
          loading='lazy'
        />
        <img
          src={image}
          alt="tamplate login signup"
          width={558}
          height={554}
          loading='lazy'
          className='absolute -top-4 right-4'
        />
      </div>
    </div>
  )
}
