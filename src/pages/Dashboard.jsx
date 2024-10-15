import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

export default function Dashboard() {

      const {loading:authLoading}=useSelector((state)=>state.auth);
      const {loading:profileLoading}=useSelector((state)=>state.auth);

      if(profileLoading || authLoading){
        return(
            <div className='mt-10'>
                Loading...
                </div>
        )
      }
    return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      <div className='hidden md:block'>
      <Sidebar/>
      </div>
      
        
        <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>

        </div>
    </div>
  )
}
