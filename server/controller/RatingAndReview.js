const Course = require("../model/Course");
const RatingAndReviews=require("../model/RatingAndReviews")

//create rating
exports.createRating=async(req,res)=>{
    try{
    //get user id
    const userId=req.user.id;

    //fetch data from req body
    const {rating, review, courseId}=req.body;
    console.log("CourseId from rating review",courseId)
    console.log("userId from rating review",userId)
    

    //check if the studnt is enrolled or not
    const courseDetails=await Course.findOne({_id:courseId,studentEnrolled:{$elemMatch:{$eq:userId}},});

    if(!courseDetails){
        return res.status(404).json({
            success:false,
            message:"Student is not enrolled in the course"
        });
    }
    //check if user already reviewed the course
         const alreadyReviewed=await RatingAndReviews.findOne({user:userId,course:courseId});
            if(alreadyReviewed){
                return res.status(403).json({
                    success:false,
                    message:"user already reviewed the course"
                });
            }

            //cretate ratinf review

            const ratingReview=await RatingAndReviews.create({rating,review,course:courseId,user:userId})

            //update course with the rating/review
            const updatetCourseDetails=await Course.findOneAndUpdate({_id:courseId},{$push:{ratingAndReviews:ratingReview._id,}},{new:true})
            console.log(updatetCourseDetails);

            //return respomse

            return res.status(200).json({
                success:true,
                message:"Rating and Review Created Successfully",
                ratingReview
            })

        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:" Error while creating Rating and Review",
                err:err.message
            })
        }
};

//get average Rating
exports.getAverageRating=async(req,res)=>{
    try{
        //get course id
        const courseId= req.body.courseId;

        //calculate average rating and review
        const result= await RatingAndReviews.aggeregate([
                        {
                            match:{
                                course:new mongoose.Types.ObjectId(courseId),
                            },
                        },
                        {
                            $group:{
                                _id:null,
                                averageRating:{$avg:"$rating"},
                            }
                        }
        ])

        //return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        };

        //if no ratind review exist
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, no rating given till now",
            averageRating:0
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:" Error while getting average Rating and Review",
            err:err.message
        })
    }

}

//get all rating and reviews

exports.getAllRating=async(req,res)=>{
    try{
        const allReview=await RatingAndReviews.find({})
                                               .sort({rating:"desc"})
                                               .populate({
                                                path:"user",
                                                select:"firstName lastName email image"
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName",
                                            })
                                            .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReview
            })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:" Error while getting All the Rating and Review",
            err:err.message
        })  
    }
}