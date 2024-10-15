import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links"
import HighLightText from '../core/HomePage/HighLightText';
export default function Footer() {
    return (
        <div className='bg-richblack-800'>
        <div className='pt-10 w-11/12 pb-10 mx-auto'>
            <div className='' >
                <div className='flex lg:flex-row  '>
                    {/* first part */}
                    <div className=' lg:flex-row flex flex-col gap-10 w-[50%] lg:border-r lg:border-r-richblack-5'>
                        <div className='flex flex-col gap-1'>
                            <div>
                                <img className='mb-5' src={logo}  alt="logo"/>
                            </div>
                            <p className='text-richblack-5 font-bold text-xl mb-2'>Company</p>
                            <div className='text-richblack-500 flex flex-col gap-2'>

                                <p>About</p>
                                <p>Careers</p>
                                <p>Affiliates</p>
                            </div>
                            <div className=' mt-2 flex gap-3 text-xl text-richblack-400'>
                                <Link to="/">
                                    <FaFacebook />
                                </Link>
                                <Link to="/">
                                    <FaGoogle />
                                </Link>
                                <Link to="/">
                                    <FaTwitter />
                                </Link>
                                <Link to="/">
                                    <FaYoutube />
                                </Link>
                            </div>
                        </div>


                        {/* //second row */}
                        <div className='flex flex-col gap-1'>
                            <p className='text-richblack-5 font-bold text-xl mb-2'>Resources</p>
                            <div className='text-richblack-500 flex flex-col gap-2'>

                                <p>Articles</p>
                                <p>Blog</p>
                                <p>Chart Sheet</p>
                                <p>Code Chalenges</p>
                                <p>Docs</p>
                                <p>Projects</p>
                                <p>Videos</p>
                                <p>Videos</p>
                                <p>Workspaces</p>
                            </div>
                            <p className='text-richblack-5 font-bold text-xl mb-2 mt-10'>Support</p>
                            <div className='text-richblack-500 flex flex-col gap-2'>    
                                <p>Help Center</p>
                            </div>
                        </div>

                        {/* //third row */}
                        <div className='flex flex-col gap-1 lg:ml-[35px]'>
                            <p className='text-richblack-5 font-bold text-xl mb-2 '>Plans</p>
                            <div className='text-richblack-500 flex flex-col gap-2'>

                                <p>Paid memberships</p>
                                <p>For students</p>
                                <p>Business Solutions</p>
                            </div>
                            <p className='text-richblack-5 font-bold text-xl mb-2 mt-10'>Community</p>

                            <div className='text-richblack-500 flex flex-col gap-2'>
                                <p>Foruns</p>
                                <p>Chapters</p>
                                <p>Events</p>
                            </div>
                        </div>



                    </div>
                    {/* second part */}

                    <div className="w-[50%] ml-20">
                        {/* first */}
                        <div className='ml-12 lg:flex-row flex-col flex gap-10'>
                            {/* <p className="text-richblack-5 font-bold text-xl mb-2 mt-10" >{FooterLink2.title[0]}</p> */}
                            {
                                FooterLink2.map((element, index) => {
                                    return (

                                        <div className={`text-richblack-5 flex-row font-bold text-xl mb-2
                                        ${element.title === "Career building" ? "ml-[35px] hidden md:block" : ""}
                                        `} key={index}>
                                            <p className='mb-2' >{element.title}</p>
                                            {
                                                element.links.map((ele, index) => {
                                                    return (
                                                        <div className='text-richblack-500 font-normal text-sm flex flex-col' key={index}>
                                                            <p className="mb-2">{ele.title}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    );
                                })
                            }

                        </div>

                    </div>

                </div>
                {/* down part */}


                <div className=' mt-7 border-t border-richblack-50 flex flex-col lg:flex-row justify-between'>
                    <div className=' mt-7 text-richblack-500 flex flex-row gap-2 '>
                        <p>Privacy Policy</p>
                        <p className='text-richblack-50'>|</p>
                        <p>Cookie Pokicy</p>
                        <p className='text-richblack-50'>|</p>
                        <p>Terms</p>
                    </div>
                    <div className='mt-7 text-white'>
                        <p>Made with ❤️ by Lokesh Mittal © 2024<HighLightText text={" DevSphere"}></HighLightText> </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
