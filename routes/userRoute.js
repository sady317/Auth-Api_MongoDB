const express=require("express")
const { signUP, logIn } = require("../controllers/userController")
const router=express.Router()


router.post("/signup",signUP)
router.post("/login",logIn)





module.exports=router