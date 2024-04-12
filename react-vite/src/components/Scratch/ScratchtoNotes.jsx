import { useState } from "react";
import { thunkPostNote } from "../../redux/notes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ScratchToNotesPost({ notebooks }) {
    console.log("🚀 ~ ScratchToNotesPost ~ notebooks:", notebooks)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedNotebookId, setSelectedNotebookId] = useState(notebooks[0]?.id);
    console.log("🚀 ~ PostNoteModal ~ selectedNotebookId:", selectedNotebookId)
    const [title, setTitle] = useState('');  // New state for the note title

    const handleNewNote = async () => {
        const newNote = {
            notebook_id: selectedNotebookId,
            title: title || "Untitled"  // Use the title from state, or "Untitled" if it's empty
        }

        const res = await dispatch(thunkPostNote(newNote))

        if (res && res.errors) {
            return setErrors(res.errors)
        }

        navigate(`/home/note/${res.id}`)
        window.location.reload();  // This keeps data from the previous note from appearing on the new note.
        // closeModal()
    }

    return (
        <>
            <div className="pnmcont">
                <h2 style={{marginBottom:'20px'}}>Create a New Note</h2>
                <div className="pnmtitleid">
                    <input
                        style={{marginBottom:'20px'}}
                        type="text"
                        placeholder="Enter note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}  // Update the title state when the input changes
                    />
                    <h5 style={{marginBottom:'5px', marginLeft:'2px'}}>Which Notebook will this note go in?</h5>
                    <select onChange={(e) => setSelectedNotebookId(e.target.value)}>
                        {notebooks.map(notebook => (
                            <option key={notebook.id} value={notebook.id}>
                                {notebook.notebook_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button style={{marginRight:'20px'}} onClick={handleNewNote}>Create New Note</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </>
    )
}
