import jwt from "jsonwebtoken"
export const AuthApi=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        console.log(token)
        if(!token){
            res.send("token is not found")
        }

        const decodeTokenData= await jwt.verify(token,process.env.TOKEN_SECRET)
        console.log(decodeTokenData)

        req.userId=decodeTokenData.id


        next()
    } catch (error) {
        
    }
}