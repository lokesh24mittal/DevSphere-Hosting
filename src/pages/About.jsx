import React from 'react'
import HighLightText from '../components/core/HomePage/HighLightText';
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from '../components/core/About/Quote';
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/About/StatsComponent';
import LearningGrid from '../components/core/About/LearningGrid';
import ContactFormSection from '../components/core/About/ContactFormSection';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';
import ContactForm from '../components/contactPage/ContactForm';


export default function About() {
  return (
    <div className=''>
      {/* section */}
      <section className='bg-richblack-700 text-white'>
        <div className='w-11/12 relative mx-auto max-w-max-content flex-col  items-center justify-between  text-center'>
          <header className='py-20 text-center lg:w-[70%] mx-auto'>
            <p className='text-4xl'>
            Driving Innovation in Online Education for a<br/>
            <HighLightText text={"Brighter Future"} /></p>
            <p 
            className='mx-auto mt-4 text-center font-medium text-richblack-300 lg:w-[95%]'
            >DevSphere is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          </header>
          <div className='sm:h-[70px] lg:h-[150px]'></div>
          <div className='absolute  left-[50%] grid w-[100%]  translate-x-[-50%] gap-3 lg:gap-5 translate-y-[30%] grid-cols-3  bottom-0'>
            <img src={BannerImage1} alt='banner img 1'/>
            <img src={BannerImage2} alt="banner img 2"/>
            <img src={BannerImage3}  alt='banner img 3'/>
          </div>
        </div>
      </section>

      {/* Section2 */}
      <section className='border-b border-richblack-700'>
        <div className='mx-auto text-center flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500 mt-20'>
          <Quote />
        </div>
      </section>

      {/* section 3 */}
      <section className=''>
        {/* finding story wala div  */}
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
          <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
            {/* founding story left box */}
            <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
              <h1 className='text-4xl mb-10 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]
              bg-clip-text text-transparent font-semibold
              '>Our Founding Story</h1>
              <p className='text-base font-medium text-richblack-300 lg:w-9[95%]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
              <p className='text-base font-medium text-richblack-300 lg:w-9[95%]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
            {/* founding story right box */}
            <div className=''>
              <img className='shadow-[#FC6767] shadow-[0_0_20px_0]' src={FoundingStory} alt="founding story" />
            </div>
          </div>
          {/* vision and mission wala parent div 
                 */}
          <div className='flex lg:flex-row flex-col items-center gap-4 lg:gap-10 justify-between text-richblack-300 '>
            {/* left box */}
            <div className='lg:w-[40%]'>
              <h1 className='text-4xl mb-10 bg-gradient-to-br from-[#FF512F]  to-[#F09819]
              bg-clip-text text-transparent font-semibold'>Our Vision</h1>
              <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>

            {/* right box */}
            <div className='lg:w-[40%] '>
              <h1 className='text-4xl mb-10 bg-gradient-to-br from-[#1FA2FF] via-[#12DF8A] to-[#A6FFCB]
              bg-clip-text text-transparent font-semibold'>Our Mission</h1>
              <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-richblack-700 mt-[100px] p-8'>
        <div className='mx-auto w-11/12'>
      <StatsComponent />
      </div>
      </section>
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent  flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
        {/* <ContactForm/> */}
      </section>

      {/* <section className='relatie mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between */}
      {/* gap-8 bg-richblack-900 text-white' > */}

        <h1 className='text-center text-4xl font-semibold hidden md:block mt-8 text-white'>
          Reviews from other learners
        </h1>
        <div className="hidden md:block">
          <ReviewSlider/>
        </div>

      {/* </section> */}

      <section>
        <Footer/>
      </section>


    </div>
  )
}
