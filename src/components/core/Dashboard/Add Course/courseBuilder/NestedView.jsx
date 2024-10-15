import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSolidDownArrow } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import SubSectionModal from './SubSectionModal';
import ComfirmationModal from "../../../../common/ComfirmationModal"
import { setCourse } from '../../../../../slice/CourseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/CourseDetailsApi';

export default function NestedView({ handleChangedEditSectionName }) {
    console.log("Inside nested view")
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [ confirmationModal, setComfirmationModal ] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token
        })
        console.log("Result after deleting From nested view",result)
        if (result) {
            dispatch(setCourse(result))
        }
        setComfirmationModal(null);
    }
    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token });
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse));
        }
        setComfirmationModal(null);

    }
    return (
        <div>
            <div className='rounded-lg bg-richblack-700 p-6 px-8' id="nestedViewContainer">

                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>

                        <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                            <div className='flex items-center gap-x-3'>

                                <RxDropdownMenu className='text-2xl text-richblack-50'/>
                                <p className='font-semibold text-richblack-50'>{section.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <button onClick={() => handleChangedEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit className='text-xl text-richblack-300'/>
                                </button>
                                <button onClick={() => {
                                    setComfirmationModal({
                                        text1: "Delete this Section?",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setComfirmationModal(null)
                                    })
                                }}>
                                    <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                                </button>
                                <span className='font-medium text-richblack-300'>|</span>
                                <BiSolidDownArrow className='text-xl text-richblack-300' />
                            </div>
                        </summary>
                        <div className='px-6 pb-4'>
                            {section.subSection.map((data) => (
                                <div key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className='flex items-center justify-between gap-x-3 border-b-2 cursor-pointer border-b-richblack-600 py-2'>
                                        
                                    <div className='flex items-center gap-x-3 py-2'>
                                        <RxDropdownMenu className='text-2xl text-richblack-50'/>
                                        <p className='font-semibold text-richblack-50'>{data.title}</p>
                                    </div>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className='flex items-center gap-x-3'>
                                        <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                            <MdEdit className='text-xl text-richblack-300'/>
                                        </button>
                                        <button onClick={() => {
                                            setComfirmationModal({
                                                text1: "Delete this sub Section",
                                                text2: "Selected Lectures  will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                btn2Handler: () => setComfirmationModal(null)
                                            })
                                        }}>
                                            <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                                        </button>

                                    </div>
                                </div>
                            ))}
                            <button onClick={() => setAddSubSection(section._id)}
                                className='mt-4 flex items-center gap-x-2 text-yellow-50'>
                                <AiOutlinePlus className='text-lg'/>
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}

            </div>
            {
                addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />) :
                    viewSubSection ?
                        (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />) :
                        editSubSection ?
                            (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />) :
                            (<div></div>)
            }
            {
                confirmationModal?(<ComfirmationModal modalData={confirmationModal}/>):(<div></div>)
            }
        </div >


    )
}
