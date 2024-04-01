import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkPostTask } from "../../redux/tasks"

export default function PostTask(){
    const dispatch = useDispatch()
    const whichNote = useSelector((state) => state.notes)
    const noteObj = Object.values(whichNote)
    console.log("🚀 ~ PostTask ~ noteObj:", noteObj)

    // State variables for form inputs
    const [noteId, setNoteId] = useState('');
    const [body, setBody] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleTaskSubmit = async(e) => {
        e.preventDefault();  // Prevent form from refreshing the page

        const newTask = {
            note_id: noteId,
            body,
            due_date: dueDate,
        }
        console.log("🚀 ~ handleTaskSubmit ~ newTask:", newTask)

       const res = await dispatch(thunkPostTask(noteId, newTask))
       console.log("🚀 ~ handleTaskSubmit ~ res:", res)

       if (res && res.errors) {
        return res
       }

    }

    return(
        <>
            <form onSubmit={handleTaskSubmit}>
                <div>
                    <label htmlFor="noteSelect">List of notes:</label>
                    <select id="noteSelect" value={noteId} onChange={(e) => setNoteId(e.target.value)}>
                        {noteObj?.map((note, index) => (
                            <option key={index} value={note.id}>{note.note_title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>
                        Task body
                        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Due date
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
