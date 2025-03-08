import express from "express";
import methodOverride from "method-override";
import AreaOfSpecialization from "../../../models/research/areaOfSpecialization.model.js";

const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router
  .route("/")
  .get(async (_, res) => {
    try {
      const result = await AreaOfSpecialization.find({});
      res.render("admin/departmentResearch/areaOfSpecialization/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new AreaOfSpecialization(data);
      await newData.save();
      res.redirect("/admin/departmentResearch/areaOfSpecialization");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/new").get(async (_, res) => {
  res.render("admin/departmentResearch/areaOfSpecialization/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await AreaOfSpecialization.findById(id);
    res.render("admin/departmentResearch/areaOfSpecialization/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await AreaOfSpecialization.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/departmentResearch/areaOfSpecialization");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await AreaOfSpecialization.findByIdAndDelete(id);
      res.redirect("/admin/departmentResearch/areaOfSpecialization");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
