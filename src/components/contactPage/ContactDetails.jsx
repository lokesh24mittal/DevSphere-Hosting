import React from 'react'
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

export default function ContactDetails() {
    const contactDetails=[
        {
        icon:"HiChatBubbleLeftRight",
        heading:"Chat on Us",
        description:"Our friendly team is here to help",
        details:"lokesh24mittal@gmail.com"
        },
        {
            icon:"BiWorld",
            heading:"Visit Us",
            description:"Come and say hello at our office HQ",
            details:"Tech Mahindra Electronic City phase 2 Bangalore-560016"
        },
        {
            icon:"IoCall",
            heading:"Call Us",
            description:"Mon-Fri from 9am to 6 pm",
            details:"+919518016639"
        }
    ]
  return (
    <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6'>
{contactDetails.map((ele,i)=>{
    let Icon =Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
    return(
        <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200' key={i}>
            <div className='flex flex-row items-center gap-3'>
                <Icon size={25}/>
                <h1 className='text-lg font-semibold text-richblack-5'>
                    {ele?.heading}
                </h1>
            </div>
            <p className='font-medium'>{ele?.description}</p>
            <p className='font-semibold'>{ele?.details}</p>
        </div>
    )
})}

    </div>
  )
}
