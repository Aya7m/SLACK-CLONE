import {StreamChat} from "stream-chat";
import { ENV } from "./env.js";

const streamClient=StreamChat.getInstance(ENV.STREAM_API_KEY,ENV.STREAM_API_SECRET);

export const upsertStreamUser=async (userData)=>{
    try {
        const response=await streamClient.upsertUser(userData);
        console.log("upserted user",userData.name);
        
        return response;
    } catch (error) {
        console.log(error,"error upserting stream user");
    }
}

export const deleteStreamUser=async (userId)=>{
    try {
        const response=await streamClient.deleteUser(userId);
        console.log("deleted user",userId);
        
        return response;
    } catch (error) {
        console.log(error,"error deleting stream user");
    }
}

export const generateStreamToken=async (userId)=>{
    try {
       const userIdString=userId.toString();
        const response=await streamClient.createToken(userIdString);
        console.log("generated stream token");
        
        return response;
    } catch (error) {
        console.log(error,"error generating stream token",error);
    }
} 