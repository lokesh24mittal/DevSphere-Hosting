const Section=require('../model/Section');
const { uploadImageToCloudinary } = require("../uiils/ImageUploader");
const SubSection = require("../model/SubSection");

exports.createSubSection=async(req,res)=>{
    try{
        //fetch data from req body
        const{sectionId,title,description}=req.body
        //extract file/vedio
        const video=req.files.videoFile;
        //validation
        console.log(video)
        if(!sectionId || !title  || !description  || !video){
            return res.status(400).json({
                success:false,
                message:"all fields are mandatory"
            })
        }
        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
        console.log("upload Details",uploadDetails.secure_url)
        //create a sub section
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoURL:uploadDetails.secure_url
        })
        console.log("subSection->",subSectionDetails)
        //update section with this sub section objectid
        const updatedSection= await Section.findByIdAndUpdate({_id:sectionId},
                                                    {$push:{
                                                        subSection:subSectionDetails._id
                                                    }},
                                                    {new:true}
        ).populate("subSection")
        //log updated section here, after adding populated query
        //return response
        return res.status(200).json({
            success:true,
            message:"Sub section created successfully",
            updatedSection
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating the sub section",
            err:err.message
        })
    }
};

//update sub section
exports.updateSubSection=async(req,res)=>{
    try{
        console.log("In sub SECTION")
        const {title,description,sectionId,subSectionId}=req.body;
        console.log("Section id and sub section id",sectionId,subSectionId);
        
          const subsection=await SubSection.findById(subSectionId);
          console.log("subSection",subsection)

          if(!subsection){
            return res.status(404).json({
                success:false,
                message:"sub section not found"
            })
          };

          if(title!==undefined){
            subsection.title
          }

            if(description !==undefined){
                subsection.description=description
            }

            if(req.files && req.files.video !==undefined){
                const video=req.files.video
                const uploadDetails=await uploadImageToCloudinary(
                    video,
                    process.env.FOLDER_NAME
                )
                subsection.videoUrl=uploadDetails.secure_url
                subsection.timeDuration=`${uploadDetails.duration}`
            }
            await subsection.save();
            const updatedSection=await Section.findById(sectionId).populate("subSection");
          

            //return response
            return res.status(200).json({
                success:true,
                message:"Sub section updated successfully",
                data:updatedSection
            })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating the sub section",
            err:err.message
        })
    }
};

//delete sub section
exports.deleteSubSection=async(req,res)=>{
    try{
         const {subSectionId,sectionId}=req.body;
         //usefindbyidanddelete
         await Section.findByIdAndUpdate({id:sectionId},{
            $pull:{
                subSection:subSectionId,
            },
         });

         const subSection =await subSection.findByIdAndDelete({_id:subSectionId});

         if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Subset not found"
            })
         }
         const updatedSection=await Section.findById(sectionId).populate("subSection");
         //return response
         return res.status(200).json({
             success:true,
             data:updatedSection,
             message:"Sub Section deleted successfully",
         })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting the sub section",
            err:err.message
        })
    }
};