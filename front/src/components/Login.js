import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    const history = useNavigate()
    const [logdata, setLogdata] = useState({
        email: "",
        password: "",
    });
    const handleInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        setLogdata({ ...logdata, [name]: value })
    }
    const sendData = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login', logdata, {
            method: 'POST',
            header: {
                "content-type": "application/json",
                Accept: 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })

            .then((data) => {
                if (data.status === 201) {

                    alert("Login Success")
                    window.localStorage.setItem("token", data.data)
                    history('/home')
                }
                else {
                    alert("Login Error");
                }
                // console.log(data, "userRegister")
            })
    }

    return (
        <form onSubmit={sendData} >
            <h3>Sign In</h3>

            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={logdata.email}
                    onChange={handleInput}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    name='password'
                    className="form-control"
                    placeholder="Enter password"
                    value={logdata.password}
                    onChange={handleInput}
                    required
                />
            </div>


            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
            <p className="forgot-password text-right">
                For New User Click <Link to={'/reg'}>Reg </Link>
            </p>
        </form>
    )
}

export default Login