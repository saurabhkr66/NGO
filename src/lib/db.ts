import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ngo";

if(!MONGODB_URI){
    console.log("MongoDB URI is not defined. Please set the MONGODB_URI environment variable.");
}

export const connectDB = async () => {
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection failed:", error);
        throw error;
    }


}
// mongodb+srv://sauravkum420:<db_password>@cluster0.l0yh2kz.mongodb.net/