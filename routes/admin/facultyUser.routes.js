import express from "express";
import Faculty from "../../models/faculty.model.js";
import FacultyUser from "../../models/facultyUser.model.js";

const router = express.Router();

// List all faculty users
router.get("/", async (req, res) => {
  try {
    // Fetch faculty users with their faculty data
    const facultyUsers = await FacultyUser.find().lean();
    
    // Get faculty details for each user
    const facultyIds = facultyUsers.map(user => user.faculty);
    const faculties = await Faculty.find({ _id: { $in: facultyIds } }).lean();
    
    // Create a map for quick lookup
    const facultyMap = {};
    faculties.forEach(faculty => {
      facultyMap[faculty._id.toString()] = faculty;
    });
    
    // Combine data for rendering
    const combinedData = facultyUsers.map(user => ({
      ...user,
      facultyDetails: facultyMap[user.faculty?.toString()] || { name: "Unknown", department: "Unknown" }
    }));
    
    res.render("admin/facultyUser/index", { 
      facultyUsers: combinedData,
      success: req.flash("success"),
      error: req.flash("error")
    });
  } catch (error) {
    console.error("Error fetching faculty users:", error);
    req.flash("error", "Failed to load faculty user list");
    res.redirect("/admin/dashboard");
  }
});

// Show create faculty user form
router.get("/create", async (req, res) => {
  try {
    // Get all faculty without user accounts
    const existingFacultyUsers = await FacultyUser.find().distinct('faculty');
    const availableFaculty = await Faculty.find({
      _id: { $nin: existingFacultyUsers },
      email: { $exists: true, $ne: "" },
      username: { $exists: true, $ne: "" }
    }).lean();
    
    res.render("admin/facultyUser/create", { 
      availableFaculty,
      success: req.flash("success"),
      error: req.flash("error")
    });
  } catch (error) {
    console.error("Error loading faculty user form:", error);
    req.flash("error", "Failed to load faculty user creation form");
    res.redirect("/admin/facultyUser");
  }
});

// Process create faculty user form
router.post("/create",async (req, res) => {
  try {
    const { facultyId, password } = req.body;
    
    // Find the faculty
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      req.flash("error", "Faculty not found");
      return res.redirect("/admin/facultyUser/create");
    }
    
    // Check for required fields
    if (!faculty.email || !faculty.username) {
      req.flash("error", "Faculty must have email and username defined");
      return res.redirect("/admin/facultyUser/create");
    }
    
    // Check if user already exists
    const existingUser = await FacultyUser.findOne({
      $or: [
        { email: faculty.email },
        { username: faculty.username },
        { faculty: faculty._id }
      ]
    });
    
    if (existingUser) {
      req.flash("error", "A user account already exists for this faculty member");
      return res.redirect("/admin/facultyUser");
    }
    
    // Create new faculty user
    const newFacultyUser = new FacultyUser({
      username: faculty.username,
      email: faculty.email,
      faculty: faculty._id
    });
    
    // Register with password
    await FacultyUser.register(newFacultyUser, password);
    
    req.flash("success", `User account created for ${faculty.name}`);
    res.redirect("/admin/facultyUser");
  } catch (error) {
    console.error("Error creating faculty user:", error);
    req.flash("error", "Failed to create faculty user account: " + error.message);
    res.redirect("/admin/facultyUser/create");
  }
});

// Show reset password form
router.get("/reset-password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const facultyUser = await FacultyUser.findById(id);
    
    if (!facultyUser) {
      req.flash("error", "Faculty user not found");
      return res.redirect("/admin/facultyUser");
    }
    
    // Get faculty details
    const faculty = await Faculty.findById(facultyUser.faculty);
    
    res.render("admin/facultyUser/resetPassword", { 
      facultyUser,
      faculty,
      success: req.flash("success"),
      error: req.flash("error")
    });
  } catch (error) {
    console.error("Error loading reset password form:", error);
    req.flash("error", "Failed to load reset password form");
    res.redirect("/admin/facultyUser");
  }
});

// Process password reset
router.post("/resetPassword/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;
    
    // Validate passwords match
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect(`/admin/facultyUser/resetPassword/${id}`);
    }
    
    // Find faculty user
    const facultyUser = await FacultyUser.findById(id);
    if (!facultyUser) {
      req.flash("error", "Faculty user not found");
      return res.redirect("/admin/facultyUser");
    }
    
    // Set the new password
    await facultyUser.setPassword(password);
    await facultyUser.save();
    
    req.flash("success", "Password has been reset successfully");
    res.redirect("/admin/facultyUser");
  } catch (error) {
    console.error("Error resetting password:", error);
    req.flash("error", "Failed to reset password: " + error.message);
    res.redirect("/admin/facultyUser");
  }
});

export default router;