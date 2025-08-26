import { generateStreamToken } from "../config/stream.js";

export const GenerateStreamToken=async (req,res)=>{
    try {
       const token=await generateStreamToken(req.auth().userId);
        res.status(200).json(token);

    } catch (error) {
        res.status(500).json(error);
    }
}