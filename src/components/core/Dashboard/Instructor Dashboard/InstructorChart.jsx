import React, { useState } from 'react'
import { Chart,registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';


Chart.register(...registerables);

export default function InstructorChart({courses,instructorData}) {
    console.log(instructorData)
    const[currentChart,setCurrnetChart]=useState("students");

    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0; i<numColors;i++){
                const color=`rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)},
                ${Math.floor(Math.random()*256)})`
                colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying studnet info

    const chartDataForStudents={
        labels:instructorData.map((course)=>course.courseName),
        datasets:[
            {
                data:instructorData.map((course)=>course.totalStudentEnrolled),
                backgroundColor:getRandomColors(courses.length)
            }
        ]
    }

    // create data for chart displaying income info
    const chartDataForIncome={
        labels:instructorData.map((course)=>course.courseName),
        datasets:[
            {
                data:instructorData.map((course)=>course.totalAmountGenerated),
                backgroundColor:getRandomColors(courses.length)
            }
        ]
    }

    // create options

    const options={
        maintainAspectRatio:false,
    };

  return (
    <div className=' flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6'>
        <p className='text-lg font-bold text-richblack-5'>Visualize</p>
        <div className='space-x-4 font-semibold '>
            <button onClick={()=>setCurrnetChart("students")}
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currentChart==="students"?"bg-richblack-700 text-yellow-50":"text-yellow-400"
                }`}>
                    Student</button>
            <button onClick={()=>setCurrnetChart("income")}
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currentChart==="income"?"bg-richblack-700 text-yellow-50":"text-yellow-400"
                }`}>
                    Income</button>
        </div>
        <div className='relative mx-auto aspect-square h-[300px] w-full'>
            <Pie 
            data={currentChart==="students"?chartDataForStudents:chartDataForIncome}
            options={options}
            />
        </div>
    </div>
  )
}
