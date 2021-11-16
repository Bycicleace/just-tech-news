const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

// Creat User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            // beforeCreate(userData) {
            //     return bcrypt.hash(userData.password, 10).then(newUserData => {
            //         return newUserData;
            //     });
            // }
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,                  // pass in our imported sequelize connection
        timestamps: false,          // don't automatically create createdAt/updatedAt timestamp fields
        freezeTableName: true,      // don't pluralize name of db table
        underscored: true,          // use underscore instead of CamelCase
        modelName: 'user'           // make it so the model name stays lowercase in the DB
    }
);

module.exports = User;