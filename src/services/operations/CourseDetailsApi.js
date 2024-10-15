import toast from "react-hot-toast"
import { apiConnector } from "../ApiConnector";
import { courseEndpoints } from "../Api";
const { GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_COURSE_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API
} = courseEndpoints;

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API);
        if (!response?.data?.success) {
            throw new Error("Could not fetch course Categories");
        }
        result = response?.data?.data
    }
    catch (err) {
        console.log("GET_ALL_COURSE_API API ERROR........", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseDetails = async (courseId) => {
    
    const toastId = toast.loading("Loading...");
    let result = null
    try {
        console.log("courseId=>",courseId);
        const response = await apiConnector("POST", COURSE_DETAILS_API, {courseId})
        console.log("COURSE_DETAILS_API RESPONSE", response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data
    }
    catch (err) {
        console.log("COURSE_DETAILS_API API ERROR........", err);
        result = err.response.data
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

// fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = [];
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch course Categories");
        }
        result = response?.data?.data
    }
    catch (err) {
        console.log("COURSE_CATEGORIES_API API ERROR........", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

// add the course details
export const addCourseDetails = async (data, token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_COURSE_API RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error("Could not Create Course");
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    }
    catch (err) {
        console.log("CREATE_COURSE_API API ERROR........", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    console.log("result from courseDetails api", result)
    return result;
}

// edit Course Details
export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");
    console.log("hi from edit course details")
    try {
        const response =await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("EDIT COURSE API RESPONSE.........", response)
        if (!response?.data?.success) {
            throw new Error("Could not update Course Details");
        }
        result = response?.data?.data
        toast.success("Course Detalis updated Successfully");
    } catch (err) {
        console.log("EDIT COURSE API ERROR", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create a section
export const createSection = async (data, token) => {
    console.log("data at create section",data)
    let result = null;
    const toastId = toast.loading("Loading");
    try {
        const response =await apiConnector("POST", CREATE_SECTION_API,data,  {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SECTIONAPI RESPONSE API, ", response);
        if (!response?.data?.success) {
            throw new Error("could not create Section");
        }
        toast.success("Course Section Created");
        result = response?.data?.updatedCourseDetails
    } catch (err) {
        console.log("Create Section API ERROR", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create a sub section
export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("CREATE SUB SECTION API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error("Could not add Lecture");
        }
        toast.success("Lecture Added");
        console.log(response,"from Create sub section")
        result = response?.data?.updatedSection;
    }
    catch (error) {
        console.log("CREATE SUB SECTION API ERROR", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update sub section
export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("UPDATE_SUBSECTION_API API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error("Could not Update Lecture");
        }
        toast.success("Lecture Updated");
        console.log("Response from updated sub section",response)
        result = response?.data
        console.log(result,"subSection Updated")
    }
    catch (error) {
        console.log("Update SUB SECTION API ERROR", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update  section
export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("UPDATE_SECTION_API API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error("Could not Update Course Section");
        }
        toast.success("Course Section  Updated");
        result = response?.data?.data;
    }
    catch (error) {
        console.log("Update  SECTION API ERROR", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//delete a section
export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("DELETE_SECTION_API API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error("Could not DELETE Section");
        }
        toast.success("Course Section DELETED");
        result = response?.data?.data;
    }
    catch (error) {
        console.log("Delete SECTION API ERROR", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete a subsection
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("DELETE_SUBSECTION_API API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error("Could not DELETE Lecture");
        }
        toast.success("Lecture DELETED");
        result = response?.data?.data;
    }
    catch (error) {
        console.log("Delete SUBSECTION API ERROR", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete a course
export const deleteCourse = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("DELETE_COURSE_API API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error("Could not DELETE Course");
        }
        toast.success("Course DELETED");
        result = response?.data?.data;
    }
    catch (error) {
        console.log("Delete Course API ERROR", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//fetchong all course under specific instrucotr
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        });
        console.log("Instructor_COURSE_API API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error("Could not FETCH Instructor Course");
        }
        console.log(response,"Get intructon details")
        result = response?.data?.data;
        console.log(result,"result from get instruction details")
    }
    catch (error) {
        console.log("Instructor Course API ERROR", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED_API, { courseId }, {
            Authorization: `Bearer ${token}`
        });
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED_API API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        toast.success("Full COurse Details Fetched Successfully");
        result = response?.data?.data;
    }
    catch (error) {
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED_API API ERROR", error);
        result = error.response.data;
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    console.log("Mark complete Data", data)
    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("MARK AS LECTURE COMPLETE API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error(response.data.error);
        }
        toast.success("Lecture Completed");
        result = true;
    }
    catch (error) {
        console.log("MARK AS LECTURE COMPLETE API API ERROR", error);
        result = false;
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create a rating of course
export const createRating = async (data, token) => {
    let success = false;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("CREATE_RATING_API API RESPONSE.........", response);
        if (!response?.data?.success) {
            throw new Error("Could not create Rating");
        }
        toast.success("Rating created Successfully Successfully");
        success = true;
    }
    catch (error) {
        console.log("CREATE_RATING_API API ERROR", error);
        success = false;
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return success;
}