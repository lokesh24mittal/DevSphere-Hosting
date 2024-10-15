import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import Logo from "../../assets/Logo/DEVSPHERE.png";
import LogoHome from "../../assets/Logo/DEVSPHEREHOME.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { apiConnector } from "../../services/ApiConnector";
import { categories } from "../../services/Api";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { TbAirConditioning } from "react-icons/tb";
import { MdClose } from "react-icons/md";

import MobileNavModel from "./MobileNavModel";


export default function NavBar() {
    // const subLinks=[
    //     {
    //         title:"python",
    //         link:"/category/python"
    //     },
    //     {
    //         title:"web dev",
    //         link:"/category/web-devlopment"
    //     }
    // ]

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false)

    const location = useLocation();

    //api call
    const [subLinks, setSubLinks] = useState([]);

    const [isNavActive,setisNavActive]=useState(true);
    const [mobileNavModal,setMobileNavModal]=useState(false)

    const fetchSubLinks = async () => {
        try {
            setLoading(true);
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing sublinks result", result);
            setLoading(false);
            setSubLinks(result.data.data);
            console.log("SubLinks", subLinks)
            setLoading(false);
        }
        catch (err) {
            console.log("Could not fetch the category list err:-")
            console.log(err);
        }
    }

    // //use Effect
    useEffect(() => {
        fetchSubLinks();
    }, [])

    function NavbarHandler(){
        setisNavActive(!isNavActive)
         setMobileNavModal(!mobileNavModal)
    }

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    return (
        <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 
            ${location.pathname !== "/" ? "bg-richblack-800" : ""
            } transition-all duration-200`} >
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                {/* Images */}
                <Link to="/">
                    <img src={location.pathname === "/"?LogoHome:Logo}
                     width={160} height={42} loading="lazy"alt="logo"  />
                </Link>

                {/* nav links */}

                <nav className="">
                    <ul className="flex md:gap-x-6 gap-x-1 text-richblack-25">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className={`flex items-center gap-1 cursor-pointer group relative ${matchRoute("/catalog/:catalogName") ?
                                                    "text-yellow-25" : "text-richblack-25"
                                                }`}>
                                                <p>{link.title}</p>
                                                <RiArrowDropDownLine />
                                                <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%]
                                            translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0
                                            transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65rem]
                                            group-hover:opacity-100 lg:w-[300px]">
                                                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%]
                                                rotate-45 select-none rounded bg-richblack-5
                                                ">
                                                    </div>
                                                    {loading ? (
                                                        <p className="text-center">Loading...</p>
                                                    ) : (
                                                        subLinks.length ? (
                                                            subLinks.filter((subLink)=>subLink?.courses?.length>0)
                                                            ?.map((sublink, index) => {
                                                                return (
                                                                    // <div key={index} className="text-md  text-richblack-900 flex justify-center items-center hover:bg-richblack-100">
                                                                        // {console.log(sublink, "sublink data")}
                                                                        <Link to={`catalog/${sublink.name
                                                                            .split(" ")
                                                                            .join("-")
                                                                            .toLowerCase()
                                                                            }`} key={index}
                                                                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                                                            <p className="">{sublink.name}</p>
                                                                        </Link>
                                                                    // </div>
                                                                )
                                                            })
                                                        ) : (<div className="text-center">No course Found</div>)
                                                    )}

                                                </div>
                                            </div>) :
                                            (<Link to={link?.path} className="hidden md:block">
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}</p>
                                            </Link>

                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* login signup dashboard */}
                <div className="flex gap-x-4 items-center">
                    {
                        user && user.accountTType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative mr-5 md:mr-0">
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -botton-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden
                                                            rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100  mr-3 md:flex hidden">
                                    Login</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-[8px] md:flex hidden">
                                    Signup</button>
                            </Link>
                        )

                    }

                    {
                        token !== null &&
                        (
                            <div className="md:flex hidden">
                            <ProfileDropDown />
                            </div>
                        )}

                </div>
                    {/* <button className="mr-4 md:hidden" onClick={NavbarHandler}>
                {
                        isNavActive?(<AiOutlineMenu fontSize={25} fill="#AFB2FB" />):(<MdClose fontSize={25} fill="#AFB2FB"/>)
                        
                }
                    
                </button> */}

                <div  className="mr-4 md:hidden">
                <MobileNavModel/>
                </div>
            {/* {mobileNavModal &&<MobileNavModel/>} */}
            </div>
        </div>
    )
}