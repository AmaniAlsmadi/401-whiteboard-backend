'use strict';

const express = require('express');
const router = express.Router();

const { Post , CommentModel } = require('../models/index.js');

router.get('/post', getPostWithComments);
router.post('/post', createPost);
router.get('/post/:id', getOnePostWithComments);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);


async function getPostWithComments(req, res) {
    const post = await Post.readWithComments( CommentModel);
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
    const post = await Post.readOneWithComments(id,CommentModel);
    res.status(200).json(post);
}


async function updatePost(req, res) {
    const id = req.params.id;
    const obj = req.body.content;
    const post = await Post.update( id, obj );
    res.status( 201 ).json( post );
}

async function deletePost(req, res) {
    let id = req.params.id;
    await Post.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}


module.exports = router;