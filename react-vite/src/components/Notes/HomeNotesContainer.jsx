import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteNote, thunkGetAllNotes } from "../../redux/notes";
import { useNavigate } from "react-router-dom";
import "./HomeNotes.css"

export default function AllNotes() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotes = useSelector((state) => state.notes);
    const allNoteBody = useSelector((state) => state.notebody)
    const notesObj = Object.values(allNotes);
    console.log("🚀 ~ AllNotes ~ allNotes:", allNotes)
    console.log("🚀 ~ AllNotes ~ notesObj:", notesObj)

    useEffect(() => {
        dispatch(thunkGetAllNotes());
    }, [dispatch]);

    const handleDelete = async(noteId) => {

        const res = await dispatch(thunkDeleteNote(noteId))
    }

    const handleNavigate = (noteId) => {
        navigate(`/home/note/${noteId}`);
    };

    return (
        <div className="homenotescontainer">
            {notesObj?.map((note) => (
                <div onClick={() => handleNavigate(note.id)} className="singlenote" key={note.id}>
                    <button onClick={() => handleDelete(note.id)}>Delete Note</button>
                    <h2>Note Title: {note.note_title}</h2>
                    <div>
                        {note.note_title}'s' body:
                    </div>
                </div>
            ))}

        </div>
    );


}
