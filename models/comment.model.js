'use strict';

const comment = (sequelize, DataTypes) => sequelize.define('comment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = comment;