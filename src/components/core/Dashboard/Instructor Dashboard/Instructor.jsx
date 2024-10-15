import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorData } from '../../../../services/operations/profileApi';
import { fetchInstructorCourses } from '../../../../services/operations/CourseDetailsApi';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

export default function Instructor() {

    const [loading, setLoading] = useState();
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)

    useEffect(() => {
        const getCourseDetailsWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if (instructorApiData.length) {
                setInstructorData(instructorApiData);
            }
            if (result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDetailsWithStats();
        // console.log(courses);
        // console.log(instructorData);
    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0)

    return (
        <div>
            <div className='space-y-2'>
                <h1 className='text-2xl font-bold text-richblack-5'>
                    Hi {user?.firstName}</h1>
                <p className='font-medium text-richblack-200'>
                    Let's Start something new</p>
            </div>

            {loading ? (<div className="spinner"></div>)
                :
                courses.length > 0
                    ? (<div>
                        <div className='my-4 md:flex  md:h-[450px] lg:h-[450px] md:space-x-4 space-y-4 gap-3'>
                            {totalAmount > 0 || totalStudents > 0 ? (
                                <InstructorChart courses={courses} instructorData={instructorData} />
                            ) : (
                                <div className='flex-1 rounded-md bg-richblack-800 p-6'>
                                    <p className='text-lg font-bold text-richblack-5'>Visualize</p>
                                    <p className='mt-4 text-xl font-medium text-richblack-50'>
                                        No Enough Data to Visualize
                                    </p>
                                </div>
                            )}
                            <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
                                <p className='textt-lg font-bold text-richblack-5'>Statistics</p>
                                <div className='mt-4 space-y-4'>
                                    <div >
                                        <p className='text-lg text-richblack-200'>Total Courses</p>
                                        <p className='text-3xl font-semibold text-richblack-50'>{courses.length}</p>
                                    </div>
                                    <div>
                                        <p className='text-lg text-richblack-200'>Total Students</p>
                                        <p className='text-3xl font-semibold text-richblack-50'>{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p className='text-lg text-richblack-200'>Total Incone</p>
                                        <p className='text-3xl font-semibold text-richblack-50'>{totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* render 3 courses */}
                        <div className='rounded-md bg-richblack-800 p-6'>
                            <div className='flex items-center justify-between'>
                                <p className='tex-lg font-bold text-richblack-5'>Your Courses</p>
                                <Link to="/dashboard/my-courses">
                                    <p className='text-xs font-semibold text-yellow-50'>View All</p>
                                </Link>
                            </div>
                            <div className='my-4 flex items-start space-x-6'>
                                {courses.slice(0, 2).map((course) => (
                                    <div key={course._id} className='w-1/2'>
                                        <div>
                                            <img src={course.thumbnail}
                                                alt={course.courseName}
                                                className='h-[201px] w-full rounded-md object-cover' />
                                        </div>
                                        <div className='mt-3 w-full'>
                                            <p className='text-sm font-medium text-richblack-50'>{course.courseName}</p>
                                        </div>
                                        <div className='mt-1 flex items-center space-x-2'>
                                            <p className='text-xs font-medium text-richblack-300'>
                                                {course.studentEnrolled.length} students</p>
                                            <p className='text-xs font-medium text-richblack-300'>|</p>
                                            <p className='text-xs font-medium text-richblack-300'>Rs.{course.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>) :
                    (
                        <div className='mt-20 rounded-md bg-richblack-800 p-6 py-20'>
                            <p className='text-center text-2xl font-bold text-richblack-5'>
                                You dont have not created any course yet.</p>
                            <Link to="/dashboard/addCourse">
                                <p className='m-1 text-center text-lg font-semibold text-yellow-50'>
                                    Add Course
                                </p></Link>
                        </div>
                    )
            }
        </div>
    )
}
