import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/StudentsFeaturesApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { apiConnector } from '../services/ApiConnector';
import { fetchCourseDetails } from '../services/operations/CourseDetailsApi';
import getAvgRating from '../utils/avgRating';
import Error from "./Error"
import RatingStars from '../components/common/RatingStars';
import ComfirmationModal from '../components/common/ComfirmationModal';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import Footer from '../components/common/Footer';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import Markdown from "react-markdown"
import { formatDate } from '../services/formatDate';


export default function CourseDetails() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {

        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
                console.log("Printing courseData->", result);

                console.log(courseData);

            }
            catch (err) {
                console.log("Could not fetch course Details", err);
            }
        }
        getCourseFullDetails();
    }, [courseId]);

    const [avgReviwCount, setAvgReviewCount] = useState(0);

    

    useEffect(() => {
        console.log(courseData);
        // console.log((courseData?.data?.courseDetails?.ratingAndReviews).length)
        const count = getAvgRating(courseData?.data?.courseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
    }, [courseData]);

    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e != id)
        )
    }


    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    if (loading || !courseData) {
        return (
            <div>
                Loadinggg...
            </div>
        )
    }

    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    if (paymentLoading) {
        return (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentEnrolled,
        createdAt,
    } = courseData.data?.courseDetails;


    return (
        <>
            <div className='relative w-full bg-richblack-800'>
                <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative'>
                    <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                        <div className='relative block max-h-[30rem] lg:hidden'>
                            <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset'></div>
                            <img src={thumbnail}
                                alt='course thumbmail'
                                className='aspect-auto w-full'
                            />
                        </div>
                        <div className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5 '>
                            <div>
                                <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{courseName}</p>
                            </div>
                            <p className='text-richblack-200'>{courseDescription}</p>
                            <div className='text-md flex flex-wrap items-center gap-2'>
                                <span className='text-yellow-25'>{avgReviwCount}</span>
                                <RatingStars Review_Count={avgReviwCount} Star_Size={24} />
                                <span> {ratingAndReviews.length} reviews</span>
                                <span> {studentEnrolled.length} students enrolled</span>
                            </div>
                            <div>
                                <p>Created By {instructor.firstName} {`${instructor.lastName}`}</p>
                            </div>
                            <div className='flex flex-wrap gap-5 text-lg'>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <BiInfoCircle />
                                    created at {formatDate(createdAt)}
                                </p>
                                <p className='flex items-center gap-2'>
                                    {" "}
                                    <HiOutlineGlobeAlt /> English
                                </p>
                            </div>
                        </div>

                        <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden'>
                            <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                                Rs.{price}
                            </p>
                            <button className='yellowButton' onClick={handleBuyCourse}>Buy Now</button>
                            {/* <button className='blackButton'>Add to Cart</button> */}
                        </div>
                    </div>

                    {/*course Card  */}
                    <div className='right-[5rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block'>
                        <CourseDetailsCard
                            course={courseData.data.courseDetails}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>

            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                    {/* what you will learn section */}
                    <div className='my-8 border border-richblack-600 p-8'>
                <p className='text-3xl font-semibold'>What you will learn</p>
                <div className='mt-5'>
                   <Markdown>{whatYouWillLearn}</Markdown> 

                </div>
                    </div>

        {/* course content section */}
            <div className='max-w-[830px]'>
                <div className='flex flex-col gap-3'>
                    <p className='text-[28px] font-semibold'>Course Content</p>
                    <div className='flex flex-wrap justify-between gap-2'>
                    <div className='flex-gap-w'>
                        <span>{courseContent.length} section(s)</span>
                        <span>
                            {totalNoOfLectures} lectures
                        </span>
                        <span>
                            {courseData.data.totalDuration} total length
                        </span>
                    </div>
                    <div>
                        <button
                        className='text-yellow-25'
                        onClick={() => setIsActive([])}>
                            Collapse all Section
                        </button>
                    </div>
                    </div>
                </div>
                
                {/* course details acordin */}
                <div className='py-4'>
                    {courseContent.map((course,index)=>(
                        <CourseAccordionBar
                        course={course}
                        key={index}
                        isActive={isActive}
                        handleActive={handleActive}
                        />
                    ))}
                </div>

                {/* author Details */}
                <div className='mb-12 py-4'>
                    <p className='text-[28px] font-semibold'>Author</p>
                    <div className='flex items-center gap-4 py-4'>
                        <img src={instructor.image} alt='author'
                        className='h-14 w-14 rounded-full object-cover'/>
                        <p className='text-lg'>
                            {instructor.firstName} {instructor.lastName}
                        </p>
                        </div>
                        <p className='"text-richblack-50'>
                            {instructor?.additionalDetails?.about}
                        </p>
                    
                </div>
            </div>
            </div>
            </div>
            <Footer/>

            {confirmationModal && <ComfirmationModal modalData={confirmationModal} />}



        </>

    )
}
