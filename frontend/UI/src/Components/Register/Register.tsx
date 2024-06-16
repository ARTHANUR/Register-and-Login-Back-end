import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import axios from "axios";
import("./Register.css");
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: "",
    });

    const navigate = useNavigate();

    const getRegisterData = async(e) => {
        e.preventDefault()
        await axios
            .post("http://localhost:8000/api/user/register", {
                email: user.email,
                password: user.password,
            })
            .then((response) => {
                console.log("response sent ", response)
                toast.success("New User Registered Successfully",{position:"top-center"})
                setTimeout(()=>{
                    navigate("/login")
                },2000)
            })
            .catch((err) => {
                console.log(err);
                toast.error("Registration Failed",{position:"top-center"})

            });
    };

    return (
        <div className="register-container">
            <ToastContainer/>
            <form onSubmit={getRegisterData} action="">
                <input type="text" name="name" placeholder="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                <input type="email" name="email" placeholder="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input type="password" name="password" placeholder="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <input type="password" name="cpassword" placeholder="confirm password" value={user.cPassword} onChange={(e) => setUser({ ...user, cPassword: e.target.value })} />
                <button type="submit">Submit</button>
                <Link to="/login">Already have an account ?</Link>
            </form>
        </div>
    );
};

export default Register;
