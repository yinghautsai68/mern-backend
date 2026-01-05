import mongoose from "mongoose";

const postLikeSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postID: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
}, { timestamps: true })

export default mongoose.model("PostLike", postLikeSchema, "postlikes")