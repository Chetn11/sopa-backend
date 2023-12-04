const router=require("express").Router();
const {ProductModel}=require("../db");


// get
router.get("/",async (req,res)=>{
    console.log(req.query);
    try {
        const page=parseInt(req.query.page)-1||0;
        const limit=parseInt(req.query.limit) ;  //default limit is 5
        const q=req.query.q ||"";              // search query
        var sort=req.query.sort ||"price";
        var category=req.query.category || "All";

        const cat_option=[
            "Men",
            "women"
        ]

        category==="All"?(category=[...cat_option]):(category=req.query.category.split(","));

        req.query.sort?(sort=req.query.sort.split(",")):(sort=[sort]);

        let sortBy={};
        // setting default asc order
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        }
        else{
            sortBy[sort[0]]="asc";
        }
         
        // option i meas its matches every letters 
        const product=await ProductModel.find({title:{$regex:q,$options:"i"}}).where("category").in([...cat_option]).sort(sortBy).skip(page*limit).limit(limit);

        const response={
            error:false,
            page:page+1,
            limit,
            product
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:true,message:"Server Error"})
    }
})

// create
router.post("/",async (req,res)=>{
    await ProductModel.create(req.body);
    res.status(201).json({status:true,message:"Data Added"});
})
router.get("/:id", async(req,res)=>{
    const id=req.params.id;
    const data=await ProductModel.findOne({_id:id});
    res.send(data)
})
// patch
router.patch("/:id",async (req,res)=>{
    const id=req.params.id;
    const payload=req.body;
    await ProductModel.findOneAndUpdate({_id:id},payload);
    res.send({"message":"Movie updated"})
})

// delete
router.delete("/:id", async (req,res)=>{
    const id=req.params.id;
    await ProductModel.deleteOne({_id:id});
    res.send({"message":"Data deleted"})
})

module.exports={router}