'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model.js');
const comment = require('./comment.model.js');
const collection = require('../collections/user-comment-routes.js');

const DATABASE_URL = process.env.DATABASE_URL || process.env.HEROKU_POSTGRESQL_BROWN_URL ;

/*const sequelizeOptions = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};*/

let sequelize = new Sequelize(DATABASE_URL);
const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize,DataTypes);

postModel.hasMany(commentModel, {foreignKey: 'userId', sourceKey: 'id'}) 
commentModel.belongsTo(postModel, {foreignKey: 'userId', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);

module.exports ={
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    CommentModel: commentModel
} 
