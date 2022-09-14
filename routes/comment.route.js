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
    const newComment = req.body;
    const comment =await Comment.create(newComment);
    res.status(200).json(comment);
}


async function updateComment(req, res) {
    const id = req.params.id;
    const obj = req.body;
    const comment = await Comment.read(id);
    const updatedComment = await Comment.update(obj);
    res.status(201).json(updatedComment);
}

async function deleteComment(req, res) {
    let id = req.params.id;
    let deleteComment = await Comment.destroy({
        where: {id: id}
    });
    res.status(204).json({  Message: 'Comment deleted' });
}


module.exports = router;