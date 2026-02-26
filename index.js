const express = require('express')
const db = require('./db/db')
const cors=require("cors")
const router = require('./routes/userRoute')
const cookieParser = require('cookie-parser')
const { AuthApi } = require('./middlware/AuthApi')
require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/users",router)
app.use(cookieParser())

app.get("/home",AuthApi,(req,res)=>{
  console.log(req.userId)
  res.send("This is home route")
})


db().then(()=>{

    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`)
    })
})



