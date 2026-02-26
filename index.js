const express = require('express')
const db = require('./db/db')
const cors=require("cors")
const router = require('./routes/userRoute')
const cookieParser = require('cookie-parser')
require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/users",router)
app.use(cookieParser())


db().then(()=>{

    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`)
    })
})



