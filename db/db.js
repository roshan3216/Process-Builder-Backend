import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI;


const connectDb = async () =>{
    await mongoose.connect(uri)
    .then((res)=>{
        console.log(`Connected to mongodb database`);
    }).catch((err)=>{
        console.log(err,'[error in connecting to mongodb database]');
        throw new Error('Error connecting to database');
    });
    // console.log('here ');
}

export default connectDb;