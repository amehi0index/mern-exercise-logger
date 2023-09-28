import React, { useReducer } from 'react'
import axios from 'axios'
//import {v4 as uuid} from 'uuid'
import ExerciseContext from './exerciseContext'
import exerciseReducer from './exerciseReducer'
import {
    GET_EXERCISES,
    ADD_EXERCISE,
    DELETE_EXERCISE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_EXERCISE,
    FILTER_EXERCISES,
    CLEAR_FILTER,
    CLEAR_EXERCISES,
    EXERCISE_ERROR
    } from '../types';

const ExerciseState = (props) => {
    
    const initialState = {
        exercises: null,
        current: null,
        filtered: null,
        error: null,
    }

    const [state, dispatch] = useReducer(exerciseReducer, initialState)
   
    //Get exercises
    const getExercises = async () => {

        try {
            const res = await axios.get('/api/exercises')
            dispatch({
                type: GET_EXERCISES,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: EXERCISE_ERROR,
                payload: err.response.msg
            })
        }

    }

    //Add exercise
    const addExercise =  async (exercise) => {

        const config = {      //use when sending data
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/exercises', exercise, config)

            dispatch({
                type: ADD_EXERCISE,
                payload: res.data //response from server is new added exercise
            })
        } catch (err) {
            dispatch({
                type: EXERCISE_ERROR,
                payload: err.response.msg
            })
        }
           
    }

    //Delete exercise
    const deleteExercise =  async (id) => {
        try {
           await axios.delete(`/api/exercises/${id}`)

            dispatch({
                type: DELETE_EXERCISE,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: EXERCISE_ERROR,
                payload: err.response.msg
            })
        }
    }

    
    //Update exercise
    const updateExercise = async (exercise) => {
       
        const config = {      //use when sending data
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/exercises/${exercise.id}`, exercise, config)

            dispatch({
                type: UPDATE_EXERCISE,
                payload: res.data //response from server is updated exercise
            })
        } catch (err) {
            dispatch({
                type: EXERCISE_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Clear exercises on logout
    const clearExercises = () => {
        dispatch({
            type: CLEAR_EXERCISES,
        })
    }

    //Set Current exercise
    const setCurrent = (exercise) => {
        dispatch({
            type: SET_CURRENT,
            payload: exercise
        })
    }


    //Clear Current exercise
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT,
        })
    }

    //Filter Exercises
    const filterExercises = (text) => {
        dispatch({
            type: FILTER_EXERCISES,
            payload: text
        })
    }

    //Clear Filter
    const clearFilter= () => {
        dispatch({
            type: CLEAR_FILTER,
        })
    }

    return (

        <ExerciseContext.Provider value={{
            exercises: state.exercises,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addExercise,
            deleteExercise,
            setCurrent,
            clearCurrent,
            updateExercise,
            filterExercises,
            clearFilter,
            getExercises,
            clearExercises
        }}>
           {props.children} 
        </ExerciseContext.Provider>
    )
}

export default ExerciseState;