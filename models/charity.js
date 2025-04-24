const {sequelize,DataTypes} = require('../config/db');

const Charity = sequelize.define(
    'charity',
    {
      // Model attributes are defined here
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,  
          primaryKey: true,     
        },
      charityname: {
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
      
      location:{
        type :DataTypes.STRING,
        allowNull: false,
      },
      info:{
        type :DataTypes.STRING,
        allowNull: true,
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
  
  module.exports =Charity;
