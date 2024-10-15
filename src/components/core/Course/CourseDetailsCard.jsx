import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import { addToCart } from '../../../slice/CartSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import {BsFillCaretRightFill} from "react-icons/bs"
import { FaShareSquare } from 'react-icons/fa';
import { addToCart } from '../../../slice/CartSlice';
// import copy from 'copy-to-clipboard';



export default function CourseDetailsCard({course,setConfirmationModal,handleBuyCourse}) {

    const {user}=useSelector((state)=>state.profile);
    const{token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const{
        thumbnail:ThumbnailImage,
        price:currentPrice
    }=course

    const handleAddToCart=()=>{
        if(user&&user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an instructor, you cant buy course");
            return;
        }

        if(token){
            dispatch(addToCart(course));
            console.log("Dispatching to cart");
            return;
        }

        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to add to cart",
            btn1Text: "Login",
            btn2Text: "cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    const handleShare=()=>{
        // copy(window.location.href);
        toast.success("Link copied to clipboard");
    }
  return (
    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
        <img
        src={ThumbnailImage}
        alt='Thumbnail'
        className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'
        />
        <div className='px-4'>
        <div className='space-x-3 pb-4 text-3xl font-semibold'>
            Rs.{currentPrice}
        </div>
        <div className='flex flex-col gap-y-6'>
            <button className='yellowButton'
            onClick={
                user && course?.studentEnrolled.includes(user?._id)
                ?()=>navigate("/dashboard/enrolled-courses")
                :handleBuyCourse
            }
            >
            {user&& course?.studentEnrolled.includes(user?._id)?"Go to course":"Buy Now"}
            </button>

            {
                (
                    !user ||!course?.studentEnrolled.includes(user?._id)) && (
                    <button onClick={handleAddToCart}
                    className='blackButton'>
                    Add to Cart 
                    </button>
                    
                )
            }
        </div>

        <div>
            <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                30-day Money-Back Gurantee
            </p>
            <p className='my-2 text-xl font-semibold'>
                This course includes:
            </p>
            <div className='flex flex-col gap-y-3 text-sm text-caribbeangreen-100'>
                {
                    course?.instructions?.map((item,index)=>(
                        <p key={index} className='flex gap-2'>
                            <BsFillCaretRightFill/>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>

        <div className='text-center'>
            <button className='mx-auto flex items-center gap-2 p-6 text-yellow-100'
            onClick={handleShare}>
                <FaShareSquare size={15}/>Share
            </button>
        </div>
    </div>
    </div>
  )
}
