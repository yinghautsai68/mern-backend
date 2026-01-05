import mongoose, { mongo } from "mongoose";

const followSchema = new mongoose.Schema({
    followerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    followingID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })

export default mongoose.model("Follow", followSchema, "follow")