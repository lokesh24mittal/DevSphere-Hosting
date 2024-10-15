import React from 'react'
import HighLightText from '../HomePage/HighLightText'
import CTAButton from '../HomePage/CTAButton'

export default function LearningGrid() {
    const LearningGridArrray=[
        {
            order:-1,
            heading:"World-Class Learning for",
            highlightText:" Anyone, Anywhere",
            description:"DevSphere partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            btnText:"Learn More",
            btnLink:"/signup"
        },
        {
            order:1,
            heading:"Curriculum Based on Industry Needs",
            description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",

        },
        {
            order:2,
            heading:"Our Learning Methods",
            description:"DevSphere partners with more than 275+ leading universities and companies to bring",
        },
        {
            order:3,
            heading:"Certification",
            description:"DevSphere partners with more than 275+ leading universities and companies to bring",
        },
        {
            order:4,
            heading:`Rating "Auto-grading"`,
            description:"DevSphere partners with more than 275+ leading universities and companies to bring",
        },
        {
            order:5,
            heading:`Ready to Work"`,
            description:"DevSphere partners with more than 275+ leading universities and companies to bring",
        }
    ]
  return (
    <div className='w-11/12 mt-[100px] grid mx-auto grid-cols-1  lg:grid-cols-4  mb-10 p-5'>
        {
            LearningGridArrray.map((card,index)=>{
                return(
                    <div key={index} className={`
                        ${index===0 && "lg:col-span-2 lg:h-[280px] p-5"}
                    ${card.order %2===1 ?"bg-richblack-700":"bg-richblack-800 "}
                    ${card.order===3 && "lg:col-start-2 "}
                    ${card.order<0 && "bg-transparent text-white"}
                      p-5
                    `}>
                       {
                        card.order<0?
                        (
                            <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                <div className='text-4xl font-semibold'>
                                        {card.heading}
                                        <HighLightText text={card.highlightText}/>
                                    </div>
                                    <p className='font-medium text-richblack-400'>{card.description}</p>
                                    <div className='w-fit mt-4'>
                                        <CTAButton active={true} linkto={card.btnLink}>{card.btnText}</CTAButton>
                                        </div>
                            </div>
                        ):
                        (
                            <div className='flex flex-col gap-8 p-7'>
                                <h1 className='text-richblack-5 text-lg'>
                                    {card.heading}
                                </h1>
                                <p className='text-richblack-300 font-medium'>{card.description}</p>
                                </div>
                        )
                       } 
                    </div>
                )
            })
        }
    </div>
  )
}
