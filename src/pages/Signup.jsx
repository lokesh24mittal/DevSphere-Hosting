import React from 'react'
import Template from '../components/core/LoginSignup/Template';
import signup from "../assets/Images/signup.webp";
export default function Signup() {
  return (
    <div>
        <Template
        title="Join the millions learning to code with DevSphere for free"
        desc1="build skills fro today, tomorrow & beyond."
        desc2="Education to future proof your carrier"
        image={signup}
        formType="signup"
        />
    </div>
  )
}
