import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteNote, thunkGetAllNotes } from "../../redux/notes";
import { useNavigate } from "react-router-dom";
import "./HomeNotes.css"
import NotesBody from "../Notes_body/NoteBody";
import { FaTimes } from 'react-icons/fa';


export default function AllNotes() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotes = useSelector((state) => state.notes);
    const notesObj = Object.values(allNotes);
    const [noteUpdate, setNoteUpdate] = useState(false)

    useEffect(() => {
        if (noteUpdate === true) setNoteUpdate(!noteUpdate)
        dispatch(thunkGetAllNotes());
    }, [dispatch, noteUpdate]);


    const handleDelete = async(noteId) => {
        const res = await dispatch(thunkDeleteNote(noteId))
        console.log("🚀 ~ handleDelete ~ res:", res)

        setNoteUpdate(!noteUpdate)

    }

    const handleNavigate = (noteId) => {
        navigate(`/home/note/${noteId}`);
    };
    return (
        <div className="homenotescontainer">
            {notesObj?.map((note) => (
                <div className="singlenotecontainer">

                    <div onClick={() => handleDelete(note.id)} style={{ cursor: 'pointer' }}>
                        <FaTimes />
                    </div>

                    <div onClick={() => handleNavigate(note.id)} className="singlenote" key={note.id}>
                        <h2>Note Title: {note.note_title}</h2>
                        <div>
                            First two bodies:
                            {note.bodies && note.bodies.slice(0, 2).map((body, index) => (
                                <p key={index}>{body.body}</p>
                            ))}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );


}
