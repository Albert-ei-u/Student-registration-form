import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

//mongodb connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MOngoDb connected"))
    .catch((err)=> console.error(err))

//schema    

const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
});

const Student = mongoose.model("Student",studentSchema);

//routes
app.post("/api/students", async (req, res)=>{
    try{
        const {name, age, email} = req.body;

        const student = new Student({name, age, email});
        await student.save();

        res.status(201).json(student);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});

app.get("/api/students", async(req, res)=>{
    try{
        const students = await Student.find();
        res.json(students);
    }catch(err){
        res.status(500).json({error: error.message})
    }
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));