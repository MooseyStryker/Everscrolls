import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteNote, thunkGetAllNotes } from "../../../redux/notes";
import { useNavigate } from "react-router-dom";
import NotesBody from "../../Notes_body/NoteBody";
import { FaTimes } from 'react-icons/fa';
import { thunkPostNote } from "../../../redux/notes";
import { thunkDeleteAllNoteBody } from "../../../redux/notebody";
import { useModal } from "../../../context/Modal";
import DeleteNoteModal from "../../Notes/DeleteNoteModal";


export default function AllNotesInNotebook({ notebook }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const { setModalContent } = useModal()
    const allNotes = useSelector((state) => state.notes);
    const notesObj = Object.values(allNotes);
    console.log("🚀 ~ AllNotesInNotebook ~ notesObj:", notesObj)
    const [noteUpdate, setNoteUpdate] = useState(false)

    const test = notesObj.filter(note => note.notebook_id == notebook.id)
    console.log("🚀 ~ AllNotesInNotebook ~ test:", test)

    const handleNewNote = async() => {
        const newNote = {
            title: "Untitled"
        }

        const res = await dispatch(thunkPostNote(newNote))

        if (res && res.errors){
            return setErrors(res.errors)
          }

        navigate(`/home/note/${res.id}`)
        window.location.reload(); // This keeps data from the previous note from appearing on the new note.
    }

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
            {notesObj?.filter(note => note.notebook_id === notebook.id).map((note) => (
                <div className="singlenotecontainer">

                    <div onClick={(e) => handleDeleteNoteModal(e,note.id)} style={{ cursor: 'pointer' }}>
                        <FaTimes />
                    </div>

                    <div onClick={() => handleNavigate(note.id)} className="singlenote" key={note.id}>
                        <h2 style={{marginBottom:'15px'}}>{note.note_title && note.note_title.length > 20 ? `${note.note_title.substring(0, 14)}...` : note.note_title}</h2>
                        <div>
                            {note.bodies && note.bodies.slice(0, 4).map((body, index) => (
                                <p key={index}>
                                    • {body.body.length > 20 ? `${body.body.substring(0, 18)}...` : body.body}    {/* This keeps super long strings from bleeding over the div  */}
                                </p>
                            ))}
                        </div>
                        <div className="tasksneedsmargin">
                            <h3 className="thistoo">
                                Tasks:
                            </h3>
                            {note.tasks && note.tasks.slice(0,4).map((task, index) =>(
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
