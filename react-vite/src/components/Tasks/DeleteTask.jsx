import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteTask, thunkPostTask, thunkUpdateTask } from "../../redux/tasks"
import './DeleteTaskModal.css'

export default function DeleteTask({ taskId, closeModal }){
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(thunkDeleteTask(taskId))
        closeModal() // Close the modal after deleting the task
    }

    return (
        <div className="cnnm-modal-container">
            <h1 style={{margin:'20px'}}>Delete this Task?</h1>
            <p style={{marginBottom:'20px'}}>This action cannot be undone. Please confirm your decision.</p>
            <div className="cnnm-button-container">
                <button onClick={handleDelete} className="cnnm-button-cancel">Delete</button>
                <button onClick={closeModal} className="cnnm-button-delete">Cancel</button>
            </div>
        </div>
    )
}
