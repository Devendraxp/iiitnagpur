import express from "express";
import methodOverride from "method-override";
import PublicationArea from "../../../models/research/publicationArea.model.js";

const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router
  .route("/")
  .get(async (_, res) => {
    try {
      const publicationAreas = await PublicationArea.find({});
      res.render("admin/departmentResearch/publicationArea/index.ejs", { data: publicationAreas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { department, description } = req.body;

      const formattedDescription = description
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

      const newPublicationArea = new PublicationArea({
        department,
        description: formattedDescription,
      });

      await newPublicationArea.save();
      res.redirect("/admin/departmentResearch/publicationArea");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/new").get((_, res) => {
  res.render("admin/departmentResearch/publicationArea/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const result = await PublicationArea.findById(id);
      if (!result) {
        return res.status(404).send("Publication Area not found");
      }

      const descriptionText = result.description ? result.description.join("\n") : "";

      res.render("admin/departmentResearch/publicationArea/update.ejs", { result, descriptionText });
    } catch (error) {
      console.error("Error fetching publication area:", error);
      res.status(500).send("Server error while fetching the publication area");
    }
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { department, description } = req.body;

    try {
      const formattedDescription = description
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

      const updatedPublicationArea = await PublicationArea.findByIdAndUpdate(
        id,
        { department, description: formattedDescription },
        { new: true }
      );

      if (!updatedPublicationArea) {
        return res.status(404).send("Publication Area not found or update failed");
      }

      res.redirect("/admin/departmentResearch/publicationArea");
    } catch (error) {
      console.error("Error updating publication area:", error);
      res.status(500).json({ error: "Server error while updating the publication area" });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await PublicationArea.findByIdAndDelete(id);
      res.redirect("/admin/departmentResearch/publicationArea");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
