const express=require("express");
const connectToMongo=require('./db');
const app= express();
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");
const cors=require("cors");
const multer=require("multer")
const path=require("path");



connectToMongo();
app.use("/images",express.static(path.join(__dirname,"public/images")))

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})
const upload=multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully")
    }catch(err){
        console.log(err);
    }
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(
    cors({
        credentials: true,
        origin: [
            "http://localhost:5173/",
            "http://localhost:4173/",
            "http://localhost:3000/",
            "http://localhost:3001/",
            "https://kaiznn.com/",
            "https://test.kaiznn.com/",
            "https://demo.kaiznn.com/",
        ],
    })
);
app.listen(8800,()=>{
    console.log("Backend server is ready")
})