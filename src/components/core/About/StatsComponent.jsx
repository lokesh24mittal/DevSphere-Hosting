import React from 'react'

export default function StatsComponent() {

    const stats=[
        {
            count:"5k",
            label:"Active students"
        },
        {
            count:"10+",
            label:"Mentors"
        },
        {
            count:"200+",
            label:"Courses"
        },
        {
            count:"50+",
            label:"Awards"
        }
    ]
  return (
   <section>
    <div className='bg-richblack-700 mx-auto'>
        <div className='flex flex-xol gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 text-center mx-auto'>

       
        {
            stats.map((data,index)=>(
                <div className='flex flex-col py-10' key={index}>
                    <h1 className='text-white font-bold text-3xl'>{data.count}</h1>
                    <h2 className='text-richblack-300 text-md'>{data.label}</h2>
                    </div>
            ))
        }
    </div>
    </div>
    </div>
    </section>
  )
}
