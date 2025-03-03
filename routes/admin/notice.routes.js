router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await Notice.find({});
      res.render("admin/notice/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Notice(data);
      await newData.save();
      res.redirect("/admin/notice");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/new").get(async (_, res) => {
  res.render("admin/notice/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Notice.findById(id);
    res.render("admin/notice/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Notice.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/notice");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Notice.findByIdAndDelete(id);
      res.redirect("/admin/notice");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
