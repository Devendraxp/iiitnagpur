import express from "express";
import mongoose from "mongoose";
import connectDB from "./database/index.db.js";
import PhotoCarousel from "./models/photoCarousel.model.js";
import Achievement from "./models/achievements.model.js";
import Notice from "./models/notice.model.js";
import Notification from "./models/notification.model.js";
import StudentTestimonial from "./models/studentTestimonial.model.js";
import Faculty from "./models/faculty.model.js";
import Department from "./models/department.model.js";
import path from "path";
import ejsMate from "ejs-mate";
import { error } from "console";


const app = express();


const methodOverride = require('method-override');
app.use(methodOverride('_method'));

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

//photo-carousel routes

app.get("/admin/photo-carousel", async (_, res) => {
  try {
    const result = await PhotoCarousel.find({});
    res.json({ message: "Data fetched successfully", data: result });
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

// achievements route

app.get("/admin/achievements", async (req, res) => {
  try {
    const result = await Achievement.find({});
    res.json({ message: "Data fetched successfully", data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/admin/achievements", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new Achievement(data);
    await newData.save();
    res.json({ message: "Data saved successfully", data: newData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


app.get("/admin/achievements/new", async (_, res) => {
  res.render("admin/achievements/new.ejs");
});

// routes for notice

app.get("/admin/notice", async (req, res) => {
  try {
    const result = await Notice.find({});
    res.json({ message: "Data fetched successfully", data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/admin/notice", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new Notice(data);
    await newData.save();
    res.json({ message: "Data saved successfully", data: newData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


app.get("/admin/notice/new", async (_, res) => {
  res.render("admin/notice/new.ejs");
});

// Route to list all faculties
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
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).send("Faculty not found.");
    }

    res.render("admin/faculty/update.ejs", { faculty });
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

app.patch("/admin/faculty/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(id, data, { new: true });

    if (!updatedFaculty) {
      return res.status(404).send("Faculty not found.");
    }

    res.redirect("/admin/faculty"); // Redirect to faculty list
  } catch (error) {
    res.status(500).send("Error updating faculty: " + error.message);
  }
});



// routes for notification

app.get("/admin/notification", async (req, res) => {
  try {
    const result = await Notification.find({});
    res.json({ message: "Data fetched successfully", data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/admin/notification", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new Notification(data);
    await newData.save();
    res.json({ message: "Data saved successfully", data: newData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/notification/new", async (_, res) => {
  res.render("admin/notification/new.ejs");
});

//route for student testimonial

app.get("/admin/student-testimonial", async (req, res) => {
  try {
    const result = await StudentTestimonial.find({});
    res.json({ message: "Data fetched successfully", data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/admin/student-testimonial", async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new StudentTestimonial(data);
    await newData.save();
    res.json({ message: "Data saved successfully", data: newData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/admin/student-testimonial/new", async (_, res) => {
  res.render("admin/studentTestimonials/new.ejs");
});

app.listen(PORT, () =>
  console.log(`server running on -> http://localhost:${PORT}`)
);
