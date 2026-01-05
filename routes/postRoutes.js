import mongoose from "mongoose";

import express from "express"
import upload from "../middleware/multer.js";
import Post from "../models/post.js"
import protect from "../middleware/protect.js";
import { togglelike } from "../controllers/postController.js";
import PostLike from "../models/postLike.js";


const router = express.Router()

router.post('/create', upload.single("image"), protect, async (req, res) => {
    try {
        const { caption } = req.body

        const newPost = new Post({
            userID: req.user._id,
            image_URL: req.file ? req.file.path : null,
            caption: caption
        })

        const savedPost = await newPost.save()

        res.status(200).json({ message: "post created", savedPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.get('/feed', async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json(error.message)
    }


})

router.get('/search', async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.get('/me', protect, async (req, res) => {
    try {
        const posts = await Post.find({ userID: req.user._id })

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json(error.message)
    }


})


router.get('/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const posts = await Post.find({ userID: userID })

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json(error.message)
    }


})


router.put('/:postID/like', protect, togglelike);

router.get('/:postID/getlikecount', async (req, res) => {
    try {
        const { postID } = req.params

        const likesCount = await PostLike.countDocuments({
            postID: postID
        })
        res.status(200).json({ likesCount })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.get("/:postID/likestatus", protect, async (req, res) => {
    try {
        const { postID } = req.params
        const userID = req.user._id
        const liked = await PostLike.findOne({ postID, userID })

        res.status(200).json(liked)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export default router