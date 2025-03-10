import express from "express";
const router = express.Router();

router.route("/achievements").get((_, res) => {
  res.render("student/achievements");
});

router.route("/activities").get((_, res) => {
  res.render("student/activities");
});

router.route("/clinical-counselling").get((_, res) => {
  res.render("student/clinical-counselling");
});

router.route("/convocation-2023").get((_, res) => {
  res.render("student/convocation-2023");
});

router.route("/download").get((_, res) => {
  res.render("student/download");
});

router.route("/fees").get((_, res) => {
  res.render("student/fees");
});

router.route("/hostel").get((_, res) => {
  res.render("student/hostel");
});

router.route("/student-mess").get((_, res) => {
  res.render("student/student-mess");
});

export default router;