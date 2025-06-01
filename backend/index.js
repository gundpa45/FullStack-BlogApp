const  express = require("express") 
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require("dotenv");
const dbConnection = require("./dbConnection/db");
const userRoutes = require("./routes/route");
const cookieParser = require("cookie-parser");
const cloudinaryConnect = require("./dbConnection/cloudinaryDb")
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "https://fullstack-blogapp-1.onrender.com",
  credentials: true,
}));

dbConnection()
cloudinaryConnect()

app.use("/api/v1",userRoutes)




app.listen(PORT,() => {
    console.log(`App is started at prot : ${PORT}`)
})

