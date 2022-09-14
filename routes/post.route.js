'use strict';

const express = require('express');
const router = express.Router();

const { Post , Comment } = require('../models/index.js');

router.get('/post', getPostWithComments);
router.post('/post', createPost);
router.get('/post/:id', getOnePostWithComments);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);


async function getPostWithComments(req, res) {
    const post = await Post.readWithComments( Comment);
    res.status(200).json({
        post
    });
}

async function createPost(req, res) {
    const newPost = req.body;
    const post =await Post.create(newPost);
    res.status(200).json(post);
}

async function getOnePostWithComments(req, res) {
    const id = req.params.id;
    const post = await Post.readOneWithComments(id,Comment);
    res.status(200).json(post);
}


async function updatePost(req, res) {
    const id = req.params.id;
    const obj = req.body;
    const post = await Post.read({
        where: {id: id}
    });
    const updatedPost = await post.update(obj);
    res.status(201).json(updatedPost);
}

async function deletePost(req, res) {
    let id = req.params.id;
    let deletePost = await Post.destroy({
        where: {id: id}
    });
    res.status(204).json({Message: 'Post deleted'});
}


module.exports = router;