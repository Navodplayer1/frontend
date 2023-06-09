import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const {loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const BASE_URL = 'https://booking-app-mern-api.herokuapp.com/api'

    const handleClick = async(e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try{
            const res = await axios.post(`${BASE_URL}/auth/login`, credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
            navigate("/")
        }catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
        }
    }

    return(
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                <button disabled={loading} className="lButton" onClick={handleClick}>Login</button><br/>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )

};

export default Login;