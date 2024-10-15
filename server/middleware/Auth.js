const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");

//auth
exports.auth = async (req, res, next) => {
    try {

        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        console.log("token=>",token)
        //token missing

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }
console.log("hi")
        //verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            //verificatiom issue
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        console.log("success")
        next();

    } catch (err) {
        console.log("h1");
        return res.status(401).json({
            success: false,
            dd:"dd",
            message: "Something went wrong while validating the token",
            err: err
        })
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for student only"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Student role can not be be verified, please try again",
            err: err
        })
    }
    next();
    console.log("success at is Student");
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Instructor role can not be be verified, please try again",
            err: err
        })
    }
    next();
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Admin role can not be be verified, please try again",
            err: err
        })
    }
    next();
}