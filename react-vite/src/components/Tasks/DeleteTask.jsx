import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteTask, thunkPostTask, thunkUpdateTask } from "../../redux/tasks"

export default function DeleteTask({ taskId, closeModal }){
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(thunkDeleteTask(taskId))
        closeModal() // Close the modal after deleting the task
    }

    return(
        <>
            <h1>Delete this Task?</h1>
            <p>This action cannot be undone. Please confirm your decision.</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </>
    )
}
