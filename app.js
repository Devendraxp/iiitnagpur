import express from "express";
import mongoose from "mongoose";
import connectDB from "./database/index.db.js";
import PhotoCarousel from "./models/photoCarousel.model.js";
import Achievement from "./models/achievements.model.js";
import Notice from "./models/notice.model.js";
import Notification from "./models/notification.model.js";
import StudentTestimonial from "./models/studentTestimonial.model.js";
import Faculty from "./models/faculty.model.js";
import path from "path";
import ejsMate from "ejs-mate";
import { error } from "console";
import methodOverride from "method-override";

const app = express();

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(new URL(".", import.meta.url).pathname, "./views"));
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (_, res) => {
  res.send("Server running properly 🚀!!! ");
});
app.get("/admin", (_, res) => {
  res.render("admin/index.ejs");
});

//=============== photo-carousel Routes ===============//

app.get("/admin/photo-carousel", async (_, res) => {
  try {
    const result = await PhotoCarousel.find({});
    res.render("admin/photoCarousel/index.ejs", { data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/photo-carousel/new", async (_, res) => {
  res.render("admin/photoCarousel/new.ejs");
});

app.post("/admin/photo-carousel", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new PhotoCarousel(data);
    await newData.save();
    res.json({ message: "Data saved successfully", data: newData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/photo-carousel/edit/:id", async (req, res) => {
  const { id } = req.params;
  const result = await PhotoCarousel.findById(id);
  res.render("admin/photoCarousel/update.ejs", { data: result });
});

app.patch("/admin/photo-carousel/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const updatedCarousel = await PhotoCarousel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedCarousel) {
      return res.status(404).json({ error: "Photo carousel not found" });
    }
    res.redirect("/admin/photo-carousel");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/photo-carousel/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCarousel = await PhotoCarousel.findByIdAndDelete(id);
    if (!deletedCarousel) {
      return res.status(404).json({ error: "Photo carousel not found" });
    }
    res.redirect("/admin/photo-carousel");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//=============== Achievements Routes ===============//

app.get("/admin/achievements", async (req, res) => {
  try {
    const result = await Achievement.find({});
    res.render("admin/achievements/index.ejs", { data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/achievements/new", async (_, res) => {
  res.render("admin/achievements/new.ejs");
});

app.post("/admin/achievements", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new Achievement(data);
    await newData.save();
    res.redirect("/admin/achievements");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/achievements/edit/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Achievement.findById(id);
  res.render("admin/achievements/update.ejs", { data: result });
});

app.patch("/admin/achievements/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    await Achievement.findByIdAndUpdate(id, data, { new: true });
    res.redirect("/admin/achievements");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/achievements/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Achievement.findByIdAndDelete(id);
    res.redirect("/admin/achievements");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//=============== Notice Routes ===============//

app.get("/admin/notice", async (req, res) => {
  try {
    const result = await Notice.find({});
    res.render("admin/notice/index.ejs", { data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/notice/new", async (_, res) => {
  res.render("admin/notice/new.ejs");
});

app.post("/admin/notice", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new Notice(data);
    await newData.save();
    res.redirect("/admin/notice");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/notice/edit/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findById(id);
  res.render("admin/notice/update.ejs", { data: result });
});

app.patch("/admin/notice/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    await Notice.findByIdAndUpdate(id, data, { new: true });
    res.redirect("/admin/notice");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/notice/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Notice.findByIdAndDelete(id);
    res.redirect("/admin/notice");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//=============== Notification Routes ===============//
app.get("/admin/notification", async (req, res) => {
  try {
    const result = await Notification.find({});
    res.render("admin/notification/index.ejs", { data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/notification/new", async (_, res) => {
  res.render("admin/notification/new.ejs");
});

app.post("/admin/notification", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new Notification(data);
    await newData.save();
    res.redirect("/admin/notification");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/notification/edit/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Notification.findById(id);
  res.render("admin/notification/update.ejs", { data: result });
});

app.patch("/admin/notification/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    await Notification.findByIdAndUpdate(id, data, { new: true });
    res.redirect("/admin/notification");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/notification/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.findByIdAndDelete(id);
    res.redirect("/admin/notification");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//route for student testimonial
app.get("/admin/student-testimonial", async (req, res) => {
  try {
    const result = await StudentTestimonial.find({});
    res.render("admin/studentTestimonials/index.ejs", { data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/student-testimonial/new", async (_, res) => {
  res.render("admin/studentTestimonials/new.ejs");
});

app.post("/admin/student-testimonial", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new StudentTestimonial(data);
    await newData.save();
    res.redirect("/admin/student-testimonial");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/student-testimonial/edit/:id", async (req, res) => {
  const { id } = req.params;
  const result = await StudentTestimonial.findById(id);
  res.render("admin/studentTestimonials/update.ejs", { data: result });
});

app.patch("/admin/student-testimonial/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    await StudentTestimonial.findByIdAndUpdate(id, data, { new: true });
    res.redirect("/admin/student-testimonial");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/student-testimonial/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await StudentTestimonial.findByIdAndDelete(id);
    res.redirect("/admin/student-testimonial");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get("/admin/faculty", async (req, res) => {
  try {
    const faculties = await Faculty.find({});
    res.render("admin/faculty/index.ejs", { faculties }); // Pass the faculties list to the view
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Route to render the form for adding a new faculty
app.get("/admin/faculty/new", async (_, res) => {
  res.render("admin/faculty/new.ejs");
});

// Route to add a new faculty
app.post("/admin/faculty", async (req, res) => {
  try {
    const { data } = req.body;
    const newFaculty = new Faculty(data);
    await newFaculty.save();

    res.redirect("/admin/faculty"); // Redirect to faculty list after successful addition
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//edit

app.get("/admin/faculty/edit/:id", async (req, res) => {
  const { id } = req.params; // Extract ID from URL

  try {
    const data = await Faculty.findById(id);
    if (!data) {
      return res.status(404).send("Faculty not found.");
    }

    res.render("admin/faculty/update.ejs", { data });
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

app.patch("/admin/faculty/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedFaculty) {
      return res.status(404).send("Faculty not found.");
    }

    res.redirect("/admin/faculty"); // Redirect to faculty list
  } catch (error) {
    res.status(500).send("Error updating faculty: " + error.message);
  }
});

app.listen(PORT, () =>
  console.log(`server running on -> http://localhost:${PORT}`)
);
