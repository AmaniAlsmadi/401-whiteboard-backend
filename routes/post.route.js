'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearer-auth');
const { Post , CommentModel } = require('../models/index.js');


router.get('/post', getPostWithComments);
router.post('/post', createPost);
router.get('/post/:id', getOnePostWithComments);
router.put('/post/:id',bearerAuth ,updatePost);
router.delete('/post/:id/:ownerId',bearerAuth , deletePost);


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
    console.log(req.user, req.body,"hhhhhhhhhhh")
    if(req.user.capabilities.includes('update') ||  +req.user.id === +req.body.ownerId) {
      const post = await Post.update( id, obj );
    res.status( 201 ).json( post );
}else {
return res.status(401).json({message: 'you are not admin!!!!!!!'})
    
}}

async function deletePost(req, res) {
    const id = req.params.id;
    const ownerId = req.params.ownerId;
    if(req.user.capabilities.includes('delete') || +req.user.id === +ownerId) {
        console.log(req.user.id, req.body,"hhhhhhhhhhh2222")
         await Post.delete( id ).then( () => {
        res.status( 200 ).send( {message: 'post has been deleted'} );
    } );
}else{
return res.status(401).json({message: 'you are not admin!!!!!!!'})
}}


module.exports = router;