import React, { useState, useContext } from 'react'
import { Modal, Button, Form } from "react-bootstrap"
import ExerciseContext from '../../context/exercise/exerciseContext'
import AuthContext from '../../context/auth/authContext'
import useModal from './useModal'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const AddExerciseForm = ({ closeForm }) => {
   
    const [description, setDescription] = useState(''); 
    const [duration, setDuration] = useState(0);   
    const [date, setDate] = useState(new Date());
    
    const exerciseContext = useContext(ExerciseContext)
    const { addExercise } = exerciseContext;

    const { handleClose } = useModal()
  
    const onSubmit = (e) => {
        e.preventDefault();

        const newExercise = {
            description,
            duration, 
            date
        }

        addExercise(newExercise);  
        
        //Clear Form
        setDescription('');
        setDuration(0);
    }

    return (
    
          <div className= "modal-form-container">
            <form onSubmit={onSubmit} className="modal-form p-4">
            <h1 className="form-title text-center p-3">Create <span className="form-title-color">New Entry</span></h1>
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
                        <div className="form-control date">
                            <DatePicker selected={date} onChange={date => setDate(date)} />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn add-btn my-4" onClick={handleClose} >Add Exercise</button>
            </form>
         </div>
    )
}

const AddExercise = ({ show, onHide }) => {

    return (
      <>
        <Modal className="modal-overlay" show={show} onHide={onHide} animation={false} onSubmit={onHide}>
            <AddExerciseForm onSubmit={onHide} closeForm={onHide} />
        </Modal>
      </>
    );
}

export default AddExercise