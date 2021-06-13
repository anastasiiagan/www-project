const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verify = require('./verifyToken');

//Get back all the posts
router.get('/', verify, async (req, res) => {
    //res.send('We are on posts');
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.json({message: err});
    }
});

//Submit a post
router.post('/', verify, async (req,res) => {
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
    const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }
});

//Specific get
router.get('/:postId', verify, async (req, res) => {
    //console.log(req.params.postId);
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
});

//Delete post
router.delete('/:postId',verify, async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    } catch(err) {
        res.json({message: err});
    }
});

//Update a post
router.patch('/:postId',verify, async (req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            { $set: {title: req.body.title}}
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;