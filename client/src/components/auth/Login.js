import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from "react-icons/fa"; 
import { Form, Button } from "react-bootstrap";
import AuthContext from '../../context/auth/authContext'


const Login = (props) => {

    const authContext = useContext(AuthContext)

    const { login, error, clearErrors, isAuthenticated } = authContext

    useEffect(() => {
        if(isAuthenticated){
          props.history.push('/')  //redirect to home page
        }
    
        if(error === 'Invalid Credentials'){
          clearErrors()
        }
        //eslint-disable-next-line
      }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const  { email, password } = user

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        login({
            email,
            password
        })
    }

    return (
     
        <div className="form-container h-100">

            <div className="row justify-content-center greeting">
                <h1 >You're Back. Awesome.</h1>
            </div>
            
            <form className= "mt-5 auth-form" onSubmit={onSubmit}>
                <h1 className="mb-3 form-title">Account <span>Login</span></h1>
                <div className="form-group">
                    <input 
                        type="email"
                        name="email" 
                        value={email} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Email"
                        autoComplete="off"
                    />
                        <span className="fa fa-envelope form-span"></span>
                </div>

                <div className="form-group">
                    <input 
                        type="password" 
                        name="password"
                        value={password} 
                        onChange={onChange} 
                        className="form-control"
                        placeholder="Password"
                        autoComplete="off"
                    />
                        <span className="fa fa-lock form-span" aria-hidden="true"></span>
                </div>

                <Button value="Log-In" className=" btn-block shadow-none" type="submit" >
                    LOGIN
                </Button>

                <div className="row w-100 mb-0 justify-content-center align-items-center">
                    <span className="badge badge-pill badge-cust px-4 py-3 mt-5 font-weight-bold">
                        DON'T HAVE AN ACCOUNT?{' '}
                        <Link to='/' className="span-link">SignUp</Link>
                    </span>
                </div>

            </form>

        </div>

    )
}

export default Login
