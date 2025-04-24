const {sequelize,DataTypes} = require('../config/db');

const CharityProjects = sequelize.define(
    'charityproject',
    {
      // Model attributes are defined here
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,  
          primaryKey: true,     
        },
      charity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectName : {
        type: DataTypes.STRING,
        allowNull: false,
      },  
      category:{
        type :DataTypes.STRING,
         allowNull:true,
         defaultValue:'others'
      },
      goal:{
        type :DataTypes.STRING,
        allowNull: true,
      },
      charityCollected:{
        type :DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
      }
    
    },
    {
      // Other model options go here
      freezeTableName: true,
    },
  );
  
  module.exports =CharityProjects;
