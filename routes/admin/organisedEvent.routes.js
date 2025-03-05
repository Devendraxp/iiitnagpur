import express from "express";
import methodOverride from "method-override";
import OrganizedEvent from "../../models/organisedEvent.model.js";
const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/files", express.static("uploads"));

router
    .route("/")
    .get(async (req, res) => {
        try {
            const result = await OrganizedEvent.find({});
            res.render("admin/organisedEvent/index.ejs", { data: result });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })
    .post(async (req, res) => {
        try {
            const { data } = req.body;
            
            // Process images if provided
            if (data.images) {
                data.images = data.images.split(',').map(url => url.trim()).filter(url => url);
            } else {
                data.images = [];
            }
            
            const newData = new OrganizedEvent(data);
            await newData.save();
            res.redirect("/admin/organisedEvent");
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });

router.route("/new").get(async (_, res) => {
    res.render("admin/organisedEvent/new.ejs", {
        eventOptions: ["tantrafiesta", "abhivyakti", "esummit", "selfhosted"],
        clubOptions: ["dotslash", "elevate", "strokes", "iotics", "dimensions", "udyam", 
            "crispr", "crescendo", "dtraxia", "estoria", "orator", "probe", "eklavya", "selfhosted"]
    });
});

router
    .route("/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        const result = await OrganizedEvent.findById(id);
        res.render("admin/organisedEvent/update.ejs", { 
            data: result,
            eventOptions: ["tantrafiesta", "abhivyakti", "esummit", "selfhosted"],
            clubOptions: ["dotslash", "elevate", "strokes", "iotics", "dimensions", "udyam", 
                "crispr", "crescendo", "dtraxia", "estoria", "orator", "probe", "eklavya", "selfhosted"]
        });
    })
    .patch(async (req, res) => {
        const { id } = req.params;
        const { data } = req.body;
        
        try {
            // Process images if provided
            if (data.images) {
                data.images = data.images.split(',').map(url => url.trim()).filter(url => url);
            }
            
            await OrganizedEvent.findByIdAndUpdate(id, data, { new: true });
            res.redirect("/admin/organisedEvent");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            await OrganizedEvent.findByIdAndDelete(id);
            res.redirect("/admin/organisedEvent");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

export default router;
