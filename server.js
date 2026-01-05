//IMPORT
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import postBookmarkRoutes from './routes/postBookmarkRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import storyRoutes from './routes/storyRoutes.js'
import followRoutes from './routes/followRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

import http from "http"
//SETTINGS
dotenv.config()

//SERVER
const app = express()
const PORT = process.env.PORT || 5000;
const server = http.createServer(app)

//MIDDLEWARE
app.use(cors({
    origin: "https://yinghautsai68.github.io",
    credentials: true // if you need cookies/auth
}));

app.use(express.json())
app.use('/uploads', express.static(join(__dirname, 'uploads')));


connectDB();
//ROUTES
app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/postbookmark', postBookmarkRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/story', storyRoutes)
app.use('/api/follow', followRoutes)
app.use('/api/chat', chatRoutes)

import { Server } from "socket.io"
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
// minimal socket logic
import Message from './models/message.js'
io.on("connection", (socket) => {

    socket.on("joinChat", (chatID) => {
        socket.join(chatID)
    })

    socket.on("sendMessage", async ({ chatID, senderID, message }) => {
        const newMessage = await Message.create({ chatID, senderID, message })

        // send to everyone in the chat including sender
        io.to(chatID).emit("receiveMessage", newMessage)
    })

})


//Check if server running
server.listen(PORT, () => {
    console.log('working!')
})
