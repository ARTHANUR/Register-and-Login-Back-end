const express = require("express")
const blogRoute = express.Router();
const post = require("../models/createBlogSchema")

blogRoute.post("/create",async(req,res)=>{
    try{
        const result = await post.create({
            title:req.body.title,
            content:req.body.content,
            image:req.body.image
        })
        return res.status(200).json({message:"post created successfully",result})

    }
    catch(err){
        return res.status(400).json({message:"No post created", err})
    }
});

blogRoute.get("/read",async(req,res)=>{
    try{
        const posts = await post.find();
        res.status(200).json({message:"posts fetched from DB Successfully" , posts});

    }
    catch(err){
        return res.status(400).json({message : "Failed to fetc posts fromm DB" , err})
    }
})

blogRoute.delete("/delete",async(req,res)=>{
    try{
        const postid = req.body.id
        const result = await post.findByIdAndDelete(postid);
        res.status(200).json({message:"post deleted successfully"});
    }
    catch(err){
        res.status(400).json({message:"failed to delete post"})
    }
})

module.exports = blogRoute