import React from "react";
import CTAButton from "./CTAButton";
import HighLightText from "./HighLightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
export default function CodeBlocks({position, heading,subHeading, ctabtn1, ctabtn2, codeBlock, backgroundGradient,codeColor}){
    return(
        <div className={`flex ${position} my-20 justify-between lg:gap-10 gap-10 flex-col `}>
            {/* section1 */}
            <div className="lg:w-[50%] w-[100%] flex flex-col gap-8">
            {heading}
            <div className="text-richblack-300 text-base w-[85%] -mt-3 font-bold">
                {subHeading}
            </div>

            <div className="flex gap-7 mt-7">
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className="flex gap-2 items-center">
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                </CTAButton>

            </div>

            </div>

            {/* section2 */}
            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:[leading-6] relative w-[100%]  lg:w-[470px]">
                {/* hw bg gradient */}
                {backgroundGradient}

                <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                    <p>13</p>
                    <p>14</p>
                </div>
                <div className={`w-[90%]  flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 `}>
                <TypeAnimation
                sequence={[codeBlock,1000,""]}
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
                omitDeletionAnimation={true}
                />
                </div>
            </div>

        </div>
    )
}