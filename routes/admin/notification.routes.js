router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await Notification.find({});
      res.render("admin/notification/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Notification(data);
      await newData.save();
      res.redirect("/admin/notification");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/new").get(async (_, res) => {
  res.render("admin/notification/new.ejs");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Notification.findById(id);
    res.render("admin/notification/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Notification.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/notification");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Notification.findByIdAndDelete(id);
      res.redirect("/admin/notification");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
