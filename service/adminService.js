const { Charity } = require("../models/centralized");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  loginAdmin: async (password) => {
    try {
      const match = await bcrypt.compare(
        password,
        process.env.CHARITY_ADMIN_KEY
      );
      if (!match) {
        throw new Error("Invalid Password");
      }

      // generate token for client
      const token = jwt.sign(
        { adminId: process.env.CHARITY_ADMIN_ID, role: "admin" },
        process.env.JWT_SECRET_KEY
      );
    
      return token;
    } catch (err) {
      throw err;
    }
  },
  getAllOrganisations: async () => {
    try {
      return await Charity.findAll();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  deleteOrganisation: async (id) => {
    try {
      return await Charity.destroy({ where: { id } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  updateOrganisationStatus: async (status,id) => {
    try {
      return await Charity.update({ status }, { where: { id } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
