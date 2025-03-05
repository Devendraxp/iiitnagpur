import express from "express";
import methodOverride from "method-override";
import Club from "../../models/club.model.js";
const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/files", express.static("uploads"));

router
    .route("/")
    .get(async (req, res) => {
        try {
            const result = await Club.find({});
            res.render("admin/club/index.ejs", { data: result });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })
    .post(async (req, res) => {
        try {
            // Process the form data directly
            const clubData = {
                title: req.body.title,
                description: req.body.description,
                logo: req.body.logo,
                Lead: req.body.Lead,
                category: req.body.category,
                yearlyPlans: req.body.yearlyPlans || [],
                images: req.body.images ? req.body.images.split(',').map(url => url.trim()) : [],
                brochure: req.body.brochure
            };
            
            const newClub = new Club(clubData);
            await newClub.save();
            res.redirect("/admin/club");
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });

router.route("/new").get(async (_, res) => {
    res.render("admin/club/new.ejs");
});

router
    .route("/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        const result = await Club.findById(id);
        res.render("admin/club/update.ejs", { data: result });
    })
    .patch(async (req, res) => {
        const { id } = req.params;
        try {
            // Process the form data directly
            const clubData = {
                title: req.body.title,
                description: req.body.description,
                logo: req.body.logo,
                Lead: req.body.Lead,
                category: req.body.category,
                yearlyPlans: req.body.yearlyPlans || [],
                images: req.body.images ? req.body.images.split(',').map(url => url.trim()) : [],
                brochure: req.body.brochure
            };
            
            await Club.findByIdAndUpdate(id, clubData, { new: true });
            res.redirect("/admin/club");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            await Club.findByIdAndDelete(id);
            res.redirect("/admin/club");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

export default router;
