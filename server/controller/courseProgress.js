const CourseProgress = require("../model/CourseProgress");
const SubSection = require("../model/SubSection");

exports.updatedCourseProgress=async(req,res)=>{
    const{courseId,subSectionId}=req.body;
    const userId=req.user.id;
    try{
        const subSection=await SubSection.findById(subSectionId);

        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"Invalid Sub Section"
            })
        }
        // check for old entry
        let courseProgress=await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        });
        if(!courseProgress){
            return res.status(400).json({
                success:false,
                message:"Course Progress does not exist"
            })
        }
        else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success:false,
                    message:"SubSection already completed"
                })
            }

            // push into completed video
            courseProgress.completedVideos.push(subSectionId);
            console.log("course progress push done");
        }
        await courseProgress.save();
        return res.status(200).json({
            success:true,
            message:"CourseProgress updated Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            messsage:"Internal Server Error"
        })
    }
}