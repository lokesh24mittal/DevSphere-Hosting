import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

export default function Home() {
    return (
        <div>
            {/* section 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent gap-8 items-center text-white justify-between">

                <Link to={"/signup"}>
                    <div className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                                    hover:scale-95 w-fit mt-16 p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200
                                     hover-drop-shadow-none">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200
                        group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                    {/* ?]heading */}
                <div className="text-center text-4xl font-semibold">
                    Enpower your Future with
                    <HighLightText text={" coding skills"} />
                </div>
                {/* subHedaing */}
                <div className="-mt-3 w-[90%] text-center text-lg font-bold text-righblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources. Including hands on projects, Quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
                </div>

                {/* <div className="h-[515px] w-[1035px] bg-blue-200 ">
                </div> */}

                <div className=" mx-3 my-7  shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
                    <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
                        <source src={Banner} type="video/mp4" height={"515px"} width={"1035px"} />
                    </video>
                </div>


                <div>
                    {/* //code section 1 */}
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your
                                <HighLightText text={" coding Potentials "} />
                                with our online courses.
                            </div>
                        }
                        subHeading={
                            "Our Courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn more",
                                linkto: "/login",
                                active: false
                            }
                        }
                        codeBlock={
                            `<!DOCTYPE html>\n <html>\n <head>\n <title><linkrel:"stylesheet"href="style.css">\n</title>\n</head>\n<body>\n<h1><a href="/">Header</a>\n </h1>\n<nav><a href="one/">One</a><a href="two/>two</a>\n<a href="three/">Three</a>\n</nav>\n<body>\n</html>`
                        }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />
                </div>

                <div>
                    {/* //code section 2 */}
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold w-[100%] lg:w-[50%]">
                                Start
                                <HighLightText text={" coding in Seconds"} />
                            </div>
                        }
                        subHeading={
                            "Go ahead give it a try, Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn more",
                                linkto: "/login",
                                active: false
                            }
                        }
                        codeBlock={
                            `import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\n import {FaArrowRight} from "react-icons/fa";\n import { Link } from "react-router-dom";\n import Footer from "../components/common/Footer";\n const Home=()=>{\n retrun (\n <div>\n Home \n <div>\n )\n }\n export default Home;`
                        }
                        codeColor={"text-white"}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                </div>
                        <ExploreMore/>
            </div>


            {/* section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[320px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col  items-center justify-between gap-5 mx-auto">
                        <div className="lg:h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white lg:mt-8">
                            <CTAButton active={true} linkto={"/signuo"}>
                                <div className="flex items-center gap-3">Explore full Catalog <FaArrowRight /></div></CTAButton>

                            <CTAButton active={false} linkto={"/login"}>
                                <div>Learn More</div></CTAButton>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col  items-center justify-between gap-8">
                    <div className="mb-[10] mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                        <div className="text-4xl font-semibold lg:w-[45%]">
                            Get a skills you need for a{" "}
                            <HighLightText text={" job that is in demand"} />
                        </div>

                        <div className="flex flex-col gap-10 lg:w-[40%] items-start">
                            <div>The modern DevSphere is the dictates its own terms. Today to be a competitive specialist requires more than professional skills</div>
                            <CTAButton active={true} linkto={"/signup"}>Lean More</CTAButton>
                        </div>
                    </div>

                    <div>
                        <TimeLineSection />
                    </div>
                    {/* section 3 */}
                    <div>
                        <LearningLanguageSection />
                    </div>
                </div>

            </div>
            {/* section3 */}
            <div className="relative mx-auto my-20  flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                    <InstructorSection />
                    <div className="md:block hidden">
                    <h1 className="text-center text-4xl font-semibold mt-8 ">Review from other Learners</h1>
                    {/* Review sliders here */}
                    
                    <ReviewSlider/>
                    </div>
            </div>

            {/* <div className="bg-richblack-800 mt-10"> */}
            <Footer/>
            {/* </div> */}

        </div>
    )
}