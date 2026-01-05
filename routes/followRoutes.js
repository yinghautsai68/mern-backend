import mongoose from "mongoose";
import express from "express"
import protect from "../middleware/protect.js";
import Follow from "../models/follow.js";

const router = express.Router()

router.post('/:followingID', protect, async (req, res) => {
    try {
        const { followingID } = req.params


        const follow = new Follow({
            followerID: req.user._id,
            followingID: followingID
        })

        await follow.save()

        res.status(200).json({ message: "follow sucess" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/follows", protect, async (req, res) => {
    try {
        const follows = await Follow.find({ followerID: req.user._id }).populate("followingID")

        res.status(200).json({ follows })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


export default router