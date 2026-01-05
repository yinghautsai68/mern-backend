//BASIC SETUP
import express from "express";
import User from "../models/user.js"

//register
//import upload from "../middleware/multer-old.js";
import upload from "../middleware/multer.js";


//login
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//info
import protect from "../middleware/protect.js"

const router = express.Router();

router.post("/register", upload.single("imageFile"), async (req, res) => {
    try {
        const { username, email, password, imageFile, bio } = req.body
        const newUser = new User({
            username,
            email,
            password,
            imageFile: req.file ? req.file.path : null,
            bio
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User Created Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "用戶不存在", user })
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "密碼錯誤", user })
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,

        )
        res.status(200).json({ message: "login successful", token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/me", protect, async (req, res) => {
    try {

        const user = req.user
        res.status(200).json({

            id: user._id,
            username: user.username,
            profilePic: user.imageFile,
            bio: user.bio,
            postsCount: user.postsCount,
            followersCount: user.followersCount,
            followingCount: user.followingCount,
            createdAt: user.createdAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.get('/users', protect, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } })

        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.get("/:userID", async (req, res) => {
    try {
        const { userID } = req.params

        const user = await User.findById(userID)

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.imageFile,
            bio: user.bio,
            createdAt: user.createdAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/search/username/:username", async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.find({ username: { $regex: username, $options: "i" } })

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:user/userinfo", async (req, res) => {
    try {
        const userInfo = await User.findById(req.params.user)

        res.status(200).json({
            profilePic: userInfo.imageFile,
            username: userInfo.username
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


export default router;