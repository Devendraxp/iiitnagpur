import express from "express";
import methodOverride from "method-override";
import ResearchField from "../../../models/research/researchField.model.js";

const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router
  .route("/")
  .get(async (_, res) => {
    try {
      const researchFields = await ResearchField.find({});
      res.render("admin/departmentResearch/researchField/index.ejs", { data: researchFields });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { department, description } = req.body;
      const formattedDescription = description
        .split("\n")
        .map(line => line.trim())
        .filter(line => line);

      const newResearchField = new ResearchField({
        department,
        description: formattedDescription,
      });

      await newResearchField.save();
      res.redirect("/admin/departmentResearch/researchField");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/new").get((_, res) => {
  res.render("admin/departmentResearch/researchField/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const result = await ResearchField.findById(id);
      if (!result) {
        return res.status(404).send("Research Field not found");
      }

      const descriptionText = result.description ? result.description.join("\n") : "";
      res.render("admin/departmentResearch/researchField/update.ejs", { result, descriptionText });
    } catch (error) {
      console.error("Error fetching research field:", error);
      res.status(500).send("Server error while fetching the research field");
    }
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { department, description } = req.body;

    try {
      const formattedDescription = description
        .split("\n")
        .map(line => line.trim())
        .filter(line => line);

      const updatedResearchField = await ResearchField.findByIdAndUpdate(
        id,
        { department, description: formattedDescription },
        { new: true }
      );

      if (!updatedResearchField) {
        return res.status(404).send("Research Field not found or update failed");
      }

      res.redirect("/admin/departmentResearch/researchField");
    } catch (error) {
      console.error("Error updating research field:", error);
      res.status(500).json({ error: "Server error while updating the research field" });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await ResearchField.findByIdAndDelete(id);
      res.redirect("/admin/departmentResearch/researchField");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;