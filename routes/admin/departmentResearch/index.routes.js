import express from "express";
import methodOverride from "method-override";
import areaOfSpecializationRoutes from "./areaOfSpecialization.routes.js";

const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (_, res) => {
  res.render("admin/departmentResearch/index.ejs");
});

router.use("/areaOfSpecialization", areaOfSpecializationRoutes);

export default router;
