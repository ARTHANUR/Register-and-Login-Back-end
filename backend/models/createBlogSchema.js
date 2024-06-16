const mongoose = require("mongoose")

const createBlog = new mongoose.Schema({
    title:String,
    content:String,
    image:String
})

module.exports = mongoose.model("posts",createBlog)