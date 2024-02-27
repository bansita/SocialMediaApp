const mongoose=require('mongoose');
const mongoURL="mongodb+srv://ptkprateek2002:Bansita!@cluster0.lovn0u5.mongodb.net/"
const connectToMongo=()=>{
    mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
}
module.exports=connectToMongo;