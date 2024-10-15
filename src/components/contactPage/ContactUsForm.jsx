import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../data/countrycode.json"
import toast from 'react-hot-toast';
import { contactUsEndpoint } from '../../services/Api';
import { apiConnector } from '../../services/ApiConnector';

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: ""
      })
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    console.log("Logging data", data);
    try {
      setLoading(true);
      // const response= await apiConnector("POST",contactUsEndpoint.CONTACT_US_API,data);

      const response = { status: "ok" ,success:true,message:"data saved successfully" };
      console.log(response);

      toast.success("We got your details our team will connect with you shortly");
      setLoading(false);
    }
    catch (err) {
      console.log(err, err.message);
      setLoading(false);
    }
  }

 const styles={

  labelStyle:{
    fontSize:"14px",
    color:"white",
    
  },
  inputStyle:{
    borderRadius:"0.5rem",
    color:"rgb(241 242 255)",
    backgroundColor:"rgb(44 51 63)",
    padding:"0.75rem",
    fontSize:"16px",
    lineHeight:"24px"
  }
 }

  if(loading){
    return(
 <div className='text-white'>Loading...</div>
    )
}

  return (
    
    <form className='flex flex-col gap-7 text-black' onSubmit={handleSubmit(submitContactForm)}>

      <div className='flex flex-col lg:flex-row gap-5 justify-between'>
        {/* firstanme */}
        <div className='flex flex-col gap-2 lg:w-[50%]'>
          <label className="text-white text-[14px]" style={styles.labelStyle}htmlFor='firstName'>First Name</label>
          <input type='text' name='firstName' id='firstName' placeholder='Enter First Name'
            {...register("firstName", { required: true })}
          className='' style={styles.inputStyle}/>
          {
            errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your name
              </span>
            )
          }
        </div>

        {/* lastName */}
        <div className='flex flex-col gap-2 lg:w-[50%]'>
          <label className="text-white" style={styles.labelStyle} htmlFor='lastName'>Last Name</label>
          <input type='text' name='lastName' id='lastName' placeholder='enter Last Name'
            {...register("lastName")}
          className='' style={styles.inputStyle}/>
          
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {/* email */}
        <label className="text-white"htmlFor='email' style={styles.labelStyle}>Email Address</label>
        <input type="email" name='email' id='email' placeholder='Enter Email Address'
          {...register("email", { required: true })}
          style={styles.inputStyle}/>{
          errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your email address
            </span>
          )
        }

      </div>

      <div className='flex flex-col gap-2' >
        <label className="text-white"htmlFor='phoneNumber' style={styles.labelStyle}>Phone Number</label>
        {/* phone */}
        <div className='flex gap-2 items-center justify-center'>
          <div className='flex flex-col w-[14%] gap-5'>
            {/* country code */}
            <select name='dropdown' id='dropdown' {...register("countryCode", { required: true })} style={styles.inputStyle}>
              {
                CountryCode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>{element.code} - {element.country}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='flex flex-col w-full'>
            {/* phone number */}
            <input type='number'
              name='phoneNumber'
              id='phoneNumber'
              placeholder='12345 67890'
              style={styles.inputStyle}
              {...register("phoneNo",
                {
                  required: { value: true, message: "Please enter phone Number" },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" }
                }
              )
              } />
          </div>
        </div>
        {
          errors.phoneNo && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )
        }
      </div>

      {/* masseag */}
      <div className='flex flex-col gap-2'>
        <label className="text-white"htmlFor='message' style={styles.labelStyle}>Message</label>
        <textarea
          name='message'
          id='message'
          cols={30}
          rows={7}
          placeholder='Enter Your Message Here'
          {...register("message", { required: true })}
          style={styles.inputStyle} />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please Enter your Message
          </span>
        )}
      </div>

      <button type='submit'
        className='rounded-md bg-yellow-50 text-center mb-2 px-6 py-3  text-[16px] font-bold text-black '
      >
        Send Message
      </button>
    </form>
  )
}
