import React from 'react'
import ContactUsForm from '../../contactPage/ContactUsForm'

export default function ContactFormSection() {
  return (
    <div className='lg:mx-auto'>
            <h1 className='text-center text-4xl font-semibold'>Get in Touch</h1>
            <p className='text-richblack-300 mb-12 text-lg text-center mt-3'>
                We'd love to hear for you, Please fill out this form.
            </p>
            <div>
                <ContactUsForm/>
            </div>
    </div>
  )
}
