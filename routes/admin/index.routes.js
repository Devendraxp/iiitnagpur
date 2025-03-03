import express from "express";
import methodOverride from "method-override";
import achievementsRoute from "./achievements.routes.js";
import noticeRoute from "./notice.routes.js";
import notificationRoute from "./notification.routes.js";
import photoCarouselRoute from "./photoCarousel.routes.js";
import researchRoute from "./research.routes.js";
import studentTestimonialRoute from "./studentTestimonial.routes.js";
import facultyRoute from "./faculty.routes.js";
const router = express.Router();
const PORT = 8080;

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/files", express.static("uploads"));

router.use(methodOverride("_method"));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/files", express.static("uploads"));

router.get("/", (_, res) => {
  res.render("admin/index.ejs");
});

router.use("/achievements", achievementsRoute);
router.use("/notice", noticeRoute);
router.use("/notification", notificationRoute);
router.use("/photoCarousel", photoCarouselRoute);
router.use("/research", researchRoute);
router.use("/studentTestimonial", studentTestimonialRoute);
router.use("/faculty", facultyRoute);

export default router;