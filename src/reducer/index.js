import{combineReducers} from "@reduxjs/toolkit";
import authReducer from"../slice/AuthSlice";
import profileReducer from"../slice/ProfileSlice";
import cartReducer from "../slice/CartSlice"
import courseReducer from "../slice/CourseSlice"
import ViewCourseReducer from"../slice/ViewCourseSlice"

const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:ViewCourseReducer
})
export default rootReducer;