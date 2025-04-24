const { CharityProjects, Charity } = require("../models/centralized");
const { Op } = require("sequelize");

module.exports = {
  addNewProject: async (id, name, category, goal) => {
    try {
      const [project, created] = await CharityProjects.findOrCreate({
        where: { projectName: name },
        defaults: {
          charity_id: id,
          projectName: name,
          category: category,
          goal: goal,
        },
      });
      if (!created) {
        throw new Error("a project with similar name already exists");
      }
      return project;
    } catch (err) {
      throw err;
    }
  },
  findAllProjects: async (id) => {
    try {
      const result = await CharityProjects.findAll({
        where: { charity_id: id },
      });
      if (result.length == 0) {
        throw new Error("No Projects Found");
      }
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  searchProjects: async (query, page, limit) => {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    try {
      const whereClause = query
        ? {
            [Op.or]: [
              { projectName: { [Op.like]: `%${query}%` } },
              { category: { [Op.like]: `%${query}%` } },
            ],
          }
        : {};

      const { count, rows: projects } = await CharityProjects.findAndCountAll({
        where: whereClause,
        offset,
        limit: parseInt(limit),
      });

      return { count, projects };
    } catch (err) {
      throw err;
    }
  },
  getCharityDetails: async(id)=>{
    try{
     const result = await Charity.findByPk(id);
     return result;

    }catch(err){
      throw err;
    }
 },

 updateCharityDetails : async (orgId, charityname, email,location,info) => {
     return await Charity.update({ charityname, email,location,info }, { where: { id: orgId } });
   },
};
