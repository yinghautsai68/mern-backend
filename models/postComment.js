import mongoose from "mongoose";

const postCommentSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postID: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    text: { type: String }
}, { timestamps: true })

export default mongoose.model("PostComment", postCommentSchema, "postcomments")
