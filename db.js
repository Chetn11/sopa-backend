const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    rating:{type:Number,required:true},
    description:{type:String, require:true},
    small_Image:{type:[String]}
})

const ProductModel=mongoose.model("product",productSchema);

// const connection=mongoose.connect(process.env.DB);
const connection=mongoose.connect(process.env.DB)

module.exports={connection,ProductModel}