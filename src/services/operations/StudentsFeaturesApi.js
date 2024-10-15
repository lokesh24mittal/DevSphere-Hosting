import toast from "react-hot-toast";
import {studentEndpoints} from "../Api";
import { apiConnector } from "../ApiConnector";
import rzeLogo from "../../assets/Logo/rzeLogo.jpg"
import { setPaymentLoading } from "../../slice/CourseSlice";
import { resetCart } from "../../slice/CartSlice";

const{COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;


function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src

        script.onload=()=>{
            resolve(true)
        }

        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    console.log("courses");
    console.log(courses);
    const toastId=toast.loading("Loading...");
    try{
        // load script

        const response=await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!response){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses}
                                                ,{Authorization:`Bearer ${token}`}
        );
        console.log(orderResponse);
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }


        // options
        const options={
            key:process.env.RAZOPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:orderResponse.data.message.amount,
            order_id:orderResponse.data.message.id,
            name:"DevSphere",
            description:"Thankyou for Purchasing the course",
            image:rzeLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:`${userDetails.email}`
            },
            handler: function(response){
                console.log(response);
                // send successful email
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);

                // verify mail
                verifyPayment({...response,courses},token,navigate,dispatch);
            }
        }
        console.log(options);
        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment Failed",function(response){
            toast.error("OOPS, Payment Failed. Please try again in some time");
            console.log(response.error);
        })
    }
    catch(err){
        console.log(`PAYMENT API ERROE-------`,err);
        toast.error("Could not make payment");

    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    console.log("Inside send payment successful email");
    console.log("Response for send payment successful",response);
    try{
            await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
                orderId:response.razorpay_order_id,
                paymentId:response.razorpay_payment_id,
                amount
            },{
                Authorization:`Bearer ${token}`
            })
    }catch(err){
        console.log("Payment successful email error",err);
    }
}


async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId=toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, You are added to the course");
        navigate("/dashboard/enroller-courses");
        dispatch(resetCart());
    }
    catch(err){
        console.log("Payment verify error",err);
        toast.error("Could not Verify Payment")
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}