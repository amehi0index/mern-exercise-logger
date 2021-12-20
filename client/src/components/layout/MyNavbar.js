import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from "react-bootstrap"
import AuthContext from '../../context/auth/authContext'
import ExerciseContext from '../../context/exercise/exerciseContext'


const MyNavbar = () => {

    const authContext = useContext(AuthContext)
    const exerciseContext = useContext(ExerciseContext)

    const { isAuthenticated, logout, user } = authContext
    const { clearExercises } = exerciseContext

    const onLogout = () => {
        logout()
        clearExercises()
    }

    const authLinks = (
        <>
            <Navbar.Text className="pr-4">
                <i className="fa fa-user pr-2"/>{ user && user.name }
            </Navbar.Text>{' '}
            <Navbar.Text>
                <a className="pr-l" onClick={onLogout} href='#!'>
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </Navbar.Text>
        </>
    )

    const guestLinks = (
        <>
            <Navbar.Text className="pl-2">
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Navbar.Text>
            <Navbar.Text className="pl-2">
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Navbar.Text>
        </>
    )

    return (
        <Navbar className="color-nav" variant="dark" expand="lg" >
            <Navbar.Brand as={Link} to="/" ><i className="fas fa-bicycle pr-3"/>Exercise Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto my-2" >
                <Nav.Item className="pr-2">
                    {isAuthenticated ? authLinks : guestLinks}
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>   
        </Navbar>

    )
}

export default MyNavbar