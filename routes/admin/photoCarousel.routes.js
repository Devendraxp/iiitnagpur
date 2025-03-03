import express from "express";
import methodOverride from "method-override";
import PhotoCarousel from "../../models/photoCarousel.model.js";
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
  .get(async (_, res) => {
    try {
      const result = await PhotoCarousel.find({});
      res.render("admin/photoCarousel/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new PhotoCarousel(data);
      await newData.save();
      res.redirect("/admin/photoCarousel");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/new").get(async (_, res) => {
  res.render("admin/photoCarousel/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await PhotoCarousel.findById(id);
    res.render("admin/photoCarousel/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      const updatedCarousel = await PhotoCarousel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedCarousel) {
        return res.status(404).json({ error: "Photo carousel not found" });
      }
      res.redirect("/admin/photoCarousel");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCarousel = await PhotoCarousel.findByIdAndDelete(id);
      if (!deletedCarousel) {
        return res.status(404).json({ error: "Photo carousel not found" });
      }
      res.redirect("/admin/photoCarousel");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



  export default router;