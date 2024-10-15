import React from "react"
import HighLightText from "./HighLightText";
import Know_your_poogress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";

const LearningLanguageSection = () => {
    return (
            <div className="">
                <div className="text-4xl font-semibold text-center my-10">
                    Your Swiss knife for
                    <HighLightText text={" Learning any Language"} />
                
                <div className="text-center text-richblack-700 mx-auto text-base font-medium mt-3 lg:w-[75%]">
                    Using spin making learning multiple languages easy with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
                    <img src={Know_your_poogress}
                        className="object-contain lg:-mr-32"
                    />
                    <img src={compare_with_others}
                        className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
                    />
                    <img src={plan_your_lesson}
                        className="object-contain lg:-ml-36 lg:-mt-5 -mt-16"
                    />
                </div>
                </div>
                <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
                    <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                </div>
            </div>

    )
}
export default LearningLanguageSection