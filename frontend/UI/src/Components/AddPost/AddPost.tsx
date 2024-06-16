import { useState } from "react"
import "./AddPost.css"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


const AddPost = ({fetchPostData}) => {
    const [postData,setPostData] = useState({
      title : "",
      content : "",
      image : ""
    })

    const addNewPost = async(e) => {
      e.preventDefault();
       await axios.post("http://localhost:8000/api/blog/create",{
        title : postData.title,
        content : postData.content,
        image : postData.image
      }).then((response)=>{
        console.log("Post Data sent successfully" , response)
        toast.success("Post Added Successfully",{position :  "top-center"})
        fetchPostData();
        
      }).catch((err)=>{
        console.log(err);
        toast.error("Failed to post" , {position : "top-center"})
      })
    }
  return (
    <div className="add-post-container">
      <ToastContainer/>
        <form onSubmit={addNewPost} className='add-post-module'>
        <h1>Add Post</h1>
        <input type="text" placeholder='Title' name='title' value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}  />
        <textarea name="" id="" placeholder='content' value={postData.content} onChange={(e)=>setPostData({...postData,content:e.target.value})}></textarea>
        <input type="text" placeholder='image URL' value={postData.image} onChange={(e)=>setPostData({...postData,image:e.target.value})} />
        <button type="submit">Add</button>
      </form>
    </div>
      
  )
}

export default AddPost
