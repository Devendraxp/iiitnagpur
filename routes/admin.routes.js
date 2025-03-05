import express from "express";
import PhotoCarousel from "../models/photoCarousel.model.js";
import Achievement from "../models/achievements.model.js";
import Notice from "../models/notice.model.js";
import Notification from "../models/notification.model.js";
import StudentTestimonial from "../models/studentTestimonial.model.js";
import Faculty from "../models/faculty.model.js";
import Image from "../models/imageSchema.js";
import Research from "../models/research.model.js";
import methodOverride from "method-override";
import multer from "multer";
import mongoose from 'mongoose';

const router = express.Router();
const PORT = 8080;

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/files", express.static("uploads"));

router.use(methodOverride("_method"));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/files", express.static("uploads"));

//=============== Multer configuration ===============//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });





//=============== Routes ===============//
router.get("/", (_, res) => {
  res.render("admin/index.ejs");
});



router
  .route("/photo-carousel")
  .get(async (_, res) => {
    try {
      const result = await PhotoCarousel.find({});
      res.render("admin/photoCarousel/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new PhotoCarousel(data);
      await newData.save();
      res.redirect("/admin/photo-carousel");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/photo-carousel/new").get(async (_, res) => {
  res.render("admin/photoCarousel/new.ejs");
});

router
  .route("/photo-carousel/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await PhotoCarousel.findById(id);
    res.render("admin/photoCarousel/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
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

router.route("/photo-carousel/:id").delete(async (req, res) => {
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

router
  .route("/achievements")
  .get(async (req, res) => {
    try {
      const result = await Achievement.find({});
      res.render("admin/achievements/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Achievement(data);
      await newData.save();
      res.redirect("/admin/achievements");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/achievements/new").get(async (_, res) => {
  res.render("admin/achievements/new.ejs");
});

router
  .route("/achievements/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Achievement.findById(id);
    res.render("admin/achievements/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Achievement.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/achievements");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/achievements/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    await Achievement.findByIdAndDelete(id);
    res.redirect("/admin/achievements");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//=============== Notice Routes ===============//

router
  .route("/notice")
  .get(async (req, res) => {
    try {
      const result = await Notice.find({});
      res.render("admin/notice/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Notice(data);
      await newData.save();
      res.redirect("/admin/notice");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/notice/new").get(async (_, res) => {
  res.render("admin/notice/new.ejs");
});

router
  .route("/notice/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Notice.findById(id);
    res.render("admin/notice/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Notice.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/notice");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/notice/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    await Notice.findByIdAndDelete(id);
    res.redirect("/admin/notice");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//=============== Notification Routes ===============//
router
  .route("/notification")
  .get(async (req, res) => {
    try {
      const result = await Notification.find({});
      res.render("admin/notification/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Notification(data);
      await newData.save();
      res.redirect("/admin/notification");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/notification/new").get(async (_, res) => {
  res.render("admin/notification/new.ejs");
});

router
  .route("/notification/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Notification.findById(id);
    res.render("admin/notification/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Notification.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/notification");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/notification/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.findByIdAndDelete(id);
    res.redirect("/admin/notification");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Research Routes
router
  .route("/research")
  .get(async (req, res) => {
    try {
      const result = await Research.find({});
      res.render("admin/research/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Research(data);
      await newData.save(); 
      res.redirect("/admin/research");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/research/new").get(async (_, res) => {
  res.render("admin/research/new.ejs");
});

router
  .route("/research/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Research.findById(id);
    res.render("admin/research/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Research.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/research");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/research/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    await Research.findByIdAndDelete(id);
    res.redirect("/admin/research");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router
  .route("/achievements")
  .get(async (req, res) => {
    try {
      const result = await Achievement.find({});
      res.render("admin/achievements/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new Achievement(data);
      await newData.save();
      res.redirect("/admin/achievements");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/achievements/new").get(async (_, res) => {
  res.render("admin/achievements/new.ejs");
});

router
  .route("/achievements/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await Achievement.findById(id);
    res.render("admin/achievements/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await Achievement.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/achievements");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/achievements/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    await Achievement.findByIdAndDelete(id);
    res.redirect("/admin/achievements");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






//route for student testimonial
router
  .route("/student-testimonial")
  .get(async (req, res) => {
    try {
      const result = await StudentTestimonial.find({});
      res.render("admin/studentTestimonials/index.ejs", { data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { data } = req.body;
      const newData = new StudentTestimonial(data);
      await newData.save();
      res.redirect("/admin/student-testimonial");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

router.route("/student-testimonial/new").get(async (_, res) => {
  res.render("admin/studentTestimonials/new.ejs");
});

router
  .route("/student-testimonial/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await StudentTestimonial.findById(id);
    res.render("admin/studentTestimonials/update.ejs", { data: result });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await StudentTestimonial.findByIdAndUpdate(id, data, { new: true });
      res.redirect("/admin/student-testimonial");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/student-testimonial/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    await StudentTestimonial.findByIdAndDelete(id);
    res.redirect("/admin/student-testimonial");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//=============== faculty Routes ===============//
router.get("/faculty", async (req, res) => {
  try {
    const faculties = await Faculty.find({});
    const groupedFaculties = {
      hod: faculties.filter(faculty => faculty.position === "hod"),
      facultyMembers: faculties.filter(faculty => faculty.position === "faculty-member"),
      staff: faculties.filter(faculty => faculty.position === "staff"),
    };


    res.render("admin/faculty/index.ejs", { groupedFaculties });
  } catch (e) {
    res.status(500).json({ error: `Error fetching faculties: ${e.message}` });
  }
});


// Route to render the add faculty form
router.get("/faculty/new", async (_, res) => {
  res.render("admin/faculty/new.ejs");
});

// Route to add a new faculty
router.post("/faculty", async (req, res) => {
  try {
    let { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    // Convert newline-separated input into an array for relevant fields
    data.education = data.education ? data.education.split("\n").map((s) => s.trim()) : [];
    data.experience = data.experience ? data.experience.split("\n").map((s) => s.trim()) : [];
    data.teaching = data.teaching ? data.teaching.split("\n").map((s) => s.trim()) : [];
    data.research.areaofReasearch = data.research.areaofReasearch
      ? data.research.areaofReasearch.split("\n").map((s) => s.trim())
      : [];
    data.responsibility = data.responsibility ? data.responsibility.split("\n").map((s) => s.trim()) : [];
    data.anyOther = data.anyOther ? data.anyOther.split("\n").map((s) => s.trim()) : [];

    // Ensure nested objects exist
    if (!data.research) data.research = {};
    if (!data.supervision) data.supervision = { phd: [], MTech: [], BTech: [] };

    // Handle research project (Ensure it's an array)
    if (!Array.isArray(data.research.researchProject)) {
      data.research.researchProject = [];
    }

    // Handle supervision (Ensure it's properly formatted)
    if (!Array.isArray(data.supervision.phd)) {
      data.supervision.phd = [];
    }
    if (!Array.isArray(data.supervision.MTech)) {
      data.supervision.MTech = data.supervision.MTech ? data.supervision.MTech.split("\n").map((s) => s.trim()) : [];
    }
    if (!Array.isArray(data.supervision.BTech)) {
      data.supervision.BTech = data.supervision.BTech ? data.supervision.BTech.split("\n").map((s) => s.trim()) : [];
    }

    // Function to parse publications (Journals, Conferences, Books)
    const parsePublications = (input) => {
      if (!input) return [];

      const lines = input.split("\n").map(line => line.trim()).filter(Boolean);
      let parsedData = [];
      let currentEntry = null;

      lines.forEach(line => {
        if (/^\d{4}$/.test(line)) { // Detects Year (YYYY)
          if (currentEntry) parsedData.push(currentEntry);
          currentEntry = { year: parseInt(line), papers: [] };
        } else if (line.startsWith("-") && currentEntry) {
          currentEntry.papers.push(line.substring(1).trim()); // Remove leading "-"
        }
      });

      if (currentEntry) parsedData.push(currentEntry);
      return parsedData;
    };

    // Ensure publications object exists
    if (!data.publication) {
      data.publication = { journals: [], conferences: [], books: [] };
    }

    // Parse publication fields
    data.publication.journals = parsePublications(data.publication.journals);
    data.publication.conferences = parsePublications(data.publication.conferences);
    data.publication.books = parsePublications(data.publication.books).map(entry => ({
      year: entry.year,
      titles: entry.papers, // Rename "papers" to "titles" for books
    }));

    const newFaculty = new Faculty(data);
    await newFaculty.save();

    res.redirect("/admin/faculty");
  } catch (e) {
    res.status(500).json({ error: `Error saving faculty: ${e.message}` });
  }
});

//edit
// Render Faculty Edit Page
router.get("/faculty/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).send("Faculty not found.");
    }

    // Convert arrays into newline-separated strings for textareas
    const formatMultiline = (arr) => (Array.isArray(arr) ? arr.join("\n") : "");

    // Properly format Publications
    const formatPublications = (pubs) => {
      if (!Array.isArray(pubs)) return "";
      return pubs
        .map(
          (entry) =>
            `${entry.year}\n${(entry.papers || [])
              .map((p) => `- ${p}`)
              .join("\n")}`
        )
        .join("\n\n");
    };

    // Format research projects into an array of objects
    const formatResearchProjects = (projects) => {
      if (Array.isArray(projects)) {
        return projects.map((project) => ({
          year: project.year || "",
          title: project.title || "",
          duration: project.duration || "",
        }));
      } else if (typeof projects === "string") {
        return projects
          .split("\n")
          .map((project) => {
            const [year, title, duration] = project.split(",");
            return {
              year: year?.trim() || "",
              title: title?.trim() || "",
              duration: duration?.trim() || "",
            };
          })
          .filter((project) => project.year || project.title || project.duration);
      }
      return [];
    };

    // Format PhD supervision into an array of objects
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
        areaofResearch: formatMultiline(faculty.research?.areaofResearch || []),
        researchProject: formatResearchProjects(faculty.research?.researchProject || []),
        patent: formatMultiline(faculty.research?.patent || []),
        fundedProject: formatMultiline(faculty.research?.fundedProject || []),
        reviewerofJournal: formatMultiline(faculty.research?.reviewerofJournal || []),
      },
      supervision: {
        phd: formatPhDSupervision(faculty.supervision?.phd || []),
        MTech: formatMultiline(faculty.supervision?.MTech || []),
        BTech: formatMultiline(faculty.supervision?.BTech || []),
      },
      publication: {
        journals: formatPublications(faculty.publication?.journals),
        conferences: formatPublications(faculty.publication?.conferences),
        books: formatPublications(faculty.publication?.books).replace(/papers/g, "titles"),
      },
    };
    res.render("admin/faculty/update.ejs", { data });
  } catch (error) {
    console.error("Error fetching faculty details:", error);
    res.status(500).send("Server error: " + error.message);
  }
});


router.patch("/faculty/edit/:id", async (req, res) => {
  const { id } = req.params;
  let data = req.body.data;

  try {
    if (!data) {
      console.error("Error: Invalid input data.");
      return res.status(400).json({ error: "Invalid input data." });
    }

    const parseMultiline = (input) => {
      if (!input) return [];
      return Array.isArray(input) 
        ? input 
        : input.split("\n").map(s => s.trim()).filter(Boolean);
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
        return input.map((entry) => ({
          _id: entry._id || new mongoose.Types.ObjectId(),
          year: entry.year || "",
          papers: entry.papers || [],
        })).filter(entry => entry.year);
      }

      const lines = input.split("\n").map(line => line.trim()).filter(Boolean);
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

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, data, { new: true });
    if (!updatedFaculty) {
      console.error("Error: Faculty not found.");
      return res.status(404).send("Faculty not found.");
    }

    res.redirect("/admin/faculty?success=true");

  } catch (error) {
    console.error("Error updating faculty:", error);
    res.status(500).send("Error updating faculty: " + error.message);
  }
});

//delete route
router.delete("/faculty/delete/:id", async (req, res) => {
  try {
      const { id } = req.params;
      await Faculty.findByIdAndDelete(id);
      res.redirect("/admin/faculty"); // Redirect back to faculty list
  } catch (error) {
      console.error("Error deleting faculty:", error);
      res.status(500).send("Server error: Unable to delete faculty.");
  }
});
//=============== Media Routes ===============//
router
  .route("/media")
  .get(async (_, res) => {
    const data = await Image.find({});
    res.render("admin/media/index.ejs", { data });
  })
  .post(upload.single("file"), async (req, res) => {
    const image = new Image({
      title: req.body.title,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      imageUrl: `http://localhost:${PORT}/files/${req.file.filename}`,
    });
    await image.save();
    res.redirect("/admin/media");
  });

router.route("/media/new").get(async (_, res) => {
  res.render("admin/media/new.ejs");
});

router
  .route("/media/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Image.findById(id);
      res.render("admin/media/update.ejs", { data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .patch(upload.single("file"), async (req, res) => {
    const { id } = req.params;
    try {
      const updateData = {
        title: req.body.title,
      };

      if (req.file) {
        updateData.filename = req.file.filename;
        updateData.path = `/uploads/${req.file.filename}`;
        updateData.imageUrl = `http://localhost:${PORT}/files/${req.file.filename}`;
      }

      await Image.findByIdAndUpdate(id, updateData, { new: true });
      res.redirect("/admin/media");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/media/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (image && image.filename) {
      // Delete file from uploads folder
      const fs = await import("fs/promises");
      const filePath = `uploads/${image.filename}`;
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
      } catch (err) {
        console.log("File does not exist, continuing with deletion");
      }
      // Delete from database
      await Image.findByIdAndDelete(id);
    }
    res.redirect("/admin/media");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
