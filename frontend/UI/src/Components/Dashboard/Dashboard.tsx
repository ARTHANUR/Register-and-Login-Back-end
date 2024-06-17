import axios from "axios";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AddPost from "../AddPost/AddPost";

interface Post {
    _id: string;
    title: string;
    content: string;
    image: string;
}

const Dashboard = () => {
    const [data, setData] = useState<Post[]>([]);
    const [addToggle, setAddToggle] = useState<Boolean>(false);

    const fetchPostData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/blog/read");
            console.log(response.data.posts);
            setData(response.data.posts);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPostData();
    }, []);

    const deletePost = async (id: string) => {
        try {
            const res = await axios.delete("http://localhost:8000/api/blog/delete", {
                data: { id: id },
            });
            console.log(res);
            toast.success("Post Deleted", { position: "top-center" });
            fetchPostData();
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete the post", { position: "top-center" });
        }
    };

    const addpost = () => {
        setAddToggle(!addToggle);
    };

    return (
        <>
            {addToggle ? <AddPost fetchPostData={fetchPostData} /> : <></>}
            <ToastContainer />
            <div
                onClick={() => {
                    addToggle ? setAddToggle(false) : setAddToggle(true);
                }}
                className={addToggle ? "add-blur" : ""}
            >
                <button onClick={() => addpost()} className="add-post-btn">
                    Add new post <span className="material-symbols-outlined">add_circle</span>
                </button>
                <div className="dashboard-container">
                    {data.map((item) => (
                        <div key={item._id} className="dashboard-card">
                            <img src={item.image} alt="Post" />
                            <h1>{item.title}</h1>
                            <p>{item.content}</p>
                            <button className="delete-post-btn" onClick={() => deletePost(item._id)}>
                                Delete<span className="material-symbols-outlined">delete </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
