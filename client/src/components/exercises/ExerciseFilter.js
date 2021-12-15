import React, { useContext, useRef, useEffect } from 'react'
import ExerciseContext from '../../context/exercise/exerciseContext'

const ExerciseFilter = () => {

    const exerciseContext = useContext(ExerciseContext)
    const { filtered,  filterExercises, clearFilter, } = exerciseContext
    const text = useRef('')

    useEffect(() => {
        if(filtered === null){
            text.current.value =''
        }
    },[filtered])

    const onChange = (e) => {
        if (text.current.value !== ''){
            filterExercises(e.target.value)
        }else{
            clearFilter()
        }
    }

    return (
        <div className="form-group">   
            <input ref={text} type="text" placeholder="Filter Exercises by Activity, Date or Duration"  className="form-control filter" onChange={onChange} />
        </div>   
    )
}

export default ExerciseFilter

 