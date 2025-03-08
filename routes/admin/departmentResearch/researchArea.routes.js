import express from "express";
import methodOverride from "method-override";
import ResearchArea from "../../../models/research/researchArea.model";

const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router
.route("/")
.get(async(_,res)=>{
    try{
    const researchArea = await ResearchArea.find({});
    res.render('admin/departmentResearch/researchArea/index.ejs', { data: researchArea });
    }
    catch(e){
        res.status(500).json({ error: e.message });
    }
})
.post(async(req,res)=>{
    try{    
    const { title, department, description } = req.body;
     const formattedDescription = description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);

    const newResearchArea = new ResearchArea({
        title,
        department,
        description: formattedDescription
    });

    await newResearchArea.save();
    res.redirect('/admin/departmentResearch/researchArea');
}
catch(e){
    res.status(500).json({ error: e.message });
}
});

router.route("/new").get(async (_, res) => {
    res.render("admin/departmentResearch/researchArea/new.ejs");
  });


  router.route("/:id")
  .get(async (req, res) => {
      const { id } = req.params;
      try {
          const result = await ResearchArea.findById(id);
          if (!result) {
              return res.status(404).send("ResearchArea not found");
          }

          const descriptionText = result.description ? result.description.join("\n") : "";

          res.render("admin/departmentResearch/researchArea/update.ejs", { result, descriptionText });
      } catch (error) {
          console.error("Error fetching research area:", error);
          res.status(500).send("Server error while fetching the research Area");
      }
  })
  .patch(async (req, res) => {
      const { id } = req.params;
      const { title, department, description } = req.body;
  
      try {
          const formattedDescription = description
              .split('\n')
              .map(line => line.trim())
              .filter(line => line); // Filter out empty lines

          const updatedReasearchArea = await ResearchArea.findByIdAndUpdate(
              id,
              {
                  title,
                  department,
                  description: formattedDescription
              },
              { new: true }
          );

          if (!updatedReasearchArea) {
              return res.status(404).send("Research Area not found or update failed");
          }

          res.redirect("/admin/departmentResearch/researchArea");
      } catch (error) {
          console.error("Error updating research area:", error);
          res.status(500).json({ error: "Server error while updating the research area" });
      }
  })  
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await ResearchArea.findByIdAndDelete(id);
      res.redirect("/admin/departmentResearch/researchArea");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;
