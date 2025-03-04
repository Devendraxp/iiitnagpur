import express from "express";
const router = express.Router();

router.route("/btech").get((_, res) => {
  res.render("Program/BTECH.ejs");
});

router.route("/curriculum").get((_, res) => {
  res.render("Program/curriculum.ejs");
});

router.route("/mtech").get((_, res) => {
  res.render("Program/MTech.ejs");
});

router.route("/pgDiploma").get((_, res) => {
  res.render("Program/PgDiploma.ejs");
});

router.route("/phd").get((_, res) => {
    res.render("Program/PHD.ejs");
  });

  router.route("/reports").get((_, res) => {
    res.render("Program/reports.ejs");
  });

  export default router;

