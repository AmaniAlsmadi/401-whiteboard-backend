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
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        defaultValue: "userName"  
    }

});

module.exports = post;
    
