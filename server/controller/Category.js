const Category =require("../model/Category");
function getRandomInt(max){
    return Math.floor(Math.random()*max)
}

//create a Category handler function
exports.createCategory=async(req,res)=>{
    try{
        //fetch data
        const{name,description}=req.body;

        //validation
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }
        //create entry in db

        const categoryDetails=Category.create({name:name,description:description})
        console.log(categoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            err:err
        })
    }
}

//get all Categorys

exports.showAllCategories=async(req,res)=>{
    console.log("Show all categories")
    try{
        const allCategories=await Category.find(
            {}
        );
        console.log("All categories",allCategories)
        return res.status(200).json({
            success:true,
            // message:"Categories:-",
            data:allCategories
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            err:err
        })
    }
}

exports.categoryPageDetails=async (req,res)=>{
    try{
        //get categoryId
        const {categoryId}=req.body;
        console.log(categoryId,"categoryId")
        //get courdes for specific categoryid
        

        const selectedCategory=await Category.findById(categoryId).populate({
            path:"courses",
            match:{status:"Published"},
            populate:"ratingAndReviews"
        }).exec();
        console.log("Seclecte Category",selectedCategory)

        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            })
        }

        // when there is no coursw
        
        if(selectedCategory.courses.length===0){
            console.log("No course found for the selected category");
            return res.status(404).json({
                success:true,
                message:"No course found for the selected Category"
            })
        }
        

        // get course for other categories
        const categoriesExpectedSelected=await Category.find({
            _id:{$ne:categoryId},
        })
        console.log("Hi from categories Expexted Selected",categoriesExpectedSelected)

        //get course for different categories
        let differentCategory=await Category.findOne(
            categoriesExpectedSelected[getRandomInt(categoriesExpectedSelected.length)]
            ._id
        )
        .populate({
            path:"courses",
            match:{status:"Published"},
        }).exec();
        console.log("Hi from differentCategory",differentCategory)
        

        //get top 20 selling courses =>hw

        const allCategories=await Category.find()
                            .populate({
                                path:"courses",
                                match:{status:"Published"},
                            }).exec();

        const allCourses=allCategories.flatMap((category)=>category.courses)
        console.log("All Courses")
        const mostSellingCourses=allCourses
                                .sort((a,b)=>b.sold -a.sold)
                                .slice(0,10)
                                console.log("Most Selling courses")

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            err:err
        })
    }
}