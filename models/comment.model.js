'use strict';

const comment = (sequelize, DataTypes) => sequelize.define('comment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ownername: {
        type: DataTypes.STRING,
        defaultValue: "ownerName"  

    }
});

module.exports = comment;