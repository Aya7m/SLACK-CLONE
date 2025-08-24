import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URL);
        console.log("Conected to MongoDB...");
    } catch (error) {
        console.log(error, "error connecting to MongoDB");
    }
};