import express from "express";
const router = express.Router();

import Faculty from "../../models/faculty.model.js";
import DeptAchievement from "../../models/deptAchievement.model.js";
import DeptEvents from "../../models/deptEvents.model.js";
import DeptProject from "../../models/deptProject.model.js";

router.route("/").get((_, res) => {
    res.redirect("/basic_science/aboutDepartment");
  });

router.route("/aboutDepartment").get((_, res) => {
  res.render("basic_science/about-department.ejs");
});

router.route("/achievements").get(async (_, res) => {
  const data = await DeptAchievement.find({ department: "bs" });
  res.render("basic_science/achievements.ejs", { data });
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

router.route("/research").get((_, res) => {
  res.render("basic_science/staff.ejs");
});

export default router;
