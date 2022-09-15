'use strict';

const express = require('express');
const router = express.Router();

const { Comment } = require('../models/index.js');

router.get('/comment', getComment);
router.post('/comment/:id', createComment);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);


async function getComment(req, res) {
    const comment = await Comment.read();
    res.status(200).json({
        comment
    });
}

async function createComment(req, res) {
    const postId = req.params.id;
    const content = req.body.content;
    const obj = {'userId': postId ,'content': content};
    await Comment.create( obj )
        .then( async () => {
            await Comment.read()
                .then( ( comments ) => {
                    res.status( 200 ).json( comments );
                } );
        } );
}


async function updateComment(req, res) {
    const id = req.params.id;
    const obj = req.body;
    const comment = await Comment.update( id, obj );
    res.status( 201 ).json( comment );
}

async function deleteComment(req, res) {
    let id = req.params.id;
    await Comment.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}


module.exports = router;