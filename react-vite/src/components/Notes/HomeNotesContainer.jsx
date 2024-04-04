import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteNote, thunkGetAllNotes } from "../../redux/notes";
import { useNavigate } from "react-router-dom";
import "./HomeNotes.css"
import NotesBody from "../Notes_body/NoteBody";
import { FaTimes } from 'react-icons/fa';
import { thunkPostNote } from "../../redux/notes";
import { thunkDeleteAllNoteBody } from "../../redux/notebody";
import { useModal } from "../../context/Modal";
import DeleteNoteModal from "./DeleteNoteModal";


export default function AllNotes() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const { setModalContent } = useModal()
    const allNotes = useSelector((state) => state.notes);
    const notesObj = Object.values(allNotes);
    const [noteUpdate, setNoteUpdate] = useState(false)


    const handleNewNote = async() => {
        const newNote = {
            title: "Untitled"
        }

        const res = await dispatch(thunkPostNote(newNote))

        if (res && res.errors){
            return setErrors(res.errors)
          }

        navigate(`/home/note/${res.id}`)

    }


    // const handleDelete = async(noteId) => {
    //     const res = await dispatch(thunkDeleteNote(noteId))

    //     // delete the data from the notes since if i make another note, it will auto populate with the old notes data
    //     dispatch(thunkDeleteAllNoteBody(noteId))
    //     localStorage.removeItem(`Note ${noteId}'s Body `);

    //     setNoteUpdate(!noteUpdate)

    // }

    const handleDeleteNoteModal = (e, noteId) => {
        e.stopPropagation()
        setModalContent(<DeleteNoteModal noteId={noteId} closeModal={closeModal} />)

    }

    const handleNavigate = (noteId) => {
        navigate(`/home/note/${noteId}`);
    };


    useEffect(() => {
        if (noteUpdate === true) setNoteUpdate(!noteUpdate)
        dispatch(thunkGetAllNotes());
    }, [dispatch, noteUpdate]);
    return (
        <div className="homenotescontainer">
            {notesObj?.map((note) => (
                <div className="singlenotecontainer">

                    <div onClick={(e) => handleDeleteNoteModal(e, note.id)} style={{ cursor: 'pointer' }}>
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
                        <div>
                            Tasks:
                            {note.tasks && note.tasks.slice(0,2).map((task, index) =>(
                                <p key={index}>{task.body}</p>
                            ))}
                        </div>
                    </div>

                </div>
            ))}
            <div>
                <div className="creatinganewnote" onClick={handleNewNote}>
                    Create a New Note!
                </div>
                </div>
        </div>
    );


}
