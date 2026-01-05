import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image_URL: { type: String },
    caption: { type: String },
}, { timestamps: true });

export default mongoose.model("Post", postSchema)