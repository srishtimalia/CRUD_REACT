const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //

const app = express();
const PORT = process.env.PORT ||8080;
app.use(cors()); 

app.use(express.json()); //


mongoose  //
 .connect("mongodb://localhost:27017/HarshDB")
 .then(() => console.log("Connect to Database"))
 .catch((err) => console.log(err));

 const schemaData = mongoose.Schema(
    {
        name:  String,
        email: String,
        mobile: String,
    },
    {
        timestamps: true
    }
 );

 const userModel = mongoose.model("user",schemaData);
//  Read
 app.get("/",async (req,res) => {
    const data = await userModel.find({});
    // console.log(req.body);
    res.json({success:true, data: data});
  
 })

 //update

//  app.put("/update", async(res, req) => {
//     console.log(req.body);
//     const { _id, ...rest} = req.body;
//     console.log(rest);
//     const data = await userModel.updateOne({ _id : id}, rest);
//     res.send({success: true, message: "Data updated successfully", data: data});
//  });

app.put("/update", async (req, res) => {
   console.log(req.body);
   const { _id, ...rest } = req.body;
   console.log(rest);
   const data = await userModel.updateOne({ _id: _id }, rest);
   res.send({
     success: true,
     message: "data updated successfully ",
     data: data,
   });
 });

 
 //delete+
 app.delete("/delete/:id", async (req,res) => {
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({_id : id});
    res.send({success: true, message: "Data Deleted Successfully", data: data})
 })

//create data or save data in mongodb
 app.post("/create",async (req,res) => {
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "Data save successfully", data: data});
 })

 app.get("/", async (req, res) => {
   const data = await userModel.find({});
   res.json({ success: true, data: data });
   // res.json({message:"server is running crud operation"})
 });


app.listen(PORT, () => {
    console.log("server is running...")
});