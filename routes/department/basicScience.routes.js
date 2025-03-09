import express from "express";
const router = express.Router();

import Faculty from "../../models/faculty.model.js";
import DeptAchievement from "../../models/department/deptAchievement.model.js";
import DeptEvents from "../../models/department/deptEvents.model.js";
import DeptProject from "../../models/department/deptProject.model.js";
import AreaOfSpecialization from "../../models/research/areaOfSpecialization.model.js";
import Publication from "../../models/research/publication.model.js";
import ResearchArea from "../../models/research/researchArea.model.js";
import ResearchField from "../../models/research/researchField.model.js";
import PublicationArea from "../../models/research/publicationArea.model.js";
import Patent from "../../models/research/patent.model.js";

router.route("/").get((_, res) => {
    res.redirect("/basic_science/aboutDepartment");
  });

router.route("/aboutDepartment").get((_, res) => {
  res.render("basic_science/about-department.ejs");
});

router.route("/achievements").get(async (_, res) => {
  const data = await DeptAchievement.find({ department: "bs" });

  // Group achievements by year
  const achievementsByYear = {};
  data.forEach((achievement) => {
    if (!achievementsByYear[achievement.year]) {
      achievementsByYear[achievement.year] = [];
    }
    achievementsByYear[achievement.year].push(achievement);
  });

  // Sort years in descending order
  const sortedYears = Object.keys(achievementsByYear).sort((a, b) => b - a);

  res.render("basic_science/achievement.ejs", { achievementsByYear, sortedYears });
});

router.route("/bos").get((_, res) => {
  res.render("basic_science/bos.ejs");
});
router.route("/events").get(async(_, res) => {
  const data = await DeptEvents.find({ department: "bs" });
  res.render("basic_science/events.ejs", {data});
});
router.route("/faculty").get(async (_, res) => {
  const data = await Faculty.find({ department: "bs" });
  res.render("basic_science/faculty.ejs", { data });
});

router.route("/profile/:id").get(async (req, res) => {
  try {
    const facultyId = req.params.id;
    const faculty = await Faculty.findById(facultyId);

    if (!faculty) {
      return res
        .status(404)
        .render("error.ejs", { message: "Faculty not found" });
    }

    res.render("basic_science/Profile.ejs", { faculty });
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).render("error.ejs", { message: "Internal server error" });
  }
});

router.route("/laboratory").get((_, res) => {
  res.render("basic_science/laboratory.ejs");
});

router.route("/projects").get(async(_, res) => {
  const data = await DeptProject.find({ department: "bs" });
  res.render("basic_science/projects.ejs", {data});
});


router.route("/research").get(async (_, res) => {
  try {
    const areasOfSpecialization = await AreaOfSpecialization.find({ department: "bs" });
    const publications = await Publication.find({ department: "bs" });
    const researchAreas = await ResearchArea.find({ department: "bs" });
    const researchFields = await ResearchField.find({ department: "bs" });
    const publicationAreas = await PublicationArea.find({ department: "bs" });
    const patents = await Patent.find({ department: "bs" });

    console.log("Areas of Specialization:", areasOfSpecialization);
    console.log("Publications:", publications);
    console.log("Research Areas:", researchAreas);
    console.log("Research Fields:", researchFields);
    console.log("Publication Areas:", publicationAreas);
    console.log("Patents:", patents);

    res.render("basic_science/research.ejs", { 
      areasOfSpecialization, 
      publications,
      researchAreas,
      researchFields,
      publicationAreas,
      patents
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.route("/staff").get((_, res) => {
  res.render("basic_science/staff.ejs");
});

export default router;
