const BASE_URL=process.env.REACT_APP_BASE_URL

//auth endpoints
export const endpoints={
    RESETPASSWORD_API:BASE_URL +"/auth/reset-password",
    RESETPASSTOKEN_API:BASE_URL+"/auth/reset-password-token",
    LOGIN_API: BASE_URL+"/auth/login",
    SIGNUP_API:BASE_URL+"/auth/signup",
    SENDOTP_API:BASE_URL+"/auth/sendOtp"
}

//profile endpoints
export const profileEndpoints={
    GET_USER_DETAILS_API:BASE_URL+"/profileRoutes/getUserDetails",
    GET_USER_ENROLLED_COURSES_API:BASE_URL+"/profileRoutes/getEnrolledCourses",
    GET_INSTRUCTOR_DASHBOARD_API:BASE_URL+"/profileRoutes/getInstructorDashboardDetails"
}

//students endpoints
export const studentEndpoints={
    COURSE_PAYMENT_API:BASE_URL+"/payment/capturePayment",
    COURSE_VERIFY_API:BASE_URL+"/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API:BASE_URL+"/payment/sendPaymentSuccessEmail"
}

//course ENDPOINTS
export const courseEndpoints={
GET_ALL_COURSE_API:BASE_URL+"/course/getAllCourses",
COURSE_DETAILS_API:BASE_URL+"/course/getCourseDetails",
EDIT_COURSE_API:BASE_URL+"/course/editCourse",
COURSE_CATEGORIES_API:BASE_URL+"/course/showAllCategories",
CREATE_COURSE_API:BASE_URL+"/course/createCourse",
CREATE_SECTION_API:BASE_URL+"/course/addSection",
CREATE_SUBSECTION_API:BASE_URL+"/course/addSubSection",
UPDATE_SECTION_API:BASE_URL+"/course/updateSection",
UPDATE_SUBSECTION_API:BASE_URL+"/course/updateSubSection",
GET_ALL_INSTRUCTOR_COURSES_API:BASE_URL+"/course/getInstructorCourses",
DELETE_SECTION_API:BASE_URL+"/course/deleteSection",
DELETE_SUBSECTION_API:BASE_URL+"/course/deleteSubSection",
DELETE_COURSE_API:BASE_URL+"/course/deleteCourse",
GET_FULL_COURSE_DETAILS_AUTHENTICATED_API:BASE_URL+"/course/getFullCourseDetails",
LECTURE_COMPLETION_API:BASE_URL+"/course/updatedCourseProgress",
CREATE_RATING_API:BASE_URL+"/course/createRating",
}

//Rating and Reviews
export const ratingEndpoints={
    REVIEWS_DETAILS_API:BASE_URL+"/course/getReviews",
}

//catagories api
export const categories={
    CATEGORIES_API:BASE_URL +"/course/showAllCategories",
}

//catalog page data
export const catalogData={
    CATALOGPAGEDATA_API:BASE_URL+"/course/getCategoryPageDetails",
}

//contact us api
export const contactUsEndpoint={
    CONTACT_US_API:BASE_URL+"/reach/contact",
}

//settings page api
export const settingsEndPoint={
    UPDATE_DISPLAY_PICTURE_API:BASE_URL+"/profileRoutes/updateDisplayPicture",
    UPDATE_PROFILE_API:BASE_URL+"/profileRoutes/updateProfile",
    CHANGE_PASSWORD_API:BASE_URL+"/auth/changePassword",
    DELETE_PROFILE_API:BASE_URL+"/profileRoutes/deleteProfile"
}

