import express from "express";
import methodOverride from "method-override";
import Event from "../../models/event.model.js";
const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/files", express.static("uploads"));

router
    .route("/")
    .get(async (req, res) => {
        try {
            const result = await Event.find({});
            res.render("admin/event/index.ejs", { data: result });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })
    .post(async (req, res) => {
        try {
            const { data } = req.body;
            
            // Process comma-separated values into arrays
            if (data.guests && typeof data.guests === 'string') {
                data.guests = data.guests.split(',').map(guest => guest.trim()).filter(Boolean);
            }
            
            if (data.images && typeof data.images === 'string') {
                data.images = data.images.split(',').map(image => image.trim()).filter(Boolean);
            }
            
            if (data.brochure && typeof data.brochure === 'string') {
                data.brochure = data.brochure.split(',').map(url => url.trim()).filter(Boolean);
            }
            
            const newData = new Event(data);
            await newData.save();
            res.redirect("/admin/event");
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });

router.route("/new").get(async (_, res) => {
    res.render("admin/event/new.ejs");
});

router
    .route("/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        const result = await Event.findById(id);
        res.render("admin/event/update.ejs", { data: result });
    })
    .patch(async (req, res) => {
        const { id } = req.params;
        const { data } = req.body;
        
        try {
            // Process comma-separated values into arrays for PATCH requests too
            if (data.guests && typeof data.guests === 'string') {
                data.guests = data.guests.split(',').map(guest => guest.trim()).filter(Boolean);
            }
            
            if (data.images && typeof data.images === 'string') {
                data.images = data.images.split(',').map(image => image.trim()).filter(Boolean);
            }
            
            if (data.brochure && typeof data.brochure === 'string') {
                data.brochure = data.brochure.split(',').map(url => url.trim()).filter(Boolean);
            }
            
            await Event.findByIdAndUpdate(id, data, { new: true });
            res.redirect("/admin/event");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            await Event.findByIdAndDelete(id);
            res.redirect("/admin/event");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

export default router;
