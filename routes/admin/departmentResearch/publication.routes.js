import express from "express";
import methodOverride from "method-override";
import Publication from "../../../models/research/publication.model";

const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router
.route("/")
.get(async(_,res)=>{
    try{
    const publications = await Publication.find({});
    res.render('admin/departmentResearch/publication/index.ejs', { data: publications });
    }
    catch(e){
        res.status(500).json({ error: e.message });
    }
})
.post(async(req,res)=>{
    try{    
    const { year, type, department, description } = req.body;
     const formattedDescription = description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);

    const newPublication = new Publication({
        year,
        type,
        department,
        description: formattedDescription
    });

    await newPublication.save();
    res.redirect('/admin/departmentResearch/publication');
}
catch(e){
    res.status(500).json({ error: e.message });
}
});

router.route("/new").get(async (_, res) => {
    res.render("admin/departmentResearch/publication/new.ejs");
  });


  router.route("/:id")
  .get(async (req, res) => {
      const { id } = req.params;
      try {
          const result = await Publication.findById(id);
          if (!result) {
              return res.status(404).send("Publication not found");
          }

          // Convert array back to line-separated string for textarea
          const descriptionText = result.description ? result.description.join("\n") : "";

          res.render("admin/departmentResearch/publication/update.ejs", { result, descriptionText });
      } catch (error) {
          console.error("Error fetching publication:", error);
          res.status(500).send("Server error while fetching the publication");
      }
  })
  .patch(async (req, res) => {
      const { id } = req.params;
      const { year, type, department, description } = req.body;
  
      try {
          const formattedDescription = description
              .split('\n')
              .map(line => line.trim())
              .filter(line => line); // Filter out empty lines

          const updatedPublication = await Publication.findByIdAndUpdate(
              id,
              {
                  year,
                  type,
                  department,
                  description: formattedDescription
              },
              { new: true }
          );

          if (!updatedPublication) {
              return res.status(404).send("Publication not found or update failed");
          }

          res.redirect("/admin/departmentResearch/publication");
      } catch (error) {
          console.error("Error updating publication:", error);
          res.status(500).json({ error: "Server error while updating the publication" });
      }
  })  
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Publication.findByIdAndDelete(id);
      res.redirect("/admin/departmentResearch/publication");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;
