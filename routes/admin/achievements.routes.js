
router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await Achievement.find({});
      res.render("admin/achievements/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Achievement(data);
      await newData.save();
      res.redirect("/admin/achievements");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/new").get(async (_, res) => {
  res.render("admin/achievements/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Achievement.findById(id);
    res.render("admin/achievements/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Achievement.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/achievements");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }).delete(async (req, res) => {
  const { id } = req.params;
  try {
    await Achievement.findByIdAndDelete(id);
    res.redirect("/admin/achievements");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});