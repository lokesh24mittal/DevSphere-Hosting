const User=require("../model/User");
const mailSender=require("../uiils/MailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

//resetPasswordToken
exports.resetPasswordToken=async(req,res)=>{

    try{

    //get emal from req body
        const {email}=req.body;
    //check user for the mail, email verification
        const user=await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:"Your email is not registerd with us"
            });
        };
    //generate token
        const token=crypto.randomUUID();
    //update user by adding token expiration time
        const updatedDetails=await User.findOneAndUpdate(
                                                        {email:email},
                                                        {token:token,
                                                            resetPasswordExpires:Date.now()+5*60*1000
                                                        },
                                                        {new:true}
        );
    //create url
const url=`https://dev-sphere-frontend.vercel.app/${token}`
    //send mail containing url
        await mailSender(email,"Password reset Link",`Password reset Link:- ${url}`)
    //return response
            return res.status(200).json({
                success:true,
                message:"Email send successfully, please check your email",
                token
            })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong while reset the pw",
            err:err
        })
    }

}

//resetPassword

exports.resetPassword=async(req,res)=>{

    try{
        //data fetch
        const {password,confirmPassword,token}=req.body;

        //validation
        if(password!==confirmPassword){
            return res.json({
                success:false,
                message:"Password not matching"
            })
        }

        //get userDetails from db using token
        const userDetails=await User.findOne({token:token});

        //if no entry -invalid token
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        };

        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){
                return res.json({
                    success:false,
                    message:"Token is expired please regenerate your token"
                })
        };
        //hash password
        const hashedPassword=await bcrypt.hash(password,10)

        //password update

        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true})


        //return response

        return res.status(200).json({
            success:true,
            message:"Passwrod reset successfully"
        }
        )
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            err:err
        }
        )
    }
}