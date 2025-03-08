import express from "express";
import methodOverride from "method-override";
import Patent from "../../../models/research/patent.model.js";

const router = express.Router();

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router
.route("/")
.get(async(_,res)=>{
    try{
        const result=await Patent.find({});
        res.render("admin/departmentResearch/patent/index.ejs",{data:result});
    }
    catch(e){
        res.status(500).json({ error: e.message });

    }
})
.post(async(req,res)=>{
    try{
    const {data}=req.body;
    const newData = new Patent(data);
    await newData.save();
    res.redirect("/admin/departmentResearch/patent");
    }catch(e){
        res.status(500).json({ error: e.message });
    }
});


router.route("/new").get(async (_, res) => {
    res.render("admin/departmentResearch/patent/new.ejs");
  });

router.route("/:id")
.get(async(req,res)=>{
    const {id}=req.params;
    const result=await Patent.findById(id);
    res.render("admin/departmentResearch/patent/update.ejs",{data:result});
})
.patch(async(req,res)=>{
    const {id}=req.params;
    const {data}= req.body;
    try {
        await Patent.findByIdAndUpdate(id, data, { new: true });
        res.redirect("/admin/departmentResearch/patent");
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})
.delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Patent.findByIdAndDelete(id);
      res.redirect("/admin/departmentResearch/patent");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;
