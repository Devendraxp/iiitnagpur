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
import adminRoute from "./routes/admin/index.routes.js";
import studentRoute from "./routes/student.routes.js"
import programRoute from "./routes/program.routes.js"
import alumniRoute from "./routes/alumni.routes.js"
import basicScienceRoute from "./routes/department/basicScience.routes.js"
import cseRoute from "./routes/department/cse.routes.js"
import eceRoute from "./routes/department/ece.routes.js"
import facultyUserRoute from "./routes/facultyUser.routes.js"
import clubRoute from "./routes/club.routes.js"


import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import path from "path";
import deptAchievementRoutes from "./routes/admin/deptAchievement.routes.js";
import deptProjectRoutes from "./routes/admin/deptProject.routes.js";
import deptEventRoutes from "./routes/admin/deptEvent.routes.js";
import FacultyUser from "./models/facultyUser.model.js";

const PORT = 8080;
const app = express();

// Define __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DeptAchievement_File = path.join(__dirname, "database", "data", "departmentAchievement.json");
const DeptProject_File=path.join(__dirname,"database","data","departmentProject.json");


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

const sessionOptions=
{secret:"mysupersecret",
    resave:false,
    saveUninitialized:true}

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(FacultyUser.authenticate()));
passport.serializeUser(FacultyUser.serializeUser());
passport.deserializeUser(FacultyUser.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

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
    research ,
  });
});

app.use("/admin", adminRoute);
app.use("/student", studentRoute);
app.use("/program", programRoute);
app.use("/alumni",alumniRoute);
app.use("/basic_science", basicScienceRoute)
app.use("/cse", cseRoute)
app.use("/ece", eceRoute)
app.use("/admin/deptAchievement", deptAchievementRoutes);
app.use("/admin/deptProject", deptProjectRoutes);
app.use("/admin/deptEvent", deptEventRoutes);
app.use("/faculty", facultyUserRoute)
app.use("/club",clubRoute)

app.get("/admin-login", (_, res) => {
  res.render("admin/login");
});

// About Us Routes
app.get("/aboutUs", (req, res) => {
  res.render("aboutUs");
});

// // Basic Science Routes
// app.get("/department", (req, res) => {
//   res.redirect("/basic_science/aboutDepartment");
// });
// app.get("/basic_science/:page", (req, res) => {
//   const { page } = req.params;
//   res.render(`basic_science/${page}`);
// });

app.get("/placements", (req, res) => {
  res.redirect("/placements/about-us");
});
app.get("/placements/:page", (req, res) => {
  const { page } = req.params;
  res.render(`placements/${page}`);
});

app.get("/governance", (req, res) => {
  res.redirect("/governance/board-of-governors");
});
app.get("/governance/:page", (req, res) => {
  const { page } = req.params;
  res.render(`governance/${page}`);
});


app.get("/footerPages", (req, res) => {
  res.redirect("/footerPages/campus-location");
});
app.get("/footerPages/:page", (req, res) => {
  const { page } = req.params;
  res.render(`footerPages/${page}`);
});

app.get("/admissions", (req, res) => {
  res.redirect("/admissions/undergraduate-btech");
});
app.get("/admissions/:page", (req, res) => {
  const { page } = req.params;
  res.render(`admissions/${page}`);
});

app.get("/nirf", (req, res) => {
  res.redirect("/nirf/2025");
});
app.get("/nirf/:page", (req, res) => {
  const { page } = req.params;
  res.render(`nirf/${page}`);
});


app.get("/others", (req, res) => {
  res.redirect("/others/consultancy");
});
app.get("/others/:page", (req, res) => {
  const { page } = req.params;
  res.render(`others/${page}`);
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
app.get("/readMore/academicReadMore", (req, res) => {
  res.render("readMore/academicReadMore");
});
app.get("/readMore/researchReadMore", (req, res) => {
  res.render("readMore/researchReadMore");
});
app.get("/readMore/research", (req, res) => {
  res.render("readMore/Research");
});
app.get("/readMore/clubsReadMore", (req, res) => {
  res.render("readMore/clubsReadMore");
});
app.get("/readMore/club", (req, res) => {
  res.render("readMore/club");
});
app.get("/rti/rtidetails", (req, res) => {
  res.render("rti/rtidetails");
});
app.get("/rti/rtiofficer", (req, res) => {
  res.render("rti/rtiofficer");
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
