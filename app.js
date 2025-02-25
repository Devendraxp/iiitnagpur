import express from "express";
import connectDB from "./database/index.db.js";
import path from "path";
import ejsMate from "ejs-mate";
import methodOverride from "method-override";
import Achievement from "./models/achievements.model.js";
import Notice from "./models/notice.model.js";
import Notification from "./models/notification.model.js";
import StudentTestimonial from "./models/studentTestimonial.model.js";
import Research from "./models/research.model.js"
import Faculty from "./models/faculty.model.js";
import Image from "./models/imageSchema.js";
import adminRoute from "./routes/admin.routes.js";
import Admin from "./models/admin.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import passportLocal from "passport-local";

const PORT = 8080;

const app = express();

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(new URL(".", import.meta.url).pathname, "public")))
app.set("views", path.join(new URL(".", import.meta.url).pathname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("uploads"));

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
// Add error handler for session store
store.on("connect", () => {
  console.log("MongoDB session store connected");
});
const sessionOptions = {
  store: store,
  secret: 'your-secret-key-here', // Replace with actual secret from environment variable
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
//session & passport

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal.Strategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.get("/", async(_, res) => {
  const studentNotice = await Notice.find({type : "student"})
  const facultyNotice = await Notice.find({type : "faculty"})
  const update = await Notification.find({type : "update"})
  const studentAchievement = await Achievement.find({type : "student"})
  const facultyAchievement = await Achievement.find({type : "faculty"})
  const notification  = await Notification.find({type : { $in: ['news', 'event'] }})
  const studentTestimonial = await StudentTestimonial.find({})
  const research = await Research.find({})


  res.render("index.ejs",{studentAchievement, studentNotice, facultyAchievement, facultyNotice, update, notification, studentTestimonial, research });
});

app.use("/admin", adminRoute);

app.get("/admin-login",(_, res) =>{
  res.render("admin/login.ejs")
})



//============= Routes ==============//

app.get("/aboutUs",(req,res)=>{
  res.redirect("/aboutUs/Act");
})
app.get("/aboutUs/:page",(req,res)=>{
  const {page} = req.params;
  res.render(`aboutUs/${page}.ejs`)
})


app.get("/student",(req,res)=>{
res.redirect("/student/Achievements")
})
app.get("/student/:page",(req,res)=>{
  const {page} = req.params;
  res.render(`student/${page}.ejs`)
})

app.get("/basic-science",(req,res)=>{

res.redirect("/basic-science/about-department")

})
app.get("/basic-science/:page",(req,res)=>{
  const {page} = req.params;
  res.render(`BasicScience/${page}.ejs`)
})

app.get("/readMore",async(req,res)=>{
  const studentNotice = await Notice.find({type : "student"})
  const facultyNotice = await Notice.find({type : "faculty"})
  const update = await Notification.find({type : "update"})
  const news = await Notification.find({type : "news"})
  const event = await Notification.find({type : "event"})

  const studentAchievement = await Achievement.find({type : "student"})
  const facultyAchievement = await Achievement.find({type : "faculty"})
  const notification  = await Notification.find({type : { $in: ['news', 'event'] }})


  res.render("readMore/ViewAll.ejs",{studentAchievement, studentNotice, facultyAchievement, facultyNotice, update,news,event ,notification });
})

app.get("/readMore/internationalResearch",(req,res)=>{
  res.render("readMore/InternationalRes.ejs")
})
app.get("/readMore/research",(req,res)=>{
  res.render("readMore/Research.ejs")
})
app.get("/readMore/studentClubs",(req,res)=>{
  res.render("readMore/StudentClubs.ejs")
})

app.get("/more/:id",(req,res)=>{
  const {id} = req.params;
  res.render(`morePages/${id}.ejs`)
})

app.get("/:id", (req,res)=>{
  res.render("error404.ejs")
})


app.listen(PORT, () =>
  console.log(`server running on -> http://localhost:${PORT}`)
);
