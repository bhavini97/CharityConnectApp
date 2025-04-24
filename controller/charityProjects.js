const charityProject = require("../service/charityProjects");

module.exports = {
  addNewProject: async (req, res) => {
    const id = req.user.orgId;
    const role = req.user.role;
    console.log(id);
    if (role !== "charity") {
      return res.status(400).json({ message: "you are unauthorized" });
    }
    const { name, category, goal } = req.body;

    if (!name || !category || !goal) {
      return res
        .status(401)
        .json({
          message: "name,category and goal are required to create new project",
        });
    }

    try {
      const result = await charityProject.addNewProject(
        id,
        name,
        category,
        goal
      );
      return res.status(200).json({ message: "new project added" });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "could not add project" });
    }
  },

  findAllProjects: async (req, res) => {
    const id = req.user.orgId;
    const role = req.user.role;

    if (role !== "charity") {
      return res.status(401).json({ message: "You are not authorized" });
    }
    try {
      const result = await charityProject.findAllProjects(id);
      console.log(result);
      return res.status(200).json({ message: "projects data", result });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "could not find any project" });
    }
  },

  searchProjects: async (req, res) => {
    try {
      const { q = "", page = 1, limit = 3 } = req.query;

      const { count, projects } = await charityProject.searchProjects(
        q,
        page,
        limit
      );

      res.json({
        projects,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      console.error("Error searching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  },

  charityProfile: async (req, res) => {
    const orgId = req.user.orgId;
    console.log("ORG ID:", req.user);

    try {
      const result = await charityProject.getCharityDetails(orgId);
      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Organisation not fetched" });
    }
  },

  updateCharityDetails: async (req, res) => {
    const orgId = req.user.orgId;
    const { charityName, email,location,info } = req.body;

    try {
      await charityProject.updateCharityDetails(orgId, charityName, email,location,info);
      return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to update user" });
    }
  },
};
