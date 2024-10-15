const express=require("express");
const router=express.Router();
const { deleteAccount, updateProfile, getAllUserDetails, getEnrolledCourses, updateProfilePicture, instructorDashboard } = require("../controller/Profile");
const { auth, isInstructor } = require("../middleware/Auth");



//profile routes

//delete user account
router.delete("/deleteProfile",auth,deleteAccount);
router.post("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getAllUserDetails);

//get enrolled courses
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateProfilePicture);

//instructor dashboard
router.get("/getInstructorDashboardDetails",auth,isInstructor,instructorDashboard)

module.exports=router