import express from "express"
import upload from "../middleware/multer.js"
import Chat from "../models/chat.js"
import Message from '../models/message.js'
const router = express.Router()

router.post("/send", upload.none(), async (req, res) => {
    try {
        const { users, message } = req.body
        let chat = await Chat.findOne({ users: { $all: users, $size: users.length } })

        if (!chat) {
            chat = new Chat({
                users: users
            })
            await chat.save()
        }

        const newMessage = new Message({
            chatID: chat._id,
            senderID: users[0],
            message: message
        })
        await newMessage.save()
        res.status(200).json({ chat, newMessage })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post("/access", async (req, res) => {
    try {
        const { users } = req.body
        let chat = await Chat.findOne({
            users: { $all: users, $size: users.length }
        })

        if (!chat) {
            chat = new Chat({
                users: users
            })
            await chat.save()
        }

        res.status(200).json({ chatID: chat._id })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get("/load/:chatID", async (req, res) => {
    try {

        const { chatID } = req.params
        const messages = await Message.find({ chatID: chatID })
        res.status(200).json({ messages })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export default router