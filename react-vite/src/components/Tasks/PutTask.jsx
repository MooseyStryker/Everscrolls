import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkUpdateTask } from "../../redux/tasks"
import DeleteTask from "./DeleteTask"

export default function PutTask({ task, closeModal, setModalContent }){
    const dispatch = useDispatch()
    const whichNote = useSelector((state) => state.notes)
    const noteObj = Object.values(whichNote)

    // State variables for form inputs
    const [noteId, setNoteId] = useState(task.note_id);
    const [body, setBody] = useState(task.body);
    const [dueDate, setDueDate] = useState(task.due_date || '');

    const handleTaskSubmit = async(e) => {
        e.preventDefault();  // Prevent form from refreshing the page

        const putTask = {
            note_id: noteId,
            body,
            due_date: dueDate,
        }

       const res = await dispatch(thunkUpdateTask(task.note_id, task.id, putTask))

       if (res && res.errors) {
        return res
       }

       closeModal()
    }

    const deleteTaskModal = (taskId) => {
        setModalContent(<DeleteTask task={taskId} closeModal={closeModal} />)

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
                <button onClick={() => deleteTaskModal(task.id)}>Delete Task</button>

            </form>
        </>
    )
}
