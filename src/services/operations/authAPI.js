import { useDispatch } from "react-redux"
import { apiConnector } from "../ApiConnector";
import {endpoints} from "../Api"
import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slice/AuthSlice";
import { setUser } from "../../slice/ProfileSlice";
import { resetCart } from "../../slice/CartSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORD_API,
    RESETPASSTOKEN_API

}=endpoints

export function sendOtp(email,navigate){
    return async(dispatch)=>{
         const toastId=toast.loading("Loading...")
         dispatch(setLoading(true));
         try{
            const response=await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent:true,
            })
            console.log("SENDOTP API RESPONSE" ,response);
            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP sent Successfully");
            navigate("/verify-email");
         }
         catch(err){
            console.log("SENDOTP API ERROR",err)
            toast.error("Could not send otp")
         }
         dispatch(setLoading(false))
         toast.dismiss(toastId)
    }
}

export function signup(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            console.log("Hi");
            const response=await apiConnector("POST",SIGNUP_API,{
                accountType,firstName,lastName,email,password,confirmPassword,otp
            })
            console.log("Signup API response.....",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup successfully");
            navigate("/login");


        }catch(err){
            console.log("Signup Api Error.........",err);
            toast.error("Signup failed. Please try again later");
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login (email,password,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true))
        try{
            const response=await apiConnector("POST",LOGIN_API,{email,password});
            console.log("Login API response......",response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            const userImage=response.data?.user?.image
            dispatch(setUser({...response.data.user,image:userImage}));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");
        }
        catch(err){
            console.log("LOGIN API ERROR.....",err)
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}




export function getPasswordResetToken(email,setEmailSent){
    // const dispatch=useDispatch();
    return async(dispatch)=>{
        dispatch(setLoading(true));

        try{
            const response= await apiConnector("POST",RESETPASSTOKEN_API,{email});
            console.log("RESET PASSWORD TOKEN RESPONSE...",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(err){
            console.log("Error in Reseting Password Token...",err)
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password,confirmPassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response= await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
            console.log("reset password response...",response);

            if(!response.data.success){
                throw new Error(response.data.message);

            }

            toast.success("Password has been reset successfully");

        }
        catch(err){
                console.log("reset password token error",err);
                toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}
export function logout(navigate){
    return(dispatch)=>{ 
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged out")
        navigate("/")
    }
}