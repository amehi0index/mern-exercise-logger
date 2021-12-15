import React, { useState, useContext, useEffect } from 'react'
import { Modal } from "react-bootstrap"
import ExerciseContext from '../../context/exercise/exerciseContext'
import useModal from './useModal'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const EditExerciseForm = ({ closeForm }) => {
   
    const [description, setDescription] = useState(''); 
    const [duration, setDuration] = useState(0);   
    const [date, setDate] = useState(new Date());
    
    const exerciseContext = useContext(ExerciseContext)
    const { updateExercise, current, clearCurrent } = exerciseContext;

    const { handleClose } = useModal()

    useEffect (() => {

        if(current !== null){
            setDescription(current.description)
            setDuration(current.duration)
        }else{
            setDescription('')
            setDuration(0)
        }
    }, [exerciseContext, current])
  
    const onSubmit = (e) => {
        e.preventDefault();

        const newExercise = {
            id: current._id,
            description,
            duration, 
            date
        }

        updateExercise(newExercise)
 
        clearCurrent()
    }

    return (
       
        <div className= "modal-form-container">
            <form onSubmit={onSubmit} className=" modal-form p-4">
            <h1 className="form-title text-center p-3">Edit<span className="form-title-color"> Entry</span></h1>
                <div className="form-group col-xs-3 px-5">
                    <div className= "d-flex flex-column">
                        <label htmlFor="text" className="control-label">Exercise Description:</label>
                        <input
                            type="text" 
                            name="description"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control" 
                            placeholder="Exercise Description..." 
                            required
                        /> 
                    </div>
                </div>
    
                <div className="form-group col-xs-3 px-5">
                    <div className= "d-flex flex-column">
                        <label htmlFor="text">Minutes:</label>
                        <input
                            type="number" 
                            name="duration" 
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)} 
                            className="form-control" 
                            placeholder="Enter Duration of Exercise..." 
                            required
                        />
                    </div>
                </div>

                <div className="form-group col-xs-3 px-5">
                    <div className= "d-flex flex-column">
                        <label htmlFor="date">Date: </label>
                        <div className="date form-control">
                        <DatePicker selected={date} onChange={date => setDate(date)} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn add-btn my-4" onClick={handleClose} >Edit Exercise</button>
            </form>
         </div>
    )
}

const EditExercise = ({ show, onHide }) => {

    return (
      <>
        <Modal className="modal-overlay" show={show} onHide={onHide} animation={false} onSubmit={onHide}>
            <EditExerciseForm onSubmit={onHide} closeForm={onHide} />
        </Modal>
      </>
    );
}

export default EditExercise