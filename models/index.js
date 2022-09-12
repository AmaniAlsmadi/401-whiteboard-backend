'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model.js');

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


module.exports ={
    db: sequelize,
    Post: post(sequelize, DataTypes)
} 