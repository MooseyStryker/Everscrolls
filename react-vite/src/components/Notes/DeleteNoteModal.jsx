import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteTask, thunkPostTask, thunkUpdateTask } from "../../redux/tasks"
import { thunkDeleteNote } from "../../redux/notes"
import { thunkDeleteAllNoteBody } from "../../redux/notebody"

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

    return(
        <>
            <h1>Delete this Note?</h1>
            <p>This action cannot be undone. Please confirm your decision.</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </>
    )
}
