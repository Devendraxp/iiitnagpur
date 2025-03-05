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
import Admin from "./models/admin.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import passportLocal from "passport-local";
import path from "path";
import Department from "./models/department.model.js";
import DeptAchievement from "./models/deptAchievement.model.js";
import DeptProject from "./models/deptProject.model.js";
import DeptEvents from "./models/deptEvents.model.js";

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
app.use("/student", studentRoute);
app.use("/program", programRoute);
app.use("/alumni",alumniRoute);


app.get("/admin-login", (_, res) => {
  res.render("admin/login");
});

// About Us Routes
app.get("/aboutUs", (req, res) => {
  res.render("aboutUs");
});

// Basic Science Routes
app.get("/department", (req, res) => {
  res.redirect("/basic-science/about-department");
});
app.get("/basic-science/:page", (req, res) => {
  const { page } = req.params;
  res.render(`BasicScience/${page}`);
});

app.get("/alumni", (req, res) => {
  res.redirect("/alumni/AbousUs");
});
app.get("/alumni/:page", (req, res) => {
  const { page } = req.params;
  res.render(`alumni/${page}`);
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




// Fetch all achievements
app.get("/admin/deptAchievement", async (req, res) => {
  try {
    const achievements = await DeptAchievement.find();
    res.render("admin/deptAchievement/index", { data: achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ error: "Failed to load department achievements." });
  }
});

// Render new achievement form
app.get("/admin/deptAchievement/new", (req, res) => {
  res.render("admin/deptAchievement/new");
});

// Create new achievement
app.post("/admin/deptAchievement/new", async (req, res) => {
  try {
    const { title, year, description, department } = req.body;
    const newData = new DeptAchievement({ title, year, description, department });

    await newData.save();
    res.redirect("/admin/deptAchievement");
  } catch (error) {
    console.error("Error saving achievement:", error);
    res.status(500).json({ error: "Failed to save department achievement." });
  }
});

// Render edit form
app.get("/admin/deptAchievement/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await DeptAchievement.findById(id);

    if (!achievement) {
      return res.status(404).json({ error: "Achievement not found." });
    }

    res.render("admin/deptAchievement/update", { achievement });
  } catch (error) {
    console.error("Error loading achievement for editing:", error);
    res.status(500).json({ error: "Failed to load achievement for editing." });
  }
});

// Update achievement
app.post("/admin/deptAchievement/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAchievement = await DeptAchievement.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedAchievement) {
      return res.status(404).json({ error: "Achievement not found." });
    }

    res.redirect("/admin/deptAchievement");
  } catch (error) {
    console.error("Error updating achievement:", error);
    res.status(500).json({ error: "Failed to update achievement." });
  }
});

// Delete achievement
app.delete("/admin/deptAchievement/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAchievement = await DeptAchievement.findByIdAndDelete(id);

    if (!deletedAchievement) {
      return res.status(404).json({ error: "Achievement not found." });
    }

    res.json({ message: "Deleted successfully" }); // Use JSON response for AJAX
  } catch (error) {
    console.error("Error deleting department achievement:", error);
    res.status(500).json({ error: "Failed to delete department achievement." });
  }
});




//routes for department project
app.get("/admin/deptProject", async (req, res) => {
 try{
  const projects= await DeptProject.find();
  res.render("admin/deptProject/index",{data:projects})
 }catch(error){
  console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to load department projects." });
 }
});

app.get("/admin/deptProject/new", (req, res) => {
  res.render("admin/deptProject/new");
});


app.post("/admin/deptProject/new", async (req, res) => {
  try {
    const { faculty, titleofProject, year, sponsoringAgency, fundingAmount, department } = req.body;

    if (!department) {
      return res.status(400).send("Department field is required.");
    }

    const newData = new DeptProject({
      faculty,
      titleofProject,
      year,
      sponsoringAgency,
      fundingAmount,
      department,  
    });


    await newData.save();

    res.redirect("/admin/deptProject");
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ error: "Failed to save department project." });
  }
});


app.get("/admin/deptProject/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await DeptProject.findById(id);
    res.render("admin/deptProject/update", { project });
  } catch (error) {
    console.error("Error loading project for editing:", error);
    res.status(500).json({ error: "Failed to load project for editing." });
  }
});

app.post("/admin/deptProject/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DeptProject.findByIdAndUpdate(id, req.body, { new: true });

    res.redirect("/admin/deptProject");
  } catch (error) {
    console.error("Error updating Project:", error);
    res.status(500).json({ error: "Failed to update Project." });
  }
});

app.delete("/admin/deptProject/:id", async (req, res) => {
  const { id } = req.params;
  try {
   await DeptProject.findByIdAndDelete(id);
    res.redirect("/admin/deptProject");
  } catch (error) {
    console.error("Error deleting department project:", error);
    res.status(500).json({ error: "Failed to delete  department project." });
  }
});



app.get("/admin/deptEvent", async (req, res) => {
  try {
    const events = await DeptEvents.find();
    res.render("admin/deptEvent/index", { data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to load department events." });
  }
});

app.get("/admin/deptEvent/new", (req, res) => {
  res.render("admin/deptEvent/new");
});

app.post("/admin/deptEvent/new", async (req, res) => {
  try {
    const { year, description, department } = req.body;

    if (!year || !description || !department) {
      return res.status(400).send("All fields (year, description, department) are required.");
    }

    const newEvent = new DeptEvents({
      year,
      description,
      department,  
    });

    await newEvent.save();
    res.redirect("/admin/deptEvent");
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ error: "Failed to save department event." });
  }
});

app.get("/admin/deptEvent/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await DeptEvents.findById(id);
    res.render("admin/deptEvent/edit", { event });
  } catch (error) {
    console.error("Error loading events for editing:", error);
    res.status(500).json({ error: "Failed to load events for editing." });
  }
});

app.post("/admin/deptEvent/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DeptEvents.findByIdAndUpdate(id, req.body, { new: true });

    res.redirect("/admin/deptEvent");
  } catch (error) {
    console.error("Error updating Event:", error);
    res.status(500).json({ error: "Failed to update Event." });
  }
});

app.delete("/admin/deptEvent/:id", async (req, res) => {
  const { id } = req.params;
  try {
   await DeptEvents.findByIdAndDelete(id);
    res.redirect("/admin/deptEvent");
  } catch (error) {
    console.error("Error deleting department Event:", error);
    res.status(500).json({ error: "Failed to delete  department Event." });
  }
});




app.listen(PORT, () =>
  console.log(`server running on -> http://localhost:${PORT}`)
);
