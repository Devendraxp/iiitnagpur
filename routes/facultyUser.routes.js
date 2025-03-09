import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import FacultyUser from "../models/facultyUser.model.js";
import Faculty from "../models/faculty.model.js";
const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/faculty/login");
};

// Root route - redirect to dashboard
router.get("/", (req, res) => {
    res.redirect("/faculty/dashboard");
});

// Login routes
router.get("/login", (req, res) => {
    res.render("facultyUser/login", { 
        error: req.flash("error"),
        success: req.flash("success")
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/faculty/dashboard",
    failureRedirect: "/faculty/login",
    failureFlash: true
}));

// Dashboard route
router.get("/dashboard", isAuthenticated, async (req, res) => {
    try {
        // Find the faculty data associated with the authenticated user
        const user = await FacultyUser.findById(req.user._id).populate("faculty");
        
        if (!user || !user.faculty) {
            req.logout(err => {
                if (err) console.error(err);
                res.redirect("/faculty/login");
            });
            return;
        }
        
        // Render dashboard with faculty data
        res.render("facultyUser/dashboard", { 
            faculty: user.faculty,
            req: req,
            success: req.flash("success"),
            error: req.flash("error")
        });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        req.flash("error", "Error loading dashboard");
        res.redirect("/faculty/login");
    }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash("success", "You have been successfully logged out");
    res.redirect("/faculty/login");
  });
});


