import React from 'react';
import Template from '../components/core/LoginSignup/Template';
import login from "../assets/Images/login.webp";
export default function Login() {
  return (
    <div>
        <Template
        title="Welcome Back"
        desc1="Bulld skills for today, tomorrow & beyond."
        desc2="Education to future-proof your carrier"
        image={login}
        formType="Login"
        />
    </div>
  )
}
