import express from "express";
import methodOverride from "method-override";
import Research from "../../models/research.model.js";
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



router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await Research.find({});
      res.render("admin/research/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Research(data);
      await newData.save();
      res.redirect("/admin/research");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/new").get(async (_, res) => {
  res.render("admin/research/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Research.findById(id);
    res.render("admin/research/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Research.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/research");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Research.findByIdAndDelete(id);
      res.redirect("/admin/research");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



  export default router;