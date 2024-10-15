import toast from "react-hot-toast"
import { setUser } from "../../slice/ProfileSlice"
import { apiConnector } from "../ApiConnector"
import { endpoints, settingsEndPoint } from "../Api"
import { logout } from "./authAPI"

const { DELETE_PROFILE_API, CHANGE_PASSWORD_API, UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API } = settingsEndPoint;

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`,
            })
            console.log("DELETE_PROFILE_API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Profile Deleted Successfully");
            dispatch(logout(navigate))
        }
        catch (err) {
            console.log("DELETE_PROFILE_API ERROR...", err);
            toast.error("COULD not delete Profile");
        }
        toast.dismiss(toastId);
    }
}
export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading....");
    try {
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CHANGE_PASSWORD_API RESPONSE", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Profile Password Changed Successfully");
    }
    catch (err) {
        console.log("CHANGE_PASSWORD_API ERROR...", err);
        toast.error(err.response.data.message);
    }
    toast.dismiss(toastId);
};



export  function updateDisplayPicture(token, formData,) {
    console.log("hi from updated display picture");
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        console.log("hi before try block")
        try {
            console.log("hi after try block")
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Profile Picture Updated Successfully");
            dispatch(setUser(response.data.data));
        }
        catch (err) {
            console.log("UPDATE_DISPLAY_PICTURE_API ERROR...", err);
            toast.error("Could not update display picture");
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        try {
            const response = await apiConnector("POST", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PROFILE_API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            const userImage = response.data.updatedUserDetails.image ?
                response.data.updatedUserDetails.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
            dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }));
            toast.success("Profile  Updated Successfully");
        }
        catch (err) {
            console.log("UPDATE_PROFILE_API ERROR...", err);
            toast.error("Could not update  profile");
        }
        toast.dismiss(toastId);
        return;
    }
}