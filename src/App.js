import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home"
import NavBar from "./components/common/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import EnrolledCourse from "./components/core/Dashboard/EnrolledCourse";
import Cart from "./components/core/Dashboard/cart/cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Contact from "./pages/Contact";
import AddCourse from "./components/core/Dashboard/Add Course/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/Instructor Dashboard/Instructor";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/settings/Settings";

function App() {
  const {user}=useSelector((state)=>state.profile);
  return (
<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
  <NavBar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="catalog/:catalogName" element={<Catalog/>}/>
    <Route path="courses/:courseId" element={<CourseDetails/>}/>

    <Route path="login" element={
      <OpenRoute>
        <Login/>
      </OpenRoute>
      }/>
    <Route path="signup" element={
<OpenRoute>
  <Signup/>
</OpenRoute>
      }/>
    <Route path="login/forgot-password" element={
      <OpenRoute>
        <ForgotPassword/>
      </OpenRoute>
      }/>

    <Route path="update-password/:id" element={
      <OpenRoute>
        <UpdatePassword/>
      </OpenRoute>
        }/>

        <Route path="verify-email" element={<VerifyEmail/>}/>

        <Route path="/about" element={<About/>}></Route>

<Route element={
  <PrivateRoute>
  <Dashboard/>
  </PrivateRoute>
  } >
    <Route path="dashboard/my-profile" element={<MyProfile/>}/>
    <Route path="dashboard/settings" element={<Settings/>}/>
   
     {user?.accountType===ACCOUNT_TYPE.STUDENT &&(
      <>
       <Route path="dashboard/enrolled-courses" element={<EnrolledCourse/>}/>
     <Route path="dashboard/cart" element={<Cart/>}/>

      </>
     )}
{console.log(user)}
     {user?.accountType===ACCOUNT_TYPE.INSTRUCTOR &&(
      <>
    <Route path="dashboard/add-course" element={<AddCourse/>}/>
    <Route path="dashboard/my-courses" element={<MyCourses/>}/>
    <Route path="dashboard/my-courses/edit-course/:courseId" element={<EditCourse/>}/>
    <Route path="dashboard/instructor" element={<Instructor/>}/>


      </>
     )}
    </Route>

    {/* contact */}
    <Route path="/contact" element={<Contact/>}/>

    <Route element={
      <PrivateRoute>
        <ViewCourse/>
      </PrivateRoute>
    }>

      {user?.accountType===ACCOUNT_TYPE.STUDENT &&(
        <>
        <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
        element={<VideoDetails/>}
        />
        </>
      )}
    </Route>
        
    {/* 404 page */}
    <Route path="*" element={<Error/>}/>
  </Routes>
</div>
  );
}

export default App;
