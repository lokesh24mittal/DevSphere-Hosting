import React from "react";
import Instructor from "../../../assets/Images/Instructor.png"
import HighLightText from "./HighLightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
function InstructorSection(){
    return(
        <div>
            <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-[50%]">
                <img src={Instructor} alt="" className="shadow-white shadow-[-20px_-20px_0_0]"/>
            </div>
            <div className="lg:w-[50%] flex flex-col gap-10">
                <div className="text-4xl font-semibold lg:w-[50%]">
                    Become an 
                    <HighLightText text={" Instructor"}/>
                </div>
                <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                    Instructors from arould the world teach millions of student on DevSphere. We provide the tools and skills to teach you what you love.
                </p>
                <div className="w-fit">

                <CTAButton active={true} linkto={"/signup"}>
                <div className="flex  gap-3 items-center">
                    Start Learning Today
                    <FaArrowRight />
                </div>
                </CTAButton>
                </div>
            </div>
            </div>
        </div>
    )
}
export default InstructorSection;