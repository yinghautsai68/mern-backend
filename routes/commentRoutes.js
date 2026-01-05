import mongoose from "mongoose";

import express from "express"

import Comment from "../models/postComment.js";
import upload from "../middleware/multer.js";
import protect from "../middleware/protect.js";
const router = express.Router()

router.post('/post', protect, upload.none(), async (req, res) => {
    try {
        const { comment, postID } = req.body

        const newComment = new Comment({
            userID: req.user._id,
            postID: postID,
            text: comment
        })

        await newComment.save()
        res.status(200).json({ message: "comment saved" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.get("/:postID/get", async (req, res) => {
    try {
        const { postID } = req.params

        const comments = await Comment.find({
            postID: postID
        })
            .populate("userID")

        res.status(200).json({ comments })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:postID/getcommentscount", async (req, res) => {
    try {
        const { postID } = req.params

        const commentsCount = await Comment.countDocuments({ postID: postID })

        res.status(200).json({ commentsCount })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


export default router