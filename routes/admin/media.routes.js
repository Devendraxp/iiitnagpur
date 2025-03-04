import express from "express";
import Image from "../../models/imageSchema.js";
import methodOverride from "method-override";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import path from "path";
import fs from "fs/promises";

const router = express.Router();
const PORT = 8080;

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/files", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

cloudinary.config({ 
  cloud_name: "dax4biuwf", 
  api_key: "594819599221772", 
  api_secret: 'bbse-W-pQkjCoxpq32yxpFUzaVM'
});

router
  .route("/")
  .get(async (_, res) => {
    const data = await Image.find({});
    res.render("admin/media/index.ejs", { data });
  })
  .post(upload.single("file"), async (req, res) => {
    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'iiitn',
        resource_type: 'auto'
      });

      // Create new image record
      const image = new Image({
        title: req.body.title,
        filename: result.public_id,
        path: result.secure_url,
        imageUrl: result.secure_url,
      });

      await image.save();
      res.redirect("/admin/media");
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ error: error.message });
    } finally {
      // Clean up local file
      if (req.file) {
        try {
          await fs.unlink(req.file.path);
          console.log("Local file removed");
        } catch (err) {
          console.error("Error removing local file:", err);
        }
      }
    }
  });

router.route("/new").get(async (_, res) => {
  res.render("admin/media/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Image.findById(id);
      res.render("admin/media/update.ejs", { data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .patch(upload.single("file"), async (req, res) => {
    const { id } = req.params;
    try {
      let updateData = {
        title: req.body.title,
      };

      if (req.file) {
        // Upload new file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'iiitn',
          resource_type: 'auto'
        });

        updateData.filename = result.public_id;
        updateData.path = result.secure_url;
        updateData.imageUrl = result.secure_url;

        // Remove old image from Cloudinary
        const oldImage = await Image.findById(id);
        if (oldImage && oldImage.filename) {
          await cloudinary.uploader.destroy(oldImage.filename);
        }
      }

      // Update the image record
      await Image.findByIdAndUpdate(id, updateData, { new: true });

      res.redirect("/admin/media");
    } catch (error) {
      console.error("Update failed:", error);
      res.status(500).json({ error: error.message });
    } finally {
      // Clean up local file
      if (req.file) {
        try {
          await fs.unlink(req.file.path);
          console.log("Local file removed");
        } catch (err) {
          console.error("Error removing local file:", err);
        }
      }
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const image = await Image.findById(id);
      if (image) {
        // Delete from Cloudinary
        if (image.filename) {
          await cloudinary.uploader.destroy(image.filename);
          console.log("Image removed from Cloudinary");
        }

        // Delete local file (if it exists)
        const filePath = `uploads/${image.filename}`;
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
          console.log("Local file removed");
        } catch (err) {
          console.log("Local file does not exist, continuing with deletion");
        }

        // Delete from database
        await Image.findByIdAndDelete(id);
      }

      res.redirect("/admin/media");
    } catch (error) {
      console.error("Delete failed:", error);
      res.status(500).json({ error: error.message });
    }
  });

export default router;
