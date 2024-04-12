import { useState } from "react";
import { thunkPostNote } from "../../../redux/notes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkPostNotebody } from "../../../redux/notebody";

export default function ScratchToNotesPostIndivNotebook({ notebook, closeModal }) {
    console.log("🚀 ~ ScratchToNotesPost ~ notebook:", notebook)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedNotebookId, setSelectedNotebookId] = useState(notebook?.id);
    console.log("🚀 ~ PostNoteModal ~ selectedNotebookId:", selectedNotebookId)
    const [title, setTitle] = useState('');  // New state for the note title

    const handleNewNote = async () => {
        const newNote = {
            notebook_id: selectedNotebookId,
            title: title || "Untitled"  // Use the title from state, or "Untitled" if it's empty
        }

        const resNewNote = await dispatch(thunkPostNote(newNote))

        if (resNewNote && resNewNote.errors) {
            return setErrors(resNewNote.errors)
        }


        const bodyFromLocal = localStorage.getItem(`Scratch Pad in Notebook ${notebook?.id}`);

        console.log("🚀 ~ newNoteBody ~ bodyFromLocal:", bodyFromLocal)
        const newBody = {
            note_id: resNewNote.id,
            body: bodyFromLocal
        }


        const resBody = await dispatch(thunkPostNotebody(resNewNote.id, newBody))
        console.log("🚀 ~ handleNewNote ~ resBody:", resBody)

        if (resBody && resBody.errors) {
            return setErrors(resBody.errors)
        }


        localStorage.removeItem(`Scratch Pad in Notebook ${notebook?.id}`);


        navigate(`/home/note/${resNewNote.id}`)
        window.location.reload();  // This keeps data from the previous note from appearing on the new note.

    }

    return (
        <>
            <div className="pnmcont">
                <h2 style={{marginBottom:'20px'}}>Adding this scratch note to a new note</h2>
                <div className="pnmtitleid">
                    <input
                        style={{marginBottom:'20px'}}
                        type="text"
                        placeholder="Enter note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}  // Update the title state when the input changes
                    />
                    <h5 style={{marginBottom:'5px', marginLeft:'2px'}}>This note will go into: "{notebook.notebook_name}"</h5>
                    {/* <select onChange={(e) => setSelectedNotebookId(e.target.value)}>
                        {notebooks.map(notebook => (
                            <option key={notebook.id} value={notebook.id}>
                                {notebook.notebook_name}
                            </option>
                        ))}
                    </select> */}
                </div>
                <div>
                    <button style={{marginRight:'20px'}} onClick={handleNewNote}>Create New Note</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </>
    )
}
