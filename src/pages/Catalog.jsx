import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/ApiConnector';
import { categories } from '../services/Api';
import getCatalogPageData from '../services/operations/pagesAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';

export default function Catalog() {

    const { catalogName } = useParams();
    console.log(catalogName);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const[active,setActive]=useState(1);
    const [categoryId,setCategoryId]=useState("");
    console.log("I am under catalog page")

    // fetch all categories
    useEffect(()=>{
        console.log("useEffect")
        const getCategories=async()=>{

            const res=await apiConnector("GET",categories.CATEGORIES_API);
            console.log(res,"result from get categoriee")
            console.log(res.data.data)
            const category_id=res?.data?.data?.filter((ct)=>ct.name.split(' ').join("-").toLowerCase()===catalogName)[0]._id;
            console.log("category_id",category_id);
            setCategoryId(category_id);
            console.log(categoryId,"categoryId");
        }

        // if(categoryId){
        getCategories();
        // }
    },[catalogName]);

    useEffect(() => {
        console.log("under use effect")
        const getCategoryDetails = async () => {
            console.log("fdds")
            try {

                const res = await getCatalogPageData(categoryId);

                console.log("Printing res:", res);
                setCatalogPageData(res);

            }
            catch (err) {
                console.log(err);
            }
        }
    if(categoryId){
        getCategoryDetails();
    }
    }, [categoryId]);
    return (
        <div className='box-content bg-richblack-800 px-4'>
            <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
                <p
                className='text-sm text-richblack-300'
                >{`Home /Catalog /`}<span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
                <p
                className='text-3xl text-richblack-5'><span>{catalogPageData?.data?.selectedCategory?.name}</span></p>
                <p
                className='max-w-[870px] text-richblack-200'
                ><span>{catalogPageData?.data?.selectedCategory?.description}</span></p>
            </div>
            <div>
                {/* section1 */}
                <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <div className='section_heading'>Courses to get you Started</div>
                <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
                    <p
                    className={`px-4 py-2 ${
                        active===1
                        ?"border-b border-b-yellow-25 text-yellow-25"
                        :"text-richblack-50"
                    } cursor-pointer`}
                    onClick={()=>setActive(1)}
                    >Most Popular</p>
                    <p className={`px-4 py-2 ${
                        active===2
                        ?"border-b border-b-yellow-25 text-yellow-25"
                        :"text-richblack-50"
                    } cursor-pointer`}
                    onClick={()=>setActive(2)}>New</p>
                </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>
                {/* section2 */}
                <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                    <div className='section_heading'
                    >Top courses in <span>{catalogPageData?.data?.selectedCategory?.name}</span></div>
                    <div className='py-8'>
                        {console.log("Top Courses course slider", catalogPageData?.data?.differentCategory)}
                        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                    </div>
                </div>
                {/* section3 */}
                <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                    <p className='section_heading'>Frequently Bought</p>
                    <div className='py-8'>
                        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                            {
                                console.log("Most selling courses-",catalogPageData?.data?.mostSellingCourses)
                            }
                            {
                                
                                catalogPageData?.data?.mostSellingCourses?.slice(0, 4)
                                    .map((course, index) => (
                                        <Course_Card course={course} key={index} Height={`h-[400px]`} />
                                    ))
                            }
                        </div>
                    </div>

                </div>
            </div>
            <Footer />

        </div>

        // <div>

        // </div>
    )
}
