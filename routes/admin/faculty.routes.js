router
  .route("/")
  .get(async (req, res) => {
    try {
      const faculties = await Faculty.find({});
      const groupedFaculties = {
        hod: faculties.filter((faculty) => faculty.position === "hod"),
        facultyMembers: faculties.filter(
          (faculty) => faculty.position === "faculty-member"
        ),
        staff: faculties.filter((faculty) => faculty.position === "staff"),
      };

      res.render("admin/faculty/index.ejs", { groupedFaculties });
    } catch (e) {
      res.status(500).json({ error: `Error fetching faculties: ${e.message}` });
    }
  })
  .post(async (req, res) => {
    try {
      let { data } = req.body;

      if (!data) {
        return res.status(400).json({ error: "Invalid input data." });
      }

      // Convert newline-separated input into an array for relevant fields
      data.education = data.education
        ? data.education.split("\n").map((s) => s.trim())
        : [];
      data.experience = data.experience
        ? data.experience.split("\n").map((s) => s.trim())
        : [];
      data.teaching = data.teaching
        ? data.teaching.split("\n").map((s) => s.trim())
        : [];
      data.research.areaofReasearch = data.research.areaofReasearch
        ? data.research.areaofReasearch.split("\n").map((s) => s.trim())
        : [];
      data.responsibility = data.responsibility
        ? data.responsibility.split("\n").map((s) => s.trim())
        : [];
      data.anyOther = data.anyOther
        ? data.anyOther.split("\n").map((s) => s.trim())
        : [];

      // Ensure nested objects exist
      if (!data.research) data.research = {};
      if (!data.supervision)
        data.supervision = { phd: [], MTech: [], BTech: [] };

      // Handle research project (Ensure it's an array)
      if (!Array.isArray(data.research.researchProject)) {
        data.research.researchProject = [];
      }

      // Handle supervision (Ensure it's properly formatted)
      if (!Array.isArray(data.supervision.phd)) {
        data.supervision.phd = [];
      }
      if (!Array.isArray(data.supervision.MTech)) {
        data.supervision.MTech = data.supervision.MTech
          ? data.supervision.MTech.split("\n").map((s) => s.trim())
          : [];
      }
      if (!Array.isArray(data.supervision.BTech)) {
        data.supervision.BTech = data.supervision.BTech
          ? data.supervision.BTech.split("\n").map((s) => s.trim())
          : [];
      }

      // Function to parse publications (Journals, Conferences, Books)
      const parsePublications = (input) => {
        if (!input) return [];

        const lines = input
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        let parsedData = [];
        let currentEntry = null;

        lines.forEach((line) => {
          if (/^\d{4}$/.test(line)) {
            // Detects Year (YYYY)
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
      data.publication.conferences = parsePublications(
        data.publication.conferences
      );
      data.publication.books = parsePublications(data.publication.books).map(
        (entry) => ({
          year: entry.year,
          titles: entry.papers, // Rename "papers" to "titles" for books
        })
      );

      const newFaculty = new Faculty(data);
      await newFaculty.save();

      res.redirect("/admin/faculty");
    } catch (e) {
      res.status(500).json({ error: `Error saving faculty: ${e.message}` });
    }
  });

// Route to render the add faculty form
router.route("/new").get(async (_, res) => {
  res.render("admin/faculty/new.ejs");
});

//edit
// Render Faculty Edit Page
router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;

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
      res.render("admin/faculty/update.ejs", { data });
    } catch (error) {
      res.status(500).send("Server error: " + error.message);
    }
  })
  .patch(async (req, res) => {
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

      res.redirect("/admin/faculty?success=true");
    } catch (error) {
      console.error("Error updating faculty:", error);
      res.status(500).send("Error updating faculty: " + error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      await Faculty.findByIdAndDelete(id);
      res.redirect("/admin/faculty"); // Redirect back to faculty list
    } catch (error) {
      console.error("Error deleting faculty:", error);
      res.status(500).send("Server error: Unable to delete faculty.");
    }
  });
