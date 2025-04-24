const {sequelize,DataTypes} = require('../config/db');

const User = sequelize.define(
    'users',
    {
      // Model attributes are defined here
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,  
          primaryKey: true,     
        },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
          type: DataTypes.STRING,
          allowNull: false,
      },
      totalCharity:{
        type :DataTypes.INTEGER,
        defaultValue: 0
      },
      status: { 
        type: DataTypes.ENUM("PENDING", "ACCEPT", "DECLINE"), 
        defaultValue: "PENDING" 
      }
    
    },
    {
      // Other model options go here
      freezeTableName: true,
    },
  );
  
  module.exports =User;
