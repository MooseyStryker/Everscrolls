import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkPostTask } from "../../redux/tasks"
import './PostTask.css'
import { thunkGetAllNotes } from "../../redux/notes"

export default function PostTask({ closeModal, singleNoteId }){
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
                    <label htmlFor="noteSelect" className="form-label">List of notes:</label>
                    <select id="noteSelect" value={noteId} onChange={(e) => setNoteId(e.target.value)} className="form-select">
                        {noteObj?.map((note, index) => (
                            <option key={index} value={note.id}>{note.note_title}</option>
                        ))}
                    </select>
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
