import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddPost from "./Components/AddPost/AddPost";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/" element={<Register />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/dashboard/create" element={<AddPost />}> </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
