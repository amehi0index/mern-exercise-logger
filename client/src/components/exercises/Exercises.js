import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExerciseContext from '../../context/exercise/exerciseContext'
import AuthContext from '../../context/auth/authContext'
import ExerciseItem  from './ExerciseItem'
import AddExercise from './AddExercise'
import useModal from './useModal'
import ExerciseFilter from './ExerciseFilter'

const Exercises = () => {

const exerciseContext = useContext(ExerciseContext)
const authContext = useContext(AuthContext)

const { exercises, filtered, getExercises, loading } = exerciseContext;
const { isAuthenticated, user } = authContext

const { show, handleShow, handleClose } = useModal() 

  useEffect(() => {
    getExercises()
    // eslint-disable-next-line 
  }, []);

  return (
    <>
      { !loading && exercises !== null && exercises.length > 0 && (
        <div className= "table-container justify-content-center h-100">
          <div className="row justify-content-center greeting">
            <h1 className="text-center" >Hello,{' '}<span className="user-name">{ user && user.name }</span></h1>
          </div>

          <div className ="row p-3" >{isAuthenticated && exercises !==null && exercises.length > 0 && <ExerciseFilter />}</div>

          <div class="table-responsive">   
            <table className="table table-hover table-dark table-striped">
                  <thead className="">
                    <tr>
                      <th colSpan="5" className="header1-bg pt-4 ">
                        <div>
                          <h4>Logged Exercises</h4> 
                          <button className="btn btn-log" onClick={handleShow}>Add New Exercise</button>
                        </div>
                      </th>
                    </tr>
                    <tr className="header2-bg" colSpan="3" >
                      <th className="tbl-start">Activity</th>
                      <th>Duration</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    { exercises && ( 
                      <>  
                        { !loading && filtered !== null 
                          ? filtered.map(exercise => (<ExerciseItem key={exercise._id} exercise={exercise} />))
                          : exercises.map(exercise => (<ExerciseItem key={exercise._id} exercise={exercise} />))
                        }
                      </>  
                    )}
                  </tbody>
              </table>
            </div>
            <AddExercise show={show} onHide={handleClose} />
        </div>
      )}
    </>
  )
}
  
export default Exercises;