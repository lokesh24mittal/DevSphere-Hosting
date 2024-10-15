
const Section = require("../model/Section");
const Course = require("../model/Course");
const SubSection=require("../model/SubSection")

exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;
        //data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Fields"
            })
        }
        //create section
        const newSection = await Section.create({ sectionName })
        //update course with section objectid
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        )
        //use populate to replace section/subsection both in updated course details
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();
        //return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the Section",
            err: err.message
        })
    }
}

exports.updateSection = async (req,res) => {

    try {
        //data input
        const { sectionName, sectionId,courseId } = req.body
        //data validaton
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Fields"
            })
        }
        //updata data
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
        const course=await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();
        //return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            section,
            data:course,
        })
    } 
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating the Section",
            err:err.message
        });
    };

};

exports.deleteSection = async (req, res) => {
    try {
        //getid,->assuning we are sending id in params

        //test with the params
        const {sectionId,courseId} = req.body;
        console.log("Section and course id from delete section APi")
        console.log(sectionId,courseId);
        console.log(sectionId);

        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId,
            }
        })
        const section=await Section.findById(sectionId);
        if(!section){
            return res.status(400).json({
                success:false,
                message:"Section not found",
            })
        }
        //delete sub Section
        await SubSection.deleteMany({_id:{$in:section.subSection}});
        await Section.findByIdAndDelete(sectionId);

        const course=await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()
        //usefindbyidanddelete
  
       //hw -> course ko bhi update krro
        //return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data:course
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the Section",
            err: err.message
        })
    }

}