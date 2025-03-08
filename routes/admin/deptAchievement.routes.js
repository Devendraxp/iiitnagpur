import express from "express";
import DeptAchievement from "../../models/department/deptAchievement.model.js";

const router = express.Router();

// Root route - get all achievements
router
    .route("/")
    .get(async (req, res) => {
        try {
            const achievements = await DeptAchievement.find();
            res.render("admin/deptAchievement/index", { data: achievements });
        } catch (error) {
            console.error("Error fetching achievements:", error);
            res.status(500).json({ error: "Failed to load department achievements." });
        }
    })
    .post(async (req, res) => {
        try {
            let { title, year, description, department } = req.body;

            if (!title || !year || !description || !department) {
                return res
                    .status(400)
                    .send("All fields (title, year, description, department) are required.");
            }

            // Convert description to an array (handles multiline input)
            description = Array.isArray(description)
                ? description.filter((line) => line.trim() !== "")
                : description
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean);

            const newData = new DeptAchievement({
                title,
                year,
                description,
                department
            });

            await newData.save();
            res.redirect("/admin/deptAchievement");
        } catch (error) {
            console.error("Error saving achievement:", error);
            res.status(500).json({ error: "Failed to save department achievement." });
        }
    });

// New achievement routes
router.route("/new").get((req, res) => {
    res.render("admin/deptAchievement/new");
});

// Edit routes
router
    .route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const achievement = await DeptAchievement.findById(id);
            
            if (!achievement) {
                return res.status(404).json({ error: "Achievement not found." });
            }
            
            res.render("admin/deptAchievement/update", { achievement });
        } catch (error) {
            console.error("Error loading achievement for editing:", error);
            res.status(500).json({ error: "Failed to load achievement for editing." });
        }
    })
    .post(async (req, res) => {
        const { id } = req.params;
        try {
            let { title, year, description, department } = req.body;

            // Ensure description is stored as an array
            description = Array.isArray(description)
                ? description.filter((line) => line.trim() !== "")
                : description
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean);

            const updatedAchievement = await DeptAchievement.findByIdAndUpdate(
                id,
                { title, year, description, department },
                { new: true, runValidators: true }
            );

            if (!updatedAchievement) {
                return res.status(404).json({ error: "Achievement not found." });
            }

            res.redirect("/admin/deptAchievement");
        } catch (error) {
            console.error("Error updating achievement:", error);
            res.status(500).json({ error: "Failed to update achievement." });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const deletedAchievement = await DeptAchievement.findByIdAndDelete(id);

            if (!deletedAchievement) {
                return res.status(404).json({ error: "Achievement not found." });
            }

            res.redirect("/admin/deptAchievement");
        } catch (error) {
            console.error("Error deleting department achievement:", error);
            res.status(500).json({ error: "Failed to delete department achievement." });
        }
    });

export default router;