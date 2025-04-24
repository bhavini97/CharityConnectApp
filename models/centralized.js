const User = require('./user');
const Order = require('./order');
const Charity = require('./charity');
const CharityProjects = require('./charityProjects');
const UserFileDownload = require('./userfileDownload');
const {sequelize}  = require('../config/db');

// one order can have one user and one user can have many order
Order.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Order, { foreignKey: "user_id", onDelete: "CASCADE" });

// one order can have one charity_id and one charity project can have many order
Order.belongsTo(Charity, { foreignKey: "charity_id", onDelete: "CASCADE" });
Charity.hasMany(Order, { foreignKey: "charity_id", onDelete: "CASCADE" });

  // one charity organisation can have many projects and one project can have one charity id
  CharityProjects.belongsTo(Charity, { foreignKey: "charity_id", onDelete: "CASCADE" });
Charity.hasMany(CharityProjects, { foreignKey: "charity_id", onDelete: "CASCADE" });

UserFileDownload.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(UserFileDownload, { foreignKey: "userId", onDelete: "CASCADE" });

  
  const syncDB = async()=>{
    try{
        await sequelize.authenticate();
        console.log(' Database connection established');

        // Sync models
        await sequelize.sync({ alter: true });


        console.log(' All tables synchronized');

    }
    catch(err){

        console.error('Error syncing database:', err);
    }
} 


module.exports={
    User, Order,Charity,CharityProjects,UserFileDownload,syncDB
}


  