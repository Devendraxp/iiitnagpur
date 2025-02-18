import express from "express";
import mongoose from "mongoose";
import connectDB from "./database/index.db.js";
import PhotoCarousel from "./models/photoCarousel.model.js";
import Achievement from "./models/achievements.model.js";
import Notice from "./models/notice.model.js";
import Notification from "./models/notification.model.js";
import StudentTestimonial from "./models/studentTestimonial.model.js";
import path from "path";
import ejsMate from "ejs-mate";

const app = express();

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
    console.log(req.body);
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
