import React, { useState, useContext } from 'react'
import { FaTrash, FaEdit } from "react-icons/fa" 
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import ExerciseContext from '../../context/exercise/exerciseContext'
import EditExercise from './EditExercise'
import useModal from './useModal'


const ExerciseItem = ({ exercise }) => {
    
    const { deleteExercise, setCurrent, clearCurrent } = useContext(ExerciseContext);
    const { _id, description, duration, date } = exercise

    const { show, handleShow, handleClose } = useModal()

    const onDelete = () => {
        deleteExercise(_id) 
        clearCurrent()
    }

    const onClick = ( ) => {
        setCurrent(exercise)
        handleShow()
    }

    return (
        <>
            <tr>
                <td className="tbl-start">{description}</td>
                <td>{duration}</td>
                <td><Moment format='YYYY-MM-DD'>{date}</Moment></td>

                <td>
                    <button className="bg-transparent edit-btn" onClick={onClick}><i className="fa fa-edit"/></button>
                    <button className="delete-btn bg-transparent" onClick={onDelete}><i className="fa fa-trash"/></button> 
                </td>
            </tr>

            <EditExercise show={show} onHide={handleClose} />
        </>
    )
}
export default ExerciseItem;

