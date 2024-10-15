import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/CourseDetailsApi';
import { setCompletedLectures } from '../../../slice/ViewCourseSlice';
import 'video-react/dist/video-react.css';
import { BigPlayButton, Player } from 'video-react';
import { AiFillPlayCircle } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn';

export default function VideoDetails() {

    const playerRef=useRef();
    const {courseId,sectionId,subSectionId}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const {token}=useSelector((state)=>state.auth);
    const{courseSectionData,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse);
    const [videoData,setVideoData]=useState([]);
    const[videoEnded,setVideoEnded]=useState();
    const[loading,setLoading]=useState();


    useEffect(()=>{
        const setVideoSpecificDetails=async()=>{
           
            if(!courseSectionData.length){
                return;
            }
            if(!courseId&& !sectionId &&!subSectionId){
                navigate("/dashboard/enrolled-courses");
            }
            else{
                // lets assume all the fields are present
                const filteredData=courseSectionData.filter(
                    (course)=>course._id===sectionId
                    
                )
                console.log(subSectionId);
                console.log(filteredData)
                const filteredVideoData=filteredData?.[0].subSection.filter(
                    (data)=>data._id===subSectionId
                )
                console.log(filteredVideoData)
                setVideoData(filteredVideoData[0]);
                console.log(videoData);
                setVideoEnded(false);
            }
        }
        setVideoSpecificDetails();
    },[courseEntireData,courseSectionData,location.pathname]);

    const isFirstVideo=()=>{
        console.log(courseSectionData);
        console.log(sectionId);
        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )
        console.log(currentSectionIndex);
        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSectionIndex===0 && currentSubSectionIndex==0){
            return true;
        }
        else{
            return false;
        }
    }
    const isLastVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )

        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSectionIndex===courseSectionData.length-1 &&
            currentSubSectionIndex===noOfSubSections-1
        ){
            return true;
        }else{
            return false;
        }

    }

    const goToPrevVideo=()=>{
        
        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )

        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSubSectionIndex!==0){
            // same section prev video
            const prevSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1];
            // is video pr chle jao
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        }else{
            // different section last video
        }
        const prevsectionId=courseSectionData[currentSectionIndex-1]._id;
        const prevSubSectionLength=courseSectionData[currentSectionIndex-1].subSection.length;
        const prevSubsectionId=courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;
        navigate(`/view-course/${courseId}/section/${prevsectionId}/sub-section/${prevSubsectionId}`);


    }

    const goToNextVideo=()=>{

        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )

        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSubSectionIndex!==noOfSubSections-1){
            // same section ki next video
            const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSectionIndex+1]._id;
            // is vedio pr jao
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else{
            // different section first bideo
            const nextsectionId=courseSectionData[currentSectionIndex+1]._id;
            const nextSubsectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id;
            // is video pr jao
            navigate(`/view-course/${courseId}/section/${nextsectionId}/sub-section/${nextSubsectionId}`);

        }
        
    }

    const handleLectureCompletion=async()=>{
            // DUMMU CODE

            setLoading(true);
            const res=await markLectureAsComplete({courseId:courseId,subSectionId:subSectionId},token);
            if(res){
                dispatch(setCompletedLectures(subSectionId));
            }
            setLoading(false);
    }

  return (
    <div className="flex flex-col gap-5 text-white">
        {!videoData?(
            <div className='text-2xl text-white flex items-center justify-center mx-auto'>No Data found</div>
        ):(
                <Player
                ref={playerRef}
                aspectRatio='16:9'
                playsInline
                onEnded={()=>setVideoEnded(true)}
                src={videoData?.videoURL}
                >
                    <BigPlayButton position='center'/>
                    {
                        videoEnded&&(
                            <div 
                            style={{
                                backgroundImage:
                                "linear-gradient(to top,rgb(0,0,0),rgba(0,0,0,7),rbba(0,0,0,0.5),rgba(0,0,0,0.1))"
                            }}
                            className='full absolute inset-0 z-[100] grid h-full place-content-center font-inter'>
                                {
                                    !completedLectures.includes(subSectionId)&&(
                                        <IconBtn disabled={loading}
                                        onClick={()=>handleLectureCompletion()}
                                        text={!loading?"Mark as Completed":"Loading"}
                                        customClasses={"text-xl max-w-max px-4 mx-auto"}/>
                                    )
                                }
                                
                                    <IconBtn disabled={loading}
                                    onClick={()=>{
                                        if(playerRef?.current){
                                            playerRef.current.seek(0);
                                            setVideoEnded(false);
                                        }
                                    }}
                                    text="Rewatch"
                                    customClasses={"text-xl max-w-max mx-auto mt-2"}/>

                                <div className='mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl'>
                                    {!isFirstVideo() &&(
                                        <button disabled={loading}
                                        onClick={goToPrevVideo}
                                        className='blackButton'>
                                            Prev
                                        </button>
                                    )}
                                    {
                                        !isLastVideo()&&(
                                            <button disabled={loading}
                                        onClick={goToNextVideo}
                                        className='blackButton'>
                                            Next
                                        </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                </Player>
        )}
        <h1 className='mt-4 text-3xl font-semibold'>{videoData?.title}</h1>
        <p className='pt-2 pb-6'>{videoData?.description}</p>
    </div>
  )
}
