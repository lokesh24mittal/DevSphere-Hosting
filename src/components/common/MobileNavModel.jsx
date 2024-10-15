import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import useOnClickOutside from "../../hooks/useOnClickOutside"
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { VscHome } from 'react-icons/vsc';
import { logout } from '../../services/operations/authAPI';
import { TbLayoutNavbar } from "react-icons/tb";
export default function MobileNavModel() {
//     const { token } = useSelector((state) => state.auth);
//     useEffect(()=>{
//     console.log("hi from Mobile Nav Model")
// },[])


const [open, setOpen] = useState(false)
const { user } = useSelector((state) => state.profile)
const dispatch = useDispatch();
const navigate = useNavigate();
const ref = useRef(null);
const [isNavActive,setisNavActive]=useState(true);
useOnClickOutside(ref, () => setOpen(false));
function handleNavBar(){
    setOpen(true);
    // setisNavActive(!isNavActive);
}
  return (
            <button className="relative" onClick={handleNavBar} >
                <div className="flex items-center gap-x-1">
                    {
                        !user &&
                        <TbLayoutNavbar className="text-2xl text-richblack-100"/>
                    }
                    {user&&
                    <img src={user?.image} alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[30px] rounded-full object-cover"
                  />
                    }
                <AiOutlineCaretDown  className="text-xl text-richblack-100" />:
                    
                </div>
                

                {
        open && (
          <div onClick={(e) => e.stopPropagation()}
            className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
            ref={ref}
          >
            <div className=' flex'>
            <div >
             <Link to="/" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                
                Home
              </div>
            </Link>
            <Link to="/about" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                
                About
              </div>
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                
                Contact
              </div>
            </Link>

            {
              user  && user?.accountType!=="Student" &&(
                <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                  
                Profile
                </div>
                </Link>
              )
            }

            {!user &&
            (
            <Link to="/login" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              
              Login
            </div>
          </Link>
            )}{!user &&
          (<Link to="/signup" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              
              Signup
            </div>
          </Link>
          ) 
            }
            </div>
<div>
{user &&  user?.accountType!=="Student" &&
            (
            <Link to="/dashboard/instructor" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              
              Dashboard
            </div>
          </Link>
            )}

{user &&  user?.accountType!=="Student" &&
            (
            <Link to="/dashboard/my-courses" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              
              MyCourses
            </div>
          </Link>
            )}

{user &&  user?.accountType!=="Student" &&
            (
            <Link to="/dashboard/add-course" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              AddCourses
            </div>
          </Link>
            )}

            {
              user  && user?.accountType==="Student" &&(
                <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                  
                Profile
                </div>
                </Link>
              )
            }
            {
              user && user?.accountType==="Student" &&(
                <Link to="/dashboard/enrolled-courses" onClick={() => setOpen(false)}>
                <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                  
                EnrolledCourses
                </div>
                </Link>
              )
            }
            {user &&
            (
            <Link to="/dashboard/settings" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              
              Settings
            </div>
          </Link>
            )}
          
            </div>
           
            </div>
            {user&&
          (<div onClick={() => {
            dispatch(logout(navigate))
            setOpen(false)
          }}
            className='flex justify-center w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"'
          >
            Logout
          </div>
          ) 
            }
          </div>

          )}

            </button>





    // <div className='flex items-center justify-center  w-screen h-screen bg-white'>

        
    //     {
    //         token === null && (
    //             <Link to="/login">
    //         <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
    //                             text-richblack-100  mr-3">
    //                                 Login</button>
    //          </Link>
    //         )}
    //         {
    //         token === null && (
    //               <Link to="/signup">
    //               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
    //                                   text-richblack-100  mr-3">
    //                                       SignUp</button>
    //                </Link>
    //         )
    //     }
    //     {
    //                     token !== null &&
    //                     (
    //                         <ProfileDropDown />
    //                     )
    //                     } 

         
    //     </div>
  )
}
