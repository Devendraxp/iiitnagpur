import express from "express";
import connectDB from "./database/index.db.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import ejsMate from "ejs-mate";
import methodOverride from "method-override";
import Achievement from "./models/achievements.model.js";
import Notice from "./models/notice.model.js";
import Notification from "./models/notification.model.js";
import StudentTestimonial from "./models/studentTestimonial.model.js";
import Research from "./models/research.model.js";
import Faculty from "./models/faculty.model.js";
import Image from "./models/imageSchema.js";
import adminRoute from "./routes/admin/index.routes.js";
import Admin from "./models/admin.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import passportLocal from "passport-local";

const PORT = 8080;
const app = express();

// Define __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

// Use static files and set views directory using __dirname
app.use(express.static(join(__dirname, "public")));
app.set("views", join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("uploads"));

// Connect to DB
connectDB();

const MONGODB_URI =
  "mongodb+srv://devendradhuvan:8440088Dev@cluster01.uw7df.mongodb.net/iiitn?retryWrites=true&w=majority&appName=Cluster01";

const store = MongoStore.create({
  mongoUrl: MONGODB_URI,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR ! in mongo session store", err);
});
store.on("connect", () => {
  console.log("MongoDB session store connected");
});

const sessionOptions = {
  store: store,
  secret: "your-secret-key-here", // Replace with actual secret from environment variable
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal.Strategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Routes
app.get("/", async (_, res) => {
  const studentNotice = await Notice.find({ type: "student" });
  const facultyNotice = await Notice.find({ type: "faculty" });
  const update = await Notification.find({ type: "update" });
  const studentAchievement = await Achievement.find({ type: "student" });
  const facultyAchievement = await Achievement.find({ type: "faculty" });
  const notification = await Notification.find({ type: { $in: ["news", "event","update"] } });
  const studentTestimonial = await StudentTestimonial.find({});
  const research = await Research.find({});

  res.render("index", { 
    studentAchievement, 
    studentNotice, 
    facultyAchievement, 
    facultyNotice, 
    update, 
    notification, 
    studentTestimonial, 
    research 
  });
});

app.use("/admin", adminRoute);

app.get("/admin-login", (_, res) => {
  res.render("admin/login");
});

// About Us Routes
app.get("/aboutUs", (req, res) => {
  res.render("aboutUs");
});

// Student Routes
app.get("/student", (req, res) => {
  res.redirect("/student/Achievements");
});
app.get("/student/:page", (req, res) => {
  const { page } = req.params;
  res.render(`student/${page}`);
});

// Basic Science Routes
app.get("/basic-science", (req, res) => {
  res.redirect("/basic-science/about-department");
});
app.get("/basic-science/:page", (req, res) => {
  const { page } = req.params;
  res.render(`BasicScience/${page}`);
});

// readMore Routes
app.get("/readMore", async (req, res) => {
  const studentNotice = await Notice.find({ type: "student" });
  const facultyNotice = await Notice.find({ type: "faculty" });
  const update = await Notification.find({ type: "update" });
  const news = await Notification.find({ type: "news" });
  const event = await Notification.find({ type: "event" });
  const studentAchievement = await Achievement.find({ type: "student" });
  const facultyAchievement = await Achievement.find({ type: "faculty" });
  const notification = await Notification.find({ type: { $in: ["news", "event"] } });

  res.render("readMore/ViewAll", { 
    studentAchievement, 
    studentNotice, 
    facultyAchievement, 
    facultyNotice, 
    update, 
    news, 
    event, 
    notification 
  });
});

app.get("/readMore/internationalResearch", (req, res) => {
  res.render("readMore/InternationalRes");
});
app.get("/readMore/research", (req, res) => {
  res.render("readMore/Research");
});
app.get("/readMore/studentClubs", (req, res) => {
  res.render("readMore/StudentClubs");
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.render("searchResult.ejs", { notices: [], notifications: [], achievements: [], researches: [] });
  }

  try {
    // Use regex search instead of text index search
    const regex = new RegExp(query, 'i'); // case-insensitive search
    
    const notices = await Notice.find({ 
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });
    
    const notifications = await Notification.find({ 
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });
    
    const achievements = await Achievement.find({ 
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });
    
    const researches = await Research.find({ 
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });
    
    res.render("searchResult.ejs", { notices, notifications, achievements, researches });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal Server Error" });
}
});


app.get("/clubs/club", (req, res) => {
  res.render(`clubs/club`);
});

// More Pages Routes
app.get("/more/:id", (req, res) => {
  const { id } = req.params;
  res.render(`morePages/${id}`);
});

// Catch-all Route
app.get("/:id", (req, res) => {
  res.render("error404");
});



app.listen(PORT, () =>
  console.log(`server running on -> http://localhost:${PORT}`)
);
