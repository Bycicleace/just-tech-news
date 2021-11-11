const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Creat User model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        // TABLE COLUMN DEFS HERE

        id: {
            type: DataTypes.INTEGER,    // Uses the special DataTypes to provide what data type it is
            allowNull: false,           // same as NOT NULL in SQL
            primaryKey: true,           // same as PRIMARY KEY in SQL
            autoIncrement: true         // same as AUTO_INCREMENT in SQL
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    },
    {
        // TABLE CONIF OPTIONS HERE

        sequelize,                  // pass in our imported sequelize connection
        timestamps: false,          // don't automatically create createdAt/updatedAt timestamp fields
        freezeTableName: true,      // don't pluralize name of db table
        underscored: true,          // use underscore instead of CamelCase
        modelName: 'user'           // make it so the model name stays lowercase in the DB
    }
);

module.exports = User;