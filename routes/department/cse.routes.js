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
    res.redirect("/cse/aboutDepartment");
  });

router.route("/aboutDepartment").get((_, res) => {
  res.render("cse/about-department.ejs");
});

router.route("/achievements").get(async (_, res) => {
  const data = await DeptAchievement.find({ department: "cse" });
  res.render("cse/achievements.ejs", { data });
});
router.route("/bos").get((_, res) => {
  res.render("cse/bos.ejs");
});
router.route("/events").get(async(_, res) => {
  const data = await DeptEvents.find({ department: "cse" });
  res.render("cse/events.ejs", {data});
});
router.route("/faculty").get(async (_, res) => {
  const data = await Faculty.find({ department: "cse" });
  res.render("cse/faculty.ejs", { data });
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

    res.render("cse/Profile.ejs", { faculty });
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).render("error.ejs", { message: "Internal server error" });
  }
});

router.route("/laboratory").get((_, res) => {
  res.render("cse/laboratory.ejs");
});

router.route("/projects").get(async (_, res) => {
  try {
      const ongoingProjects = await DeptProject.find({ 
          department: "cse", 
          typeOfProject: "Ongoing" 
      });

      const completedProjects = await DeptProject.find({ 
          department: "cse", 
          typeOfProject: "Completed" 
      });

      res.render("cse/projects", { ongoingProjects, completedProjects });  // Correct key-value mapping
  } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).send("Server error");
  }
});

router.route("/research").get(async (_, res) => {
  try {
    // Fetch areas of specialization for CSE
    const areasOfSpecialization = await AreaOfSpecialization.find({ department: "cse" });
    
    // Fetch publication areas - we need ALL of them
    const publicationAreas = await PublicationArea.find({ department: "cse" });
    
    // Fetch research areas
    const researchAreas = await ResearchArea.find({ department: "cse" });
    
    // Fetch research fields - we need ALL of them
    const researchFields = await ResearchField.find({ department: "cse" });
    
    // Fetch patents
    const patents = await Patent.find({ department: "cse" });
    
    // Fetch all publications
    const allPublications = await Publication.find({ department: "cse" }).sort({ year: -1 });
    
    // Group publications by type
    const publications = {
      bookChapters: allPublications.filter(pub => pub.type === "bookChapter"),
      conferencePapers: allPublications.filter(pub => pub.type === "confrencePaper"), // Note: there's a typo in the model "confrence"
      journals: allPublications.filter(pub => pub.type === "journal")
    };
    
    // Group publications by year for each type
    const publicationsByYear = {
      bookChapters: groupPublicationsByYear(publications.bookChapters),
      conferencePapers: groupPublicationsByYear(publications.conferencePapers), 
      journals: groupPublicationsByYear(publications.journals)
    };

    res.render("cse/research.ejs", { 
      areasOfSpecialization,
      publicationAreas,
      researchAreas,
      researchFields,
      patents,
      publicationsByYear
    });
  } catch (err) {
    console.error("Error loading CSE research data:", err);
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
