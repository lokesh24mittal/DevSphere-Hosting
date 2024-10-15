import React from 'react'
import HighLightText from '../HomePage/HighLightText'

export default function Quote() {
  return (
    <div className='text-4xl w-11/12 py-5 font bold'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighLightText text={" combines technology"}/>,
        <span className="bg-gradient-to-br from-[#FF512F]  to-[#F09819]
              bg-clip-text text-transparent">{" "}expertise</span>,
        {" "} and community to create an{" "}
        <span className='bg-gradient-to-br from-[#F9D423]  to-[#E65C00]
              bg-clip-text text-transparent'>unparalleled educational experience.</span>
    </div>
  )
}
