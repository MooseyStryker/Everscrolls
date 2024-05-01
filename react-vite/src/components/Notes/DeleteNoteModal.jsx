import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteTask, thunkPostTask, thunkUpdateTask } from "../../redux/tasks"
import { thunkDeleteNote } from "../../redux/notes"
import { thunkDeleteAllNoteBody } from "../../redux/notebody"
import './DeleteNoteModal.css'

export default function DeleteNoteModal({ noteId, closeModal }){
    const dispatch = useDispatch()

    const handleDelete = async() => {
         await dispatch(thunkDeleteNote(noteId))

        // delete the data from the notes since if i make another note, it will auto populate with the old notes data
        dispatch(thunkDeleteAllNoteBody(noteId))
        localStorage.removeItem(`Note ${noteId}'s Body `);

        closeModal()

        setNoteUpdate(!noteUpdate)

    }

    return (
        <div className="cnnm-modal-container">
            <h1 style={{margin:'20px'}}>Delete this Note?</h1>
            <p style={{marginBottom:'20px'}}>This action cannot be undone. Please confirm your decision.</p>
            <div className="cnnm-button-container">
                <button onClick={handleDelete} className="cnnm-button-delete">Delete</button>
                <button onClick={closeModal} className="cnnm-button-cancel">Cancel</button>
            </div>
        </div>
    )
}
