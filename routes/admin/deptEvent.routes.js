import express from "express";
import DeptEvents from "../../models/department/deptEvents.model.js";

const router = express.Router();

// Root route - get all events
router
  .route("/")
  .get(async (req, res) => {
    try {
      const events = await DeptEvents.find();
      res.render("admin/deptEvent/index", { data: events });
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Failed to load department events." });
    }
  })
  .post(async (req, res) => {
    try {
      let { year, description, department } = req.body;

      if (!year || !description || !department) {
        return res
          .status(400)
          .send("All fields (year, description, department) are required.");
      }

      // Convert description into an array of strings
      description = Array.isArray(description)
        ? description.filter((line) => line.trim() !== "")
        : description
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

      const newEvent = new DeptEvents({
        year,
        description,
        department,
      });

      await newEvent.save();
      res.redirect("/admin/deptEvent");
    } catch (error) {
      console.error("Error saving event:", error);
      res.status(500).json({ error: "Failed to save department event." });
    }
  });

// New event routes
router.route("/new").get((req, res) => {
  res.render("admin/deptEvent/new");
});

// Edit routes
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const event = await DeptEvents.findById(id);
      res.render("admin/deptEvent/edit", { event });
    } catch (error) {
      console.error("Error loading events for editing:", error);
      res.status(500).json({ error: "Failed to load events for editing." });
    }
  })
  .post(async (req, res) => {
    const { id } = req.params;
    try {
      let { year, description, department } = req.body;

      // Ensure description is stored as an array
      description = Array.isArray(description)
        ? description.filter((line) => line.trim() !== "")
        : description
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

      await DeptEvents.findByIdAndUpdate(
        id,
        { year, description, department },
        { new: true }
      );

      res.redirect("/admin/deptEvent");
    } catch (error) {
      console.error("Error updating Event:", error);
      res.status(500).json({ error: "Failed to update Event." });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await DeptEvents.findByIdAndDelete(id);
      res.redirect("/admin/deptEvent");
    } catch (error) {
      console.error("Error deleting department Event:", error);
      res.status(500).json({ error: "Failed to delete department Event." });
    }
  });

export default router;
