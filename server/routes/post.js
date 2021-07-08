const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authentication');
const Post = require('../models/Post');
const { route } = require('./authentication');






/**
 * C
 * @route POST /api/posts
 * @desc Create a new TO LEARN task
 * @access Private
 */
router.post('/', verifyToken, async (req, res) => {

    const { title, description, url, status } = req.body;
    console.log(`${title} - ${description} - ${url} - ${status}`);
    // simple validation 
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title not provided"
        });
    }

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'OPEN',
            user: req.userId
        });

        await newPost.save();

        res.json({
            success: true,
            message: "Hooray! Let's learn something new!",
            post: newPost
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

})

/**
 * R
 * @route GET /api/posts
 * @desc Retrieve all posts
 * @access Private
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId })
            .populate('user', 'username');
        res.json({
            success: true,
            posts
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})

/**
 * U
 * @route PUT /api/post/:id
 * @desc Update a post
 * @access Private
 */
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    console.log(`${title} - ${description} - ${url} - ${status}`);
    // simple validation 
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title required!"
        });
    }

    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'OPEN',

        }

        const postUpdateCondition = {
            _id: req.params.id,
            user: req.userId
        };

        // Implement update
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true });

        if (!updatedPost) {
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorised"
            });
        }

        res.json({
            success: true,
            message: "Bravo! Item updated!",
            post: updatedPost
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

/**
 * D
 * @route DELETE /api/posts/:id
 * @desc Delete a post
 * @access Private
 */
 router.delete('/:id', verifyToken, async (req, res) => {
   

    try {

        const postDeleteCondition = {
            _id: req.params.id,
            user: req.userId
        };

        // Implement update
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

        if (!deletedPost) {
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorised"
            });
        }

        res.json({
            success: true,
            message: "Oops! Drop the beat :D",
            post: deletedPost
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




module.exports = router;