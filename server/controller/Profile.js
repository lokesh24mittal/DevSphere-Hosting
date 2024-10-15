const Course = require("../model/Course");
const CourseProgress = require("../model/CourseProgress");
const Profile = require("../model/Profile");
const User = require("../model/User");
const { uploadImageToCloudinary
 } = require("../uiils/ImageUploader");
const { convertSecondsToDuration } = require("../uiils/secToDuration");


exports.updateProfile = async (req, res) => {
    try {
        //get data
        const { firstName="",lastName="",dateOfBirth = "", about = "", contactNumber="", gender="" } = req.body;

        //get userId
        const id = req.user.id;

        
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        const user=await User.findByIdAndUpdate(id,{
            firstName,lastName
        })

        //updateProfile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        await profileDetails.save();

        // find the updated user details
        const updatedUserDetails=await User.findById(id)
        .populate("additionalDetails")
        .exec()

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating profile",
            err: err.message
        })
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        //get  id
        const id = req.user.id;
        console.log("delete profile id",id)

        //validation
        const user = await User.findById({_id:id});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        const profileId = user.additionalDetails;

        console.log("profile id",profileId);
        //deleteProfile
      const profileDeleted=  await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        //unroll user from all enrolled courses
            console.log("Profile dELETE",profileDeleted);
        //delete User
        await User.findByIdAndDelete({ _id: id });

        //return response
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting profile",
            err: err.message
        })
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        //get user details
        const id = req.user.id;

        //validate and get user
        const userDetails = await User.findById(id).populate("additionalDetails");

        //return response
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            userDetails
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while getting all user details profile",
            err: err.message
        })
    }
};

exports.updateProfilePicture=async(req,res)=>{
    try{
        console.log("Updated profile Picture");
        console.log("At updated profile picture");
        const displayPicture=req.files.displayPicture;
        console.log("display picture=>", displayPicture)
        const userId=req.user.id;
        const image=await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,1000,1000
            
        )
        console.log("image")
        console.log(image);
        const updateProfile=await User.findByIdAndUpdate({_id:userId},{image:image.secure_url},{new:true});

        res.send({
            success:true,
            message:"Image added succesfully",
            data:updateProfile
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.mesage
        })
    }
};

exports.getEnrolledCourses=async(req,res)=>{
    try{
        console.log("getenroolledcourses backend")
        const userId=req.user.id;
        console.log("userId",userId)
        let userDetails=await User.findOne({_id:userId})
        .populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec()
        console.log("h1 course progress");
        userDetails=userDetails.toObject()
        var subSectionLength=0;
        
        for(var i=0;i<userDetails.courses.length;i++){
            console.log("h1 cour");
            let totalDurationInSeconds=0;
            subSectionLength=0;
            for(var j=0;j<userDetails.courses[i].courseContent.length;j++){
                totalDurationInSeconds+=userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc,curr)=>acc+parseInt(curr.timeDuration),0)
                userDetails.courses[i].totalDuration=convertSecondsToDuration(totalDurationInSeconds)
                subSectionLength+=userDetails.courses[i].courseContent[j].subSection.length
            }
            
            console.log("totalDurationInSeconds",totalDurationInSeconds);
            let courseProgressCount=await CourseProgress.findOne({courseId:userDetails.courses[i]._id,
                userId:userId
            })
            courseProgressCount=courseProgressCount?.completedVideos.length;
            console.log("courseProgressCount",courseProgressCount)
            if(subSectionLength===0){
                userDetails.courses[i].progressPercentage=100
                console.log("hi from if")
            }
            else{
                console.log("hi from else")
                // to make it upto 2 decimal point
                const multiplier=Math.pow(10,2)
                userDetails.courses[i].progressPercentage=
                Math.round(
                    (courseProgressCount/subSectionLength)*100*multiplier
                )/multiplier
            }
        }

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:`could not find user with id ${userDetails}`
            })
        }
        // console.log(userDetails.courses);

        res.status(200).json({
            success:true,
            message:"successfully get enrolled courses",
            data:userDetails.courses
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.mesage
        })
    }
}

exports.instructorDashboard=async(req,res)=>{
    console.log("Hi from instructions dashboard")
    try{
        const courseDetails=await Course.find({instructor:req.user.id});

        const courseData=courseDetails.map((course)=>{
            const totalStudentEnrolled=course.studentEnrolled.length;
            const totalAmountGenerated=totalStudentEnrolled*course.price

            // create an obj with additional fields

            const courseDataWithStats={
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats
        })
        return res.status(200).json({
            success:true,
            courses:courseData,

        })
    }
    catch(err){
        console.log("Error in ins dashboard api",err);
        return res.status(500).json({
            success:false,
            message:"Error in instructor dashboard api",
            err:err
        })
    }
}