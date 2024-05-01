import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkPostTask } from "../../redux/tasks"
import './PostTask.css'
import { thunkGetAllNotes } from "../../redux/notes"

export default function PostTaskInNote({ closeModal, singleNoteId, noteTitle }){
    const dispatch = useDispatch()
    const whichNote = useSelector((state) => state.notes)
    const noteObj = Object.values(whichNote)

    const [noteId, setNoteId] = useState('');
    const [body, setBody] = useState('');
    // const [dueDate, setDueDate] = useState('');

    const handleTaskSubmit = async(e) => {
        e.preventDefault();  // Prevent form from refreshing the page

        const newTask = {
            note_id: noteId,
            body,
            // due_date: dueDate,
        }
       const res = await dispatch(thunkPostTask(noteId, newTask))

       if (res && res.errors) {
        return res
       }

       closeModal()

    }

    useEffect(() => {
        if (singleNoteId) {
            setNoteId(singleNoteId);
        } else if (noteObj && noteObj.length > 0) {
            setNoteId(noteObj[0].id);
        }

    }, [noteObj, singleNoteId]);

    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, []) // Run only on mount





    return(
        <>
            <form onSubmit={handleTaskSubmit} className="form">
                <div className="form-div">
                    <h2>Adding a task to the note: "{noteTitle}"</h2>
                </div>
                <div className="form-div">
                    <label className="form-label">
                        Task body
                        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} className="form-input" />
                    </label>
                </div>
                <div className="form-div">
                    {/* <label className="form-label">
                        Due date
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="form-input" />
                    </label> */}
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )

}
