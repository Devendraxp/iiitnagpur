router
  .route("/")
  .get(async (_, res) => {
    const data = await Image.find({});
    res.render("admin/media/index.ejs", { data });
  })
  .post(upload.single("file"), async (req, res) => {
    const image = new Image({
      title: req.body.title,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      imageUrl: `http://localhost:${PORT}/files/${req.file.filename}`,
    });
    await image.save();
    res.redirect("/admin/media");
  });

router.route("/media/new").get(async (_, res) => {
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
      const updateData = {
        title: req.body.title,
      };

      if (req.file) {
        updateData.filename = req.file.filename;
        updateData.path = `/uploads/${req.file.filename}`;
        updateData.imageUrl = `http://localhost:${PORT}/files/${req.file.filename}`;
      }

      await Image.findByIdAndUpdate(id, updateData, { new: true });
      res.redirect("/admin/media");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const image = await Image.findById(id);
      if (image && image.filename) {
        // Delete file from uploads folder
        const fs = await import("fs/promises");
        const filePath = `uploads/${image.filename}`;
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
        } catch (err) {
          console.log("File does not exist, continuing with deletion");
        }
        // Delete from database
        await Image.findByIdAndDelete(id);
      }
      res.redirect("/admin/media");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
