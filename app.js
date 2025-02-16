import express from "express";
import mongoose from "mongoose";
import connectDB from "./database/index.db.js";
import PhotoCarousel from "./models/photoCarousel.model.js";
import Achievement from "./models/achievements.model.js";
import Notice from "./models/notice.model.js";
import Notification from "./models/notification.model.js";
import StudentTestimonial from "./models/studentTestimonial.model.js";

const app = express();
const PORT = 8080;

app.use(express.json());

connectDB();

app.get("/", (_, res) => {
  res.send("Server running properly 🚀!!! ");
});
app.get("/admin", (_, res) => {
  res.send("You are going to admin path ----->>>>");
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


app.listen(PORT, () =>
  console.log(`server running on -> http://localhost:${PORT}`)
);
