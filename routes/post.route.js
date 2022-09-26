'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearer-auth');
const { Post , CommentModel } = require('../models/index.js');

router.get('/post', getPostWithComments);
router.post('/post', createPost);
router.get('/post/:id', getOnePostWithComments);
router.put('/post/:id',bearerAuth, updatePost);
router.delete('/post/:id',bearerAuth , deletePost);


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
    const obj = req.body;
    if(!req.user.capabilities.includes('update')) {
        return res.status(401).json({message: 'you are not admin!!!!!!!'})
      }
    const post = await Post.update( id, obj );
    res.status( 201 ).json( post );
}

async function deletePost(req, res) {
    const id = req.params.id;
    if(!req.user.capabilities.includes('delete')) {
        return res.status(401).json({message: 'you are not admin!!!!!!!'})
      }
    await Post.delete( id ).then( () => {
        res.status( 200 ).send( {message: 'post has been deleted'} );
    } );
}


module.exports = router;