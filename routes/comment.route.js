'use strict';

const express = require('express');
const router = express.Router();
const { Comment } = require('../models/index.js');
const bearerAuth = require('../middleware/bearer-auth');


router.get('/comment', getComment);
router.post('/comment/:id', createComment);
router.put('/comment/:id', bearerAuth, updateComment);
router.delete('/comment/:id', bearerAuth , deleteComment);


async function getComment(req, res) {
    const comment = await Comment.read();
    res.status(200).json({
        comment
    });
}

async function createComment(req, res) {
    const obj = req.body;
    const comment =await Comment.create(obj);
    res.status(200).json(comment);
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