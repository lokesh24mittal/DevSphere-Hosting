import toast from "react-hot-toast"
import { setLoading, setUser } from "../../slice/ProfileSlice"
import { apiConnector } from "../ApiConnector"
import { profileEndpoints } from "../Api"
import { logout } from "./authAPI"
import { useDispatch } from "react-redux"

const{GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DASHBOARD_API}=profileEndpoints

// export function getUserDetails(token,navigate){
//     return async(dispatch)=>{
//         const toastId=toast.loading("Loading...")
//         dispatch(setLoading(true))
//         try{
//             const response=await apiConnector("GET",GET_USER_DETAILS_API,null,{
//                 Authorization:`Bearer ${token}`
//             })
//             console.log("Get_USER_DETAILS_API RESPONSE.....",response)
//             if(!response.data.success){
//                 throw new Error(response.data.message)
//             }
//             const userImage=response.data.data.image?response.data.data.image:`https://api.dicebar.com/5/x/initials/svg?seed=${response.data.data.firstName}
//             ${response.data.data.lastName}`
//             dispatch(setUser({...response.data.data,image:userImage}))
//         }
//         catch(err){
//             dispatch(logout(navigate))
//             console.log("Get user details api error...",err)
//             toast.error("could not get user details")
//         }
//         toast.dismiss(toastId)
//         dispatch(setLoading(false));
//     }

// };
export async function getUserEnrolledCourses(token){
    const toastId=toast.loading("Loading...");
    let result=[];
    try{
        console.log("try block get user Enrolled Courses")
        const response=await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization:`Bearer ${token}`
            }
        )
        console.log("success");
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response.data.data
        console.log(result);
    }catch(err){
        console.log("Get_USER_ENROLLED_API ERROR",err);
        toast.error("Could not get enrolled courses");
    }
    toast.dismiss(toastId);
    return result;
};

export async function getInstructorData(token){
    const toastId=toast.loading("Loading...");
    let result=[];
    try{
        const response=await apiConnector("GET",GET_INSTRUCTOR_DASHBOARD_API,null,
            {
                Authorization:`Bearer ${token}`
            }
        );
        console.log("GET INSTRUCTOR API RESPONSE",response);
        result=response.data.courses;
    }
    catch(err){
        console.log("GET INSTRUCTOR API ERROR",err);
        toast.error("Could mot get instructor data");
    }
    toast.dismiss(toastId);
    return result;
}
