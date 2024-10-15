const {instance}=require("../config/razorpay");
const Course=require("../model/Course");
const CourseProgress = require("../model/CourseProgress");
const User=require("../model/User");
const mailSender=require("../uiils/MailSender");
const crypto =require("crypto");
//courseenrolment
// const{courseEnrollmentEmail}=require("../mails/templates/courseEnrollmentEmail");
const {mongoose } = require("mongoose");

//initiate the razorpay order
exports.capturePayment=async(req,res)=>{
        const {courses}=req.body;
        const userId=req.user.id;
        console.log("courses",courses)

        if(courses.length==0){
            return res.json({
                success:false,
                message:"Please provide course id"
            })
        }

        let totalAmount=0;

        for (const course_id of courses){
            let course;
            try{
                course=await Course.findById(course_id);
                if(!course){
                    return res.json({
                        success:false,
                        message:"Could not find the course"
                    })
                }
                const vid=new mongoose.Types.ObjectId(userId);
                if(course.studentEnrolled.includes(vid)){
                    return res.json({
                        success:false,
                        message:"Student is already enrolled"
                    })
                }
                totalAmount+=course.price;
                

                console.log(totalAmount)

            }
            catch(err){
                console.log(err);
                return res.status(500).json({
                        success:false,
                        message:"something went wrong in validation or totaling in payment controller",
                        err:err.message
                })
            }
        }

        const options={
            amount:totalAmount*100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString()
        }

        try{
            console.log("Inside payment response")
            const paymentResponse= await instance.orders.create(options);
            console.log(paymentResponse);
            res.status(200).json({
                success:true,
                message:paymentResponse
            })
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                success:false,
                message:'something went wrong in payment response in payment controller',
                err:err.message
            })
        }
}

exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body?.courses;
    const userId=req.user.id;

    if(!razorpay_order_id || 
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId){
            res.status(400).json({
                syccess:false,
                message:"Error in Fetching razorpay_order_id orrazorpay_payment_id,razorpay_signature,courses,userId from verify payment controller "
            })
        }
        let body=razorpay_order_id +"|" + razorpay_payment_id;
        const expectedSignature=crypto
                                .createHmac("sha256",process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");
        if(expectedSignature===razorpay_signature){
            //enroll karvao
            await enrolledStudents(courses,userId,res)
            return res.status(200).json({
                success:true,
                message:"Pavment verified"
            })
            
        }
        return res.status(400).status({
            success:false,
            message:"payment failed"
        })
                                
}

const enrolledStudents=async(courses,userId,res)=>{
        if(!courses || !userId){
            return res.status(400).json({
                success:false,
                message:"Data not coming in enrolled courses function in payment courses,userid"
            })
        }
        for(const courseId of courses){
            try{
                // find the course id and enroll the student init
            const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true}
            )
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found not able to enroll in instructor "
                })
            }

            const courseProgress=await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos:[]
            })
            //find the student and add the course to their list of enrolled courses
            const enrolledStudent=await User.findByIdAndUpdate(userId,
                {$push:{
                    courses:courseId,
                    courseProgress:courseProgress._id
                }},{new:true}
            )
            //mail send to student
            const emailResponse=await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                // courseEnrolledEmail(enrolledCourse.courseName),`${enrolledStudent.firstName}`
                "Hi, you have enrolled successfully"
            )
            console.log("Email Send successfully" ,emailResponse.response)
        }
        catch(err){
                console.log(err);
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong in enrolled courses ",
                    err:err.message
                })
        }
            }

}

exports.sendEmailSuccessEmail=async(req,res)=>{
    const {orderId,amount,paymentId}=req.body;


    const userId=req.user.id;

    console.log(orderId,amount,paymentId,userId);

    if(!userId || !paymentId|| !amount || !orderId){
        res.status(400).json({
            success:false,
            message:"Please send all data in req body payment api"
        })

        try{
            // student ko dundho
            const enrolledStudent=await User.findById(userId);
            await mailSender(
                enrolledStudent.email,
                "Payment Received",
                `We got your payment for the course`
            )
        }
        catch(err){
            console.log("Error in sending mail for payment success",err);
            res.status(500).json({
                success:false,
                messgage:"Internal Server Error",
                err:err
            })
        }
    }
}

