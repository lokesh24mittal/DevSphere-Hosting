const mongoose=require("mongoose");
const mailSender = require("../uiils/MailSender");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

// a function to send email
async function sendVerificationEmail(email,otp){
try{
        const mailResponse=await mailSender(email,"Verification mail from DevSphere",`Hi your verification code is ${otp}`);
        console.log("Email send successfully=>",mailResponse.response);
}
catch(err){
    console.log("Error occur while sending mails=>",err);
    throw err;
}
}

//define a post save gook to send email when the document has been saved

OTPSchema.pre("save",async function(next){
    console.log("New Document save to DB");

    //only send mail whem a mew documen tis created
    if(this.isNew){
    await sendVerificationEmail(this.email,this.otp);
    }
    next();
})

module.exports=mongoose.model("OTP",OTPSchema);