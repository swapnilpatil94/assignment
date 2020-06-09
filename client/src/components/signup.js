import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

import './auth.css'
var isAuthenticated = false;
const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = async e => {
        e.preventDefault();



        if (password !== password2) {
            console.log("Password do not match", 'danger');
        } else {
            const newUser = {
                name,
                email,
                password
            }
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const response = await axios.post("/api/users", body, config);

                console.log(response.data);

                localStorage.setItem('token', response.data.token);

                isAuthenticated = true


                // Redirect if authenticated
                if (localStorage.getItem('token')) {
                    return <Redirect to="/dashboard" />
                }
                alert("Registration Successful")

            } catch (error) {
                console.log(error.response.data)
                alert("Register again")
            }
            console.log("FormData : ", formData);
            console.log("success")
            // console.log({ name, email, password });

        }
    };





    return <Fragment>
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)} action="create-profile.html">

                <div className="form-group">
                    <input type="text" placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>

                <div className="form-group">
                    <input type="email" placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)} />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}

                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>

            <p className="my-1">
                Do you have a account? <Link to="/login">Login</Link>
            </p>
        </section>
    </Fragment>

}






export default Register;