import React from 'react'
import ContactDetails from '../components/contactPage/ContactDetails'
import ContactForm from '../components/contactPage/ContactForm'
import Footer from '../components/common/Footer'

export default function Contact() {
  return (
    <div>
        <div className='mx-auto mt-20 w-11/12 max-w-max-content flex flex-col justify-between gap-10 text-white
        lg:flex-row'>
            {/* Contact Details */}
            <div className='lg:w-[40%]'>
                <ContactDetails/>
            </div>
            {/* contact form */}
            <div className='lg:w-[60%]'>
                <ContactForm/>
            </div>
        </div>
        <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
        {/* Reviews from others Learners */}
        <h1 className='text-center text-4xl font-semibold mt-8'>
            Reviews from other learners
            </h1>
        </div>
        <Footer/>
    </div>
  )
}
