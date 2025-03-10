import express from "express";
const router = express.Router();

import Faculty from "../../models/faculty.model.js";
import DeptAchievement from "../../models/department/deptAchievement.model.js";
import DeptEvents from "../../models/department/deptEvents.model.js";
import DeptProject from "../../models/department/deptProject.model.js";
import AreaOfSpecialization from "../../models/research/areaOfSpecialization.model.js";
import PublicationArea from "../../models/research/publicationArea.model.js";
import ResearchArea from "../../models/research/researchArea.model.js";
import ResearchField from "../../models/research/researchField.model.js";
import Patent from "../../models/research/patent.model.js";
import Publication from "../../models/research/publication.model.js";

router.route("/").get((_, res) => {
    res.redirect("/ece/aboutDepartment");
  });

router.route("/aboutDepartment").get((_, res) => {
  res.render("ece/about-department.ejs");
});

router.route("/achievements").get(async (_, res) => {
  const data = await DeptAchievement.find({ department: "ece" });
  res.render("ece/achievements.ejs", { data });
});
router.route("/bos").get((_, res) => {
  res.render("ece/bos.ejs");
});
router.route("/events").get(async(_, res) => {
  const data = await DeptEvents.find({ department: "ece" });
  res.render("ece/events.ejs", {data});
});
router.route("/faculty").get(async (_, res) => {
  const data = await Faculty.find({ department: "ece" });
  res.render("ece/faculty.ejs", { data });
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

    res.render("ece/Profile.ejs", { faculty });
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).render("error.ejs", { message: "Internal server error" });
  }
});

router.route("/laboratory").get((_, res) => {
  res.render("ece/laboratory.ejs");
});

router.route("/projects").get(async (_, res) => {
  try {
      const ongoingProjects = await DeptProject.find({ 
          department: "ece", 
          typeOfProject: "Ongoing" 
      });

      const completedProjects = await DeptProject.find({ 
          department: "ece", 
          typeOfProject: "Completed" 
      });

      res.render("ece/projects", { ongoingProjects, completedProjects });  // Correct key-value mapping
  } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).send("Server error");
  }
});

router.route("/research").get(async (_, res) => {
  try {
    // Fetch areas of specialization for ECE
    const areasOfSpecialization = await AreaOfSpecialization.find({ department: "ece" });
    
    // Fetch publication areas - we need ALL of them
    const publicationAreas = await PublicationArea.find({ department: "ece" });
    
    // Fetch research areas
    const researchAreas = await ResearchArea.find({ department: "ece" });
    
    // Fetch research fields - we need ALL of them
    const researchFields = await ResearchField.find({ department: "ece" });
    
    // Fetch patents
    const patents = await Patent.find({ department: "ece" });
    
    // Fetch all publications
    const allPublications = await Publication.find({ department: "ece" }).sort({ year: -1 });
    
    // Group publications by type
    const publications = {
      bookChapters: allPublications.filter(pub => pub.type === "bookChapter"),
      conferencePapers: allPublications.filter(pub => pub.type === "confrencePaper"), // Note: there's a typo in the model
      journals: allPublications.filter(pub => pub.type === "journal")
    };
    
    // Group publications by year for each type
    const publicationsByYear = {
      bookChapters: groupPublicationsByYear(publications.bookChapters),
      conferencePapers: groupPublicationsByYear(publications.conferencePapers), 
      journals: groupPublicationsByYear(publications.journals)
    };

    res.render("ece/research.ejs", { 
      areasOfSpecialization,
      publicationAreas,
      researchAreas,
      researchFields,
      patents,
      publicationsByYear
    });
  } catch (err) {
    console.error("Error loading ECE research data:", err);
    res.status(500).render("error.ejs", { message: "Server Error loading research data" });
  }
});

// Helper function to group publications by year
function groupPublicationsByYear(publications) {
  const groupedByYear = {};
  
  publications.forEach(pub => {
    if (!groupedByYear[pub.year]) {
      groupedByYear[pub.year] = [];
    }
    groupedByYear[pub.year].push(pub);
  });
  
  // Sort years in descending order (newest first)
  return Object.keys(groupedByYear)
    .sort((a, b) => b - a)
    .reduce((result, year) => {
      result[year] = groupedByYear[year];
      return result;
    }, {});
}

router.route("/staff").get((_, res) => {
  res.render("cse/staff.ejs");
});
export default router;
