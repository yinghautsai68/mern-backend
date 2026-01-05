import Post from "../models/post.js"
import PostLike from "../models/postLike.js"

export const togglelike = async (req, res) => {
    try {
        const { postID } = req.params
        const userID = req.user._id.toString()

        const post = await Post.findById(postID)

        const postLiked = await PostLike.findOne({
            userID: userID,
            postID: postID
        })
        if (postLiked) {
            await PostLike.findByIdAndDelete(postLiked._id)
        } else {
            const newLike = new PostLike({
                userID: userID,
                postID: postID
            })
            await newLike.save()
        }


        const likesCount = await PostLike.countDocuments({
            postID: postID
        });
        res.status(200).json({
            liked: !postLiked,
            likesCount: likesCount
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}