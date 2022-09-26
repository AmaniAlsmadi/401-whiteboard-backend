'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model.js');
const comment = require('./comment.model.js');
const collection = require('../collections/user-comment-routes.js');
const   User = require('../user.model.js');
const DATABASE_URL = process.env.DATABASE_URL || process.env.HEROKU_POSTGRESQL_BROWN_URL ;

const sequelizeOptions = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

sequelize.authenticate().then(() => {
    console.log('Database connected to postgres successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
})

const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize,DataTypes);
const userModel =User(sequelize, DataTypes);

postModel.hasMany(commentModel, {foreignKey: 'userId', sourceKey: 'id'}) 
commentModel.belongsTo(postModel, {foreignKey: 'userId', targetKey: 'id'})

userModel.hasMany(postModel, {foreignKey: 'ownerId', sourceKey: 'id'})
postModel.belongsTo(userModel, {foreignKey: 'ownerId', sourceKey: 'id'}) 

userModel.hasMany(commentModel, {foreignKey: 'ownerId', sourceKey: 'id'}) 
commentModel.belongsTo(userModel, {foreignKey: 'ownerId', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);

module.exports ={
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    CommentModel: commentModel,
    UserModel: userModel
} 
