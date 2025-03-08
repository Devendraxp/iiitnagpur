import express from "express";
import methodOverride from "method-override";
import areaOfSpecializationRoutes from "./areaOfSpecialization.routes.js";
import patent from "./patent.routes.js";
import publication from "./publication.routes.js"
import researchArea from "./researchArea.routes.js"
import researchField from "./researchField.routes.js"
import publicationArea from "./publicationArea.routes.js";

const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (_, res) => {
  res.render("admin/departmentResearch/index.ejs");
});



router.use("/areaOfSpecialization", areaOfSpecializationRoutes);
router.use("/patent",patent);
router.use("/publication",publication);
router.use("/researchArea",researchArea);
router.use("/researchField",researchField);
router.use("/publicationArea",publicationArea);

export default router;
