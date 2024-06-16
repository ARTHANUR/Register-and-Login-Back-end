import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const getLoginData = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:8000/api/user/login", {
                email: user.email,
                password: user.password,
            })
            .then((response) => {
                console.log(response);
                toast.success("Login Successful", { position: "top-center" });

                const token = response.data.token;
                localStorage.setItem("token",token)
                navigate("/dashboard")
            })
            .catch((err) => {
                console.log(err);
                toast.error("Login Failed",{position:"top-center"})
            });
    };
    return (
        <div className="login-container">
            <ToastContainer />
            <form onSubmit={getLoginData} action="">
                <input type="email" name="email" placeholder="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input type="password" name="password" placeholder="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button type="submit">Submit</button>
                <Link to="/">Don't have an account ?</Link>
            </form>
        </div>
    );
};

export default Login;
