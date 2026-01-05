import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    caption: { type: String },
    image: { type: String }
}, { timestamps: true })

export default mongoose.model("Story", storySchema, "stories")