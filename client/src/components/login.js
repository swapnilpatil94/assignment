
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';



const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',

    });

    // var [displayError, updateError] = useState(null);

    const { email, password } = formData;
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const onSubmit = async e => {
        e.preventDefault();

        const login = {

            email,
            password
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(login);
            const response = await axios.post("/api/auth", body, config);

            console.log(response.data);

            localStorage.setItem('token', response.data.token);
            alert("Login Successful")

            // Redirect if authenticated
            console.log(localStorage.getItem('token').length)

        } catch (error) {
            console.log(error.response.data)
            alert("Login failed")
        }




    };






    return <Fragment>

        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)} action="dashboard.html">
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}

                    required
                />
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
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/">Sign Up</Link>
        </p>
        {/* </section> */}
    </Fragment >

}

export default Login;