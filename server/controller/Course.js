const Course=require("../model/Course");
const Category=require("../model/Category");
const User=require("../model/User");
const {uploadImageToCloudinary}=require('../uiils/ImageUploader');
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");
const{convertSecondsToDuration}=require("../uiils/secToDuration")
const CourseProgress =require("../model/CourseProgress");

//create coures
exports.createCourse=async(req,res)=>{
    try{

        //data fetch
        const{courseName,courseDescription,whatYouWillLearn,price,tag,category,status,instructions}=req.body;
        console.log("Category Details->",category)

        //get thumbnail
        const thumbnail=req.files.thumbnailImage;
        console.log("Inside course create")

        //validation
        if(!courseName|| !courseDescription || !whatYouWillLearn || !price ||!tag || !thumbnail || !category ){
            return res.status(400).json({
                success:false,
                message:"All fiels are mandatory"
            })
        }
        if(!status||status==undefined){
            status:"Draft";
        }

        //check for instructor
        const userId=req.user.id;

        const instructorDetails=await User.findById(userId,{accountType:"instructor"});
        console.log("Instructor details are:-",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instruuctor details not found"
            })
        }
        //check given tag is valid or  not
        const categoryDetails=await Category.findById(category);
        console.log("category Details are=>",categoryDetails)
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details details not found"
            })
        }

        //upload img to cloudinary
    console.log("Before image saves to cloudinary")
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log("thumbnailImage",thumbnailImage);

        //create an entry for new course 
    
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            category:category._id,
            tag:tag,
            status:status,
            instructions:instructions,
            thumbnail:thumbnailImage.secure_url
        });
     

        //add the new course to the user schema of instructor
        console.log("SSs")
        await User.findByIdAndUpdate({
            _id:instructorDetails._id},
            {
                $push:{courses:newCourse._id},
            },
        
    {new:true}
);
console.log("SSs")

//update the tag schema
await Category.findByIdAndUpdate({
_id:category,
},
{
    $push:{courses:newCourse._id}
},

)
console.log("SSs")
//return response
return res.status(200).json({
    success:true,
    message:"course created Successfully",
    data:newCourse
})

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong while creating Course",
            err:err
        })
    }
}


// edit course
exports.editCourse=async(req,res)=>{
    try{
        const{courseId}=req.body;
        const updates=req.body;
        const course=await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }

        // if thumbnail img is not found
        if(req.files){
            const thumbnail=req.files.thumbnailImage;
            const thumbnailImage=await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail=thumbnailImage.secure_url
        }
        // update only field that are present in req bosy
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key==="tag" || key==="instructions"){
                    course[key]=JSON.parse(updates[key])
                }
                else{
                     course[key]=updates[key]
                }
            }
        }
        await course.save()

        const updatedCourse=await Course.findOne({
            _id:courseId,
        })
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        })
        .exec()

        res.status(200).json({
            success:true,
            message:"Course updated successfully",
            data:updatedCourse
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
            err:err.message
        })
    }
}


//fetch all courser

exports.getAllCourses=async(req,res)=>{
    try{

        const allCourse=await Course.find({status:"Published"},
            {courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviews:true,
                studentsEnrolled:true
            }
        );

        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourse
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong while fetching all Course",
            err:err
        })
    }
};
//getcourseDetails

exports.getCourseDetails=async(req,res)=>{
    try{
        //get id
        const {courseId}=req.body;
        console.log('courseId' ,courseId);

        //find course details

        const courseDetails=await Course.findOne({_id:courseId})
                                .populate(
                                {path:"instructor",
                                        populate:{
                                           path:"additionalDetails",
                                        },
                                    }
                                )
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
                select:"-videoUrl",
            },
        }
    )
        .exec();
        console.log("course details->",courseDetails);

        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`could not find the course with ${courseId} `
            });
        }

        let totalDurationInSeconds=0
        courseDetails.courseContent.forEach((content)=>{
            content.subSection.forEach((subSection)=>{
                const timeDurationInSeconds=parseInt(subSection.timeDuration)
                totalDurationInSeconds+=timeDurationInSeconds
            })
        })

        const totalDuration=convertSecondsToDuration(totalDurationInSeconds);
        console.log("totalDuration",totalDuration
        )
            //return response
            return res.status(200).json({
                success:true,
                message:"Course details fetched successfully",
                data:{
                    courseDetails,
                    totalDuration}
            })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

//get a list of courses for a given instructor
exports.getInstructorCourses=async(req,res)=>{
    try{
        // get the instructor id from the authencated user or req body
        const instructorId=req.user.id;

        // find all course belonging to instructor
        const instructorDetails=await Course.find({
            instructor:instructorId,
        }).sort({createdAt:-1})

        // return the instructor courses
        res.status(200).json({
            success:true,
            data:instructorDetails
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:"false",
            message:"Failed to retrieve instructor courses",
            err:err.message
        })
    }
}
// delete the course
exports.deleteCourse=async(req,res)=>{
    try{
        const {courseId}=req.body

        // findthe course
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        // unenor;; student from the course
        const studentEnrolled=Course?.studentEnrolled
        if(studentEnrolled){
        for (const studentId of studentEnrolled){
                await User.findByIdAndUpdate(studentId,{
                    $pull:{courses:courseId},
                })
        }
    }
        //delete the section and subsections
        const courseSections=course.courseContent
        for(const sectionId  of courseSections){
            // delete sub sections of the section
            const section= await Section.findById(sectionId)
            if(sectionId){
                const subSections=section?.subSection
                if(subSections){
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            }
            //delete the section
            await Section.findByIdAndDelete(sectionId);
        }
        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Course Deleted Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Could not delete course from api",
            message:err.message
        })
    }
  
}

exports.getFullCourseDetails=async(req,res)=>{

    try{
        const {courseId}=req.body;
        console.log("courseId form get full courseDetails",courseId)

        const userId=req.user.id;
        const courseDetails=await Course.findOne({
            _id:courseId,
        })
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();

        let courseProgressCount=await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })

        console.log("courseProgressCount",courseProgressCount);
        if(!courseDetails){
            return res.status(400).json({
                success:true,
                message:`Could not find the course with id:${courseId}`
            })
        }

        let totalDurationInSeconds=0
        courseDetails.courseContent.forEach((content)=>{
            content.subSection.forEach((subSection)=>{
                const timeDurationInSeconds=parseInt(subSection.timeDuration)
                totalDurationInSeconds+=timeDurationInSeconds
            })
        })

        const totalDuration=convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success:true,
            data:{
                courseDetails,
                totalDuration,
                completedVideos:courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos:[],
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }

}
