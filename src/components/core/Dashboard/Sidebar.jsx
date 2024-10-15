import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLinks from './SidebarLinks';
import {  VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import ComfirmationModal from '../../common/ComfirmationModal';

export default function Sidebar() {

const {user,loading:profileLoading}=useSelector((state)=>state.profile);
const {loading:authLoading}=useSelector((state)=>state.auth);
const dispatch=useDispatch();
const navigate=useNavigate();

const [comfirmationModal,setComfirmationModal]=useState(null);

if(profileLoading || authLoading){
    return(
        <div className='mt-10'>
            Loading...
            </div>
    )
  }

  return (
    <div className=''>
        <div className='flex min-w-[220px] h-full flex-col  border-r-[1px] border-r-richblack-700 min-h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link)=>{
                        if(link.type && user?.accountType !==link.type) return null;
                        return(
                            <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
                        )
                    })
                }
            </div>
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

                <div className='flex flex-col'>
                    <SidebarLinks link={{name:"settings",path:"/dashboard/settings"}}
                    iconName={"VscSettingsGear"} />

                    <button onClick={()=>setComfirmationModal({
                         text1:"Are you sure?",
                         text2:"You will be logged out of your account",
                         btn1Text:"Logout",
                         btn2Text:"cancel",
                         btn1Handler:()=>dispatch(logout(navigate)),
                         btn2Handler:()=>setComfirmationModal(null)
                    })}
                    className='text-sm font-medium px-8 py-2 text-richblack-300'
                    >
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>
                    </button>

                    

                </div>
        </div>
        
{comfirmationModal && <ComfirmationModal modalData={comfirmationModal}/>}

    </div>
  )
}
