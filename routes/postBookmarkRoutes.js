import mongoose from 'mongoose'
import express from "express"
import PostBookmark from '../models/postBookmark.js'

import protect from '../middleware/protect.js'
const router = express.Router()

router.post("/:postID/bookmark", protect, async (req, res) => {
    try {
        const { postID } = req.params

        const bookmarked = await PostBookmark.findOne({
            postID: postID,
            userID: req.user._id
        })
        if (!!bookmarked) {
            await PostBookmark.findByIdAndDelete({ _id: bookmarked._id })
            return res.status(200).json({ bookmarked: false })
        } else {
            const post = new PostBookmark({
                userID: req.user._id,
                postID: postID
            })
            await post.save()
            return res.status(200).json({ bookmarked: true })
        }


    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:postID/bookmarked", protect, async (req, res) => {
    try {
        const { postID } = req.params

        const bookmarked = await PostBookmark.findOne({
            postID: postID,
            userID: req.user._id
        })

        res.status(200).json({ bookmarked: bookmarked })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



export default router;
