'use stricte';

const express = require('express');
const cors = require('cors');
const app = express();

const postRouter = require('./routes/post.route.js');
const commentRouter = require('./routes/comment.route.js');

app.use(cors());
app.use(express.json());
app.use(postRouter);
app.use(commentRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        'message': 'Hello World',
        'code': '200'
    })
});


function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });
}

module.exports = {
    start,
    app
};