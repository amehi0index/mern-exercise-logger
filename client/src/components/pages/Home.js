
import React, { useContext, useEffect } from 'react'
import Exercises from '../exercises/Exercises'
import { Container } from "react-bootstrap"
import cycling from '../../img/cycling.jpg'
import AuthContext from '../../context/auth/authContext'
import Register from '../auth/Register'
import ExerciseContext from '../../context/exercise/exerciseContext'
import AddExercise from '../exercises/AddExercise'
import useModal from '../exercises/useModal'

const Home = () => {

    const exerciseContext = useContext(ExerciseContext)
    const { exercises } = exerciseContext;
    
    const authContext = useContext(AuthContext)
    const { isAuthenticated, loadUser } = authContext
    
    const { handleShow } = useModal()

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])

    return (
        <div>
            {isAuthenticated ?  (
                exercises !== null && !exercises.length
                    ? (<AddExercise show={handleShow} />)
                    : (<Exercises />) 
                ) : <Register /> 
                }
        </div>
    
    )
}

export default Home