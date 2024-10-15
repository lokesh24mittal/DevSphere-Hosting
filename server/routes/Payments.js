const express=require("express");
const router=express.Router();
const { auth, isStudent } = require("../middleware/Auth");
const { capturePayment, verifyPayment, sendEmailSuccessEmail } = require("../controller/Payments");


router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",auth,isStudent,verifyPayment);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendEmailSuccessEmail)

module.exports=router;