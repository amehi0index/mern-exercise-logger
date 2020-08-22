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

    export default (state, action) =>{
        switch(action.type){
            case GET_EXERCISES:
                return{
                    ...state,
                    exercises: action.payload,
                    loading: false
                }
            case ADD_EXERCISE: 
                return{
                 ...state,
                exercises: [ ...state.exercises, action.payload ],
                loading: false
                }
            case UPDATE_EXERCISE:
                return{
                    ...state,
                    exercises: state.exercises.map(exercise => 
                        exercise._id === action.payload._id ? action.payload : exercise
                    ),
                    loading: false
                }
            case DELETE_EXERCISE: 
                return{
                    ...state,
                    exercises: state.exercises.filter(exercise => exercise._id !== action.payload),
                    loading: false
                }
            case CLEAR_EXERCISES:
                return{
                    ...state,
                    exercises: null,
                    filtered: null,
                    error: null,
                    current: null
                }
            case SET_CURRENT:
                return{
                    ...state,
                    current: action.payload,
                }
            case CLEAR_CURRENT:
                return{
                    ...state,
                    current: null,
                }
            case FILTER_EXERCISES:
                return{
                    ...state,
                    filtered: state.exercises.filter(exercise => {
                        const date =  new Date(exercise.date).toDateString()
                        const duration = exercise.duration.toString()
                        const regex = new RegExp(`${action.payload}`, 'gi')  //global, case insensitive
                        return exercise.description.match(regex) || date.match(regex) || duration.match(regex) ;
                    }),
                }
            case CLEAR_FILTER:
                return{
                        ...state,
                        filtered: null,
                }
            case EXERCISE_ERROR:
                return{
                    ...state,
                    error: action.payload,
                }
            default: 
                return state
        }
    }