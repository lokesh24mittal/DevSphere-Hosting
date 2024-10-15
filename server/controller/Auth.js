const User=require("../model/User");
const Profile=require("../model/Profile");
const OTP=require("../model/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mailSender = require("../uiils/MailSender");
require("dotenv").config();

//send otp for email verification
exports.sendOTP=async(req,res)=>{
try{
    const {email}=req.body;

    //check if user already exist
    const checkUserPresent=await User.findOne({email});

    //if user already exist
    if(checkUserPresent){
        return res.status(401).json({
            status:false,
            message:"User already exist"
        });
    }

    //generate otp
  
    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });

    console.log("OTP generated=>",otp);
    
    //check uniqueotp or not
    const result=await OTP.findOne({otp:otp});
   while(result){
    otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
    result=await OTP.findOne({otp:otp});
   }

   const otpPayload={email,otp};
   console.log(otpPayload);
console.log("h1");
   // create an entry in db
   const otpBody=await OTP.create(otpPayload);
   console.log(otpBody);
   console.log("h1");

   //return response successful
   res.status(200).json({
    success:true,
    message:"OTP send successfully",
    otp,
   })

}catch(err){
    res.status(500).json({
        success:false,
        message:err.message
       })
}
}



//signup for registring users

exports.signUp=async(req,res)=>{
    try{
    const{firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;

    // validate
    if(
        !firstName ||
         !lastName ||
          !email ||
           !password ||
            !confirmPassword ||
             !otp
            ){
        return res.status(403).json({
            status:false,
            message:"All fields are mandatory"
        });
    }
        //check if user already exist
        const checkUserPresent=await User.findOne({email});
    
        //if user already exist
        if(checkUserPresent){
            return res.status(401).json({
                status:false,
                message:"User already exist"
            });
        }

        //check if password and conf is same or diff
        if(password!==confirmPassword){
            return res.status(400).json({
                status:false,
                message:"password and cnf pwd does not match"
            });
        }


        // find most recent otp fror the user
        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp=>",recentOTP);

        if(recentOTP.length==0){
            return res.status(400).json({
                status:false,
                message:"Otp not found"
            })
        }else if(otp!==recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid otp"
            });
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);
        console.log("hashed password=>",hashedPassword);

        //create the user
        let approved="";

        approved==="Instructor"?(approved=false):(approved=true)


        //entry create
            console.log("hi")
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        console.log("profile details=>",profileDetails);
        
const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(200).json({
            success:true,
            message:"User is registered Successfully",
            user
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"user can not be registered please try again later",
            err:err
        })

    }


}

//login
exports.login=async(req,res)=>{
try{


    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are mandatory"
        })
    }
//check if user exist or not
const user=await User.findOne({email}).populate("additionalDetails");
    if(!user){
        return res.status(401).json({
            success:false,
            meaasge:"Username does not exist"
        })
    }

  
        //check password & generate jwt token
        if(await bcrypt.compare(password,user.password)){

            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
                //password match
                let token=jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"24h"
                });


                user.token=token;
                user.password=undefined;

                const options={
                    expires:new Date(Date.now()+3*24*60*60+1000),
                    httpOnly:true
                }

                 res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"User loggedin successfully"
                })
        }
        else{
            //password does not match
            return res.status(500).json({
                success:false,
                message:"Password incorrect"
            })
        }

}

catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"Login Failed! Please try again later",
        error:err
    })
}

}


//changepassword
exports.changePassword=async(req,res)=>{
    try{

    
    //get data from req body

    //get old pw , new pw, confpwd
    const userDetails=await User.findById(req.user.id);
    const {oldPassword,newPassword}=req.body;

   
    //validation
    if(!oldPassword|| !newPassword){
        return res.status(403).json({
            status:false,
            message:"All Fields are mandatory"
        });
    }

    //check old password
    const isPasswordMatch=await bcrypt.compare(oldPassword,userDetails.password);

    if(!isPasswordMatch){
        //if old password does  not mathch
        return res.status(401).json({
            success:false,
            message:"The password is incorrect"
        })
    }

 
//update kn db
  
        const hashedPassword=await bcrypt.hash(newPassword,10);
        const updatedUserPassword=await User.findByIdAndUpdate(req.user.id,{password:hashedPassword},{new:true});
    

    //send mail pwd updated
      try{
        const emailResponse=await mailSender(updatedUserPassword.email,`Password Changed successfully for ${updatedUserPassword.firstname} ${updatedUserPassword.lastName}` );
        console.log("Email sent successfully" ,emailResponse.response)
      }  catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Error occured while sending mail"
        })
      }
    //return response

    return res.status(200).json({
        success:true,
        message:"Password Changed Successfully"
        
    })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login Failed! Please try again later",
            error:err
        });
    }
}

