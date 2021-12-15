import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";
import AuthContext from '../../context/auth/authContext'

const Register = (props) => {
    
  const authContext = useContext(AuthContext)

  const { register, error, clearErrors, isAuthenticated } = authContext
  const redirect =  '/';

  useEffect(() => {
    if(isAuthenticated){
      props.history.push('/')  //redirect to home page
    }

    if(error === 'User already exists'){

      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history ])


  const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
  })

  const { name, email, password, password2 } = user

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value})
  }
  const onSubmit = (e) => {
    e.preventDefault()
    register({
      name,
      email,
      password
    })
  }

  return (
    <div className="form-container h-100">

      <div className="row justify-content-center greeting">
        <h1 className="text-center">Stay Committed To Your Fitness Goals</h1>
      </div>


      <form className= "mt-5 auth-form" onSubmit={onSubmit}>
      <h1 className="mb-3 form-title">Account <span>Register</span></h1>
        <div className="form-group">           
          <input 
            type="text"
            name="name" 
            value={name} 
            onChange={onChange}
            className="form-control"
            placeholder="Name"
            autoComplete="off"
          />
          <span className="fa fa-user form-span"></span>
        </div>
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
        {password >=5 && (
          <div className="form-group">
              <input 
                  type="password" 
                  name="password2"
                  value={password2} 
                  onChange={onChange} 
                  className="form-control"
                  placeholder="Confirm"
                  autoComplete="off"
              />
                <span className="fa fa-lock form-span" aria-hidden="true"></span>
          </div>
        )}
          
        <Button value="Register" className= "btn-block shadow-none" type="submit" >
          GET STARTED
        </Button>
        <div className="row w-100 mb-0 justify-content-center align-items-center">
          <span className="badge badge-pill badge-cust px-5 py-4 mt-5 font-weight-bold ">
              ALREADY HAVE AN ACCOUNT?{' '}
              <Link to={redirect === '/' ? 'login' : 'login?redirect=' + redirect} className="span-link">SignIn</Link>
          </span>
        </div>
      </form>
      </div>
   
  )
}

export default Register
