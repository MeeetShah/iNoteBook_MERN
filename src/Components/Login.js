import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const Login = () => {

    const [creds, setcreds] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3002/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate("/")
        }
        else {
            alert("GALAT CREDS")
        }

    }

    const onchange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form onSubmit={handlesubmit}>
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" name="email" id="email">Email address</label>
                        <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" name="password" >Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onchange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Login
