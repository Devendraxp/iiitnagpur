import express from "express";
import DeptProject from "../../models/department/deptProject.model.js";

const router = express.Router();

// Root route - get all projects and handle creation
router
    .route("/")
    .get(async (req, res) => {
        try {
            const projects = await DeptProject.find();
            res.render("admin/deptProject/index", { data: projects });
        } catch (error) {
            console.error("Error fetching projects:", error);
            res.status(500).json({ error: "Failed to load department projects." });
        }
    })
    .post(async (req, res) => {
        try {
            const { typeOfProject, faculty, titleofProject, year, sponsoringAgency, fundingAmount, department } = req.body;

            if (!department) {
                return res.status(400).send("Department field is required.");
            }

            const newData = new DeptProject({
                faculty,
                titleofProject,
                year,
                sponsoringAgency,
                fundingAmount,
                department,  
                typeOfProject,
            });

            await newData.save();
            res.redirect("/admin/deptProject");
        } catch (error) {
            console.error("Error saving project:", error);
            res.status(500).json({ error: "Failed to save department project." });
        }
    });

// New project route (GET only)
router.route("/new").get((req, res) => {
    res.render("admin/deptProject/new");
});

// Edit, Update and Delete routes
router
    .route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const project = await DeptProject.findById(id);
            res.render("admin/deptProject/update", { project });
        } catch (error) {
            console.error("Error loading project for editing:", error);
            res.status(500).json({ error: "Failed to load project for editing." });
        }
    })
    .post(async (req, res) => {
        const { id } = req.params;
        try {
            await DeptProject.findByIdAndUpdate(id, req.body, { new: true });
            res.redirect("/admin/deptProject");
        } catch (error) {
            console.error("Error updating Project:", error);
            res.status(500).json({ error: "Failed to update Project." });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            await DeptProject.findByIdAndDelete(id);
            res.redirect("/admin/deptProject");
        } catch (error) {
            console.error("Error deleting department project:", error);
            res.status(500).json({ error: "Failed to delete department project." });
        }
    });

export default router;