router.route("/edit").get(isAuthenticated, async (req, res) => {

      const user = await FacultyUser.findById(req.user._id).populate("faculty");
      
      const id = user.faculty._id;
      try {
        const faculty = await Faculty.findById(id);
        if (!faculty) {
          return res.status(404).send("Faculty not found.");
        }
  
        // Convert arrays into newline-separated strings for textareas
        const formatMultiline = (arr) =>
          Array.isArray(arr) ? arr.join("\n") : "";
  
        // Format Publications properly
        const formatPublications = (pubs) => {
          return (pubs || [])
            .map(
              (entry) =>
                `${entry.year}\n${entry.papers.map((p) => `- ${p}`).join("\n")}`
            )
            .join("\n\n");
        };
  
        // Format research projects into an array of objects instead of a string
  
        const formatResearchProjects = (projects) => {
          if (Array.isArray(projects)) {
            // Case 1: If the input is already an array of objects, return it as is
            return projects.map((project) => ({
              year: project.year || "",
              title: project.title || "",
              duration: project.duration || "",
            }));
          } else if (typeof projects === "string") {
            // Case 2: If the input is a string, parse it into an array of objects
            try {
              return projects
                .split("\n") // Split by newline to separate entries
                .map((project) => {
                  const [year, title, duration] = project.split(","); // Split each entry by comma
                  return {
                    year: year?.trim() || "",
                    title: title?.trim() || "",
                    duration: duration?.trim() || "",
                  };
                })
                .filter(
                  (project) => project.year || project.title || project.duration
                ); // Remove any empty entries
            } catch (error) {
              console.log("Error parsing research projects:", error);
              return [];
            }
          }
          return [];
        };
  
        // Format PhD supervision into an array of objects instead of a string
        const formatPhDSupervision = (phd) => {
          if (Array.isArray(phd)) {
            return phd.map((supervision) => ({
              year: supervision.year || "",
              studentName: supervision.studentName || "",
              workDetails: supervision.workDetails || "",
              status: supervision.status || "",
            }));
          }
          return [];
        };
  
        const data = {
          ...faculty.toObject(),
          education: formatMultiline(faculty.education),
          experience: formatMultiline(faculty.experience),
          teaching: formatMultiline(faculty.teaching),
          research: {
            areaofResearch: formatMultiline(
              faculty.research?.areaofResearch || []
            ),
            researchProject: formatResearchProjects(
              faculty.research?.researchProject || []
            ),
            patent: formatMultiline(faculty.research?.patent || []), // Add patent here
            fundedProject: formatMultiline(faculty.research?.fundedProject || []), // Add fundedProject here
            reviewerofJournal: formatMultiline(
              faculty.research?.reviewerofJournal || []
            ),
          },
          supervision: {
            phd: formatPhDSupervision(faculty.supervision?.phd || []),
  
            MTech: formatMultiline(faculty.supervision?.MTech || []),
            BTech: formatMultiline(faculty.supervision?.BTech || []),
          },
          publication: {
            journals: formatPublications(faculty.publication?.journals),
            conferences: formatPublications(faculty.publication?.conferences),
            books: formatPublications(faculty.publication?.books).replace(
              /papers/g,
              "titles"
            ),
          },
        };
      //  console.log(data);
      res.render("facultyUser/update.ejs", { 
        data,
        success: req.flash("success"),
        error: req.flash("error")
      });
    } catch (error) {
      console.error("Error:", error);
      req.flash("error", "Error loading faculty data");
      res.redirect("/faculty/dashboard");
    }
  })
  .patch(isAuthenticated, async (req, res) => {
    const user = await FacultyUser.findById(req.user._id).populate("faculty");
      
      const id = user.faculty._id
          
    let {data} = req.body;

    try {
      if (!data) {
        console.error("Error: Invalid input data.");
        return res.status(400).json({ error: "Invalid input data." });
      }

      const parseMultiline = (input) => {
        if (!input) return [];
        return Array.isArray(input)
          ? input
          : input
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean);
      };

      // Parse basic fields
      data.education = parseMultiline(data.education);
      data.experience = parseMultiline(data.experience);
      data.teaching = parseMultiline(data.teaching);
      data.responsibility = parseMultiline(data.responsibility);
      data.anyOther = parseMultiline(data.anyOther);

      // Parsing research-related fields
      data.research = {
        areaofResearch: parseMultiline(data.research?.areaofResearch),
        patent: parseMultiline(data.research?.patent),
        fundedProject: parseMultiline(data.research?.fundedProject),
        reviewerofJournal: parseMultiline(data.research?.reviewerofJournal),
        researchProject: Array.isArray(data.research?.researchProject)
          ? data.research.researchProject.map((project) => ({
              _id: project._id || new mongoose.Types.ObjectId(),
              year: project.year || "",
              title: project.title || "",
              duration: project.duration || "",
            }))
          : [],
      };

      // Parsing supervision-related fields
      data.supervision = {
        phd: Array.isArray(data.supervision?.phd)
          ? data.supervision.phd.map((supervision) => ({
              _id: supervision._id || new mongoose.Types.ObjectId(),
              year: supervision.year || "",
              studentName: supervision.studentName || "",
              workDetails: supervision.workDetails || "",
              status: supervision.status || "",
            }))
          : [],
        MTech: parseMultiline(data.supervision?.MTech),
        BTech: parseMultiline(data.supervision?.BTech),
      };

      // Parsing publications (journals, conferences, books)
      const parsePublications = (input) => {
        if (!input) return [];
        if (Array.isArray(input)) {
          return input
            .map((entry) => ({
              _id: entry._id || new mongoose.Types.ObjectId(),
              year: entry.year || "",
              papers: entry.papers || [],
            }))
            .filter((entry) => entry.year);
        }

        const lines = input
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        let parsedData = [];
        let currentEntry = null;

        lines.forEach((line) => {
          if (/^\d{4}$/.test(line)) {
            if (currentEntry) parsedData.push(currentEntry);
            currentEntry = {
              _id: new mongoose.Types.ObjectId(),
              year: parseInt(line, 10),
              papers: [],
            };
          } else if (line.startsWith("-") && currentEntry) {
            currentEntry.papers.push(line.substring(1).trim());
          }
        });

        if (currentEntry) parsedData.push(currentEntry);
        return parsedData;
      };

      data.publication = {
        journals: parsePublications(data.publication?.journals),
        conferences: parsePublications(data.publication?.conferences),
        books: parsePublications(data.publication?.books),
      };

      const updatedFaculty = await Faculty.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updatedFaculty) {
        console.error("Error: Faculty not found.");
        return res.status(404).send("Faculty not found.");
      }

      req.flash("success", "Profile updated successfully");
      res.redirect("/faculty/dashboard");
    } catch (error) {
      console.error("Error updating faculty:", error);
      req.flash("error", "Error updating faculty: " + error.message);
      res.redirect("/faculty/edit");
    }
  })

// Change password route
router.route("/changePassword")
  .get(isAuthenticated, (req, res) => {
    // Render the change password form
    res.render("facultyUser/changePassword", {
      error: req.flash("error"),
      success: req.flash("success")
    });
  })
  .post(isAuthenticated, async (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      
      // Validate password match
      if (newPassword !== confirmPassword) {
        req.flash("error", "New passwords do not match");
        return res.redirect("/faculty/change-password");
      }
      
      // Validate password strength (optional)
      if (newPassword.length < 6) {
        req.flash("error", "New password must be at least 6 characters long");
        return res.redirect("/faculty/change-password");
      }
      
      // Get the current user
      const user = await FacultyUser.findById(req.user._id);
      
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/faculty/dashboard");
      }
      
      // Change the password using Passport Local Mongoose's method
      await user.changePassword(currentPassword, newPassword);
      
      // Password successfully changed
      req.flash("success", "Your password has been changed successfully");
      res.redirect("/faculty/dashboard");
      
    } catch (error) {
      console.error("Error changing password:", error);
      
      // Handle specific authentication errors
      if (error.name === "IncorrectPasswordError") {
        req.flash("error", "Current password is incorrect");
      } else {
        req.flash("error", "Error changing password: " + error.message);
      }
      
      res.redirect("/faculty/change-password");
    }
  });

export default router;