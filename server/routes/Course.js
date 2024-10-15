const express=require("express");
const router=express.Router();

//import the controllers

//course controller imprt
const { createCourse, getAllCourses, getCourseDetails, getInstructorCourses, deleteCourse, getFullCourseDetails, editCourse } = require("../controller/Course");

//categories conroller import
const { createCategory, showAllCategories, categoryPageDetails } = require("../controller/Category");

//section controllers import
const { createSection, updateSection, deleteSection } = require("../controller/Section");


//subsection controller import
const { updateSubSection, deleteSubSection, createSubSection } = require("../controller/SubSection");


//rating controller import
const { createRating, getAverageRating, getAllRating } = require("../controller/RatingAndReview");

//import middleware
const { auth, isInstructor, isAdmin, isStudent } = require("../middleware/Auth");
const { updatedCourseProgress } = require("../controller/courseProgress");

// 







//********************************************************************************************* */
//course Routes
//********************************************************************************************* */

//courses can only be created by instructor
router.post("/createCourse",auth,isInstructor,createCourse);
//add a section of course
router.post("/addSection",auth,isInstructor,createSection);
//update a section
router.post("/updateSection",auth,isInstructor,updateSection);
//delete a setion
router.post("/deleteSection",auth,isInstructor,deleteSection);
//edit sub section
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
//delete sub section
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
//add a subsection to a section
router.post("/addSubSection",auth,isInstructor,createSubSection);
//get all registered courses
router.get("/getAllCourses",getAllCourses);
//get details for all specific courses
router.post("/getCourseDetails",getCourseDetails);
// get all the course under specific instructor
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
//delete the course
router.post("/deleteCourse",deleteCourse);
// get details for specific course
router.post("/getFullCourseDetails",auth,getFullCourseDetails);
// edit course
router.post("/editCourse",auth, editCourse)

router.post("/updatedCourseProgress",auth,isStudent,updatedCourseProgress);

//***************************************************** */
//category route only by admin
//******************************************************** */

//category can only be created by Admin
//todo put is admin middleware here
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/getcategoryPageDetails",categoryPageDetails);

//****************************************** */
//rating and review
//****************************************** */

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRating);


module.exports=router;