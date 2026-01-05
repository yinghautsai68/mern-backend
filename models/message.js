import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatID: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    senderID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })

export default mongoose.model("Message", messageSchema, "messages")