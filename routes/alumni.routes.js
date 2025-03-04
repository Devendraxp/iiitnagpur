import express from "express";
const router = express.Router();

router.route("/aboutUs").get((_, res) => {
  res.render("Alumni/AboutUs.ejs");
});

router.route("/member").get((_, res) => {
  res.render("Alumni/Member.ejs");
});
router.route("/memberLogin").get((_, res) => {
  res.render("Alumni/MemberLogin.ejs");
});

export default router;
