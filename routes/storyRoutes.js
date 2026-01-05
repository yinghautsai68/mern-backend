import mongoose from "mongoose";
import express from "express"
import protect from "../middleware/protect.js";
import Story from "../models/story.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.post("/create", protect, upload.single("image"), async (req, res) => {
    try {
        const { caption } = req.body
        const story = new Story({
            userID: req.user._id,
            caption: caption,
            image: req.file.path
        })
        await story.save()
        res.status(200).json({ message: "story create success" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/get", async (req, res) => {
    try {
        const { ids } = req.query

        let stories
        if (ids) {
            const idsArray = ids.split(",")
            stories = await Story.find({ userID: { $in: idsArray } }).populate("userID")
        } else {
            stories = await Story.find().populate("userID")
        }


        res.status(200).json({ stories })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export default router