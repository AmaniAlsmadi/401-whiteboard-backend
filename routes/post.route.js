'use strict';

const express = require('express');
const router = express.Router();

const { Post } = require('../models/index.js');

router.get('/post', getPost);
router.post('/post', createPost);
router.get('/post/:id', getOnePost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);


async function getPost(req, res) {
    const post = await Post.findAll();
    res.status(200).json({
        post
    });
}

async function createPost(req, res) {
    const newPost = req.body;
    const post =await Post.create(newPost);
    res.status(201).json(post);
}

async function getOnePost(req, res) {
    const id = req.params.id;
    const post = await Post.findOne({
        where: {id: id}
    });
    res.status(200).json(post);
}


async function updatePost(req, res) {
    const id = req.params.id;
    const obj = req.body;
    const post = await Post.findOne({
        where: {id: id}
    });
    const updatedPost = await post.update(obj);
    res.status(202).json(updatedPost);
}

async function deletePost(req, res) {
    let id = req.params.id;
    let deletePost = await Post.destroy({
        where: {id: id}
    });
    res.status(204).json({deletePost});
}


module.exports = router;