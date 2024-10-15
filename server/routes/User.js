const express=require("express");
const router=express.Router();




//import the required controller and middleware functions
const { login, signUp, sendOTP, changePassword } = require("../controller/Auth");
const { auth } = require("../middleware/Auth");
const { resetPasswordToken, resetPassword } = require("../controller/ResetPassword");


//authentication routes

//route for user login
router.post("/login",login);

//router for user signup
router.post("/signup",signUp);

//router for sending otp to user
router.post("/sendOtp",sendOTP);

//router for changing password
router.post("/changePassword",auth,changePassword);

//reset password

//route for generating reset password token
router.post("/reset-password-token",resetPasswordToken);

//router for resetting user password after verification
router.post("/reset-password",resetPassword);


//export the router for use in main application
module.exports=router;