// //capture the payment and initiate the razorpay order
// //for single item
// exports.capturePayment=async(req,res)=>{
//     try{
//     //get course id and userid
//         const{courseId}=req.body;
//         const userId=req.user.id;

//     //validation
//     //validcourseid
//     if(!courseId){
//         return res.status().json({
//             success:false,
//             message:"Please provide a valid course id"
//         })
//     };
//     //valid coursedetails
//     let course;
//     try{
//         course=await Course.findById(courseId);
//         if(!course){
//             return res.status().json({
//                 success:false,
//                 message:"could not find the course"
//             })
//         }
//            //user already pay for same course
//            const uid= new mongoose.Types.ObjectId(userId);
//            if(course.studentEnrolled.includes(uid)){
//            return res.status(400).json({
//             success:false,
//             message:"Student is already enrolled"
//            })
//            }
//     }
//     catch(err){
//         return res.status(500).json({
//             success:false,
//             message:"error in finding course",
//             err:err
//          })
//     }
 
//     //order create
//     const amount=course.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency,
//         recipt:Math.random(Date.now()).toString(),

//         //will be used after password is verified to use course id and user id to access  db
//         notes:{
//             courseId:courseId,
//             userId:userId
//         }
//     };
//     try{
//         //initiate the payment using razorpay
//         const paymentResponse=await instance.orders.create(options);
//         console.log("Payment response=>",paymentResponse)
//     }catch(err){
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//             err:err
//         })
//     }

//     //return response
//     return res.status(200).json({
//         success:true,
//         courseName:course.courseName,
//         courseDesc:course.courseDescription,
//         thumbnail:course.thumbnail,
//         orderID:PaymentResponse.id,
//         currency:paymentResponse.currency,
//         amount:paymentResponse.amount
//     })
// }
// catch(err){
// return res.status(500).json({
//     success:true,
//     message:"Somethinng went wrong while capturing payment"
// })
// }
// };

// exports.verifySignature=async(req,res)=>{
//     const webHookSecret="12345678";

//     const signature=req.headers("x-razorpay-signature");
// //convert webhook secret to hashed format to check with signature which came from razorpay
//     const shaSum=crypto.createHmac("sha256",webHookSecret);
//     shaSum.update(JSON.stringify(req.body));
//     const digest=shaSum.digest("hex");

//     if(signature===digest){
//         console.log("Payment is authorized...");

//         const {courseId,userId}=req.body.payment.payload.entity.notes;

//         try{
//             //fulfil the action

//             //find the course and enroll the student in it
//             const enrollCourse=await Course.findByIdAndUpdate(
//                                                             {_id:courseId},
//                                                                 {
//                                                                     $push:{studentEnrolled:userId},
//                                                                 },
//                                                             {new:true}
//             );
//             if(!enrollCourse){
//                 return res.status(500).json({
//                     message:false,
//                     message:"course not found"
//                 })
//             }
//             console.log(enrollCourse);

//             //find the student and add the course to their list enrolled course 

//             const enrolledStudent=await User.findByIdAndUpdate(
//                                                                 {_id:userId},
//                                                                 {
//                                                                     $push:{courses:courseId}
//                                                                 },
//                                                                 {new:true}
//                                                             );
//             if(!enrolledStudent){
//                 return res.status(500).json({
//                     message:false,
//                     message:"student not found"
//                 })
//             }
//             console.log(enrolledStudent);

//             //mail send
//             const emailResponse=await mailSender(
//                                                 enrolledStudent.email,
//                                                 "Congratulations from DevSphere",
//                                                 "Congratulations you are enrolled into the new DevSphere course",
//             )
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature verified and course added"
//             })
//         }catch(err){
//                 return res.status(500).json({
//                     success:false,
//                     message:"something went wrong",
//                     err:err.mesaage
//                 })
//         }
         
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request"
//         })
//     }
    


// }