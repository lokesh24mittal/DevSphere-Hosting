import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("added to add to cart");
            const course = action.payload
            console.log(course);
            const index = state.cart.findIndex((Item) => Item._id === course._id)

            if (index >= 0) {
                //if the course is already in cart so do not modify the quantity
                toast.error("Course already in cart")
                return
            }

            //if the course is not in the cart , add it to cart
            state.cart.push(course);

            // update the total quantity and price
            state.totalItems++
            state.total += course.price

            //update to local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            //show toast
            toast.success("Course moved to Cart");
        },
        removeFromCart:(state,action)=>{
            const courseId=action.payload
            const index=state.cart.findIndex((item)=>item._id===courseId)

            if(index>=0){
                //if the course is found in the cart, remove it
                state.totalItems--
                state.total-=state.cart[index].price
                state.cart.splice(index,1)
                //update to localstorage
                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            //show toast
            toast.success("Course removed from cart")

            }
        },
    
    resetCart: (state) => {
        state.cart = []
        state.total = 0
        state.totalItems = 0
        //update to local storage
        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("totalItems")


    },
},

})

export const { addToCart,resetCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
