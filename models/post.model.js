'use strict';

const post = (sequelize, DataTypes) => sequelize.define('post', {
    title: {
        type: DataTypes.STRING,
        defaultValue: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = post;
    
