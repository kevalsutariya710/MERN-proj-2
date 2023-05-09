import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Reg = () => {
    const history = useNavigate()

    const [regdata, setRegdata] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        setRegdata({ ...regdata, [name]: value })
    }

    const sendData = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/reg', regdata, {
            method: 'POST',
            header: {
                "content-type": "application/json",
                Accept: 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then(res => {
                alert('Reg Successful');
                history('/')
            })
            .catch(err => console.log(err))

    }




    return (
        <form onSubmit={sendData}>
            <h3>Sign Up</h3>

            <div className="mb-3">
                <label>Name</label>
                <input
                    type="text"
                    name='name'
                    className="form-control"
                    placeholder="Your name"
                    value={regdata.name}
                    onChange={handleInput}
                    required
                />
            </div>


            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    name='email'
                    className="form-control"
                    placeholder="Enter email"
                    value={regdata.email}
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
                    value={regdata.password}
                    onChange={handleInput}
                    required
                />
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <Link to={'/'}> Login </Link>
            </p>
        </form>
    )
}

export default Reg