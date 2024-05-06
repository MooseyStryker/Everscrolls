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
import PostNoteModal from "./PostNoteModal";
import { FaShareFromSquare } from "react-icons/fa6";
import { thunkGetAllSharedNotes } from "../../redux/sharenote";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";





export default function AllNotes() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const { setModalContent } = useModal()
    const allNotes = useSelector((state) => state.notes);
    const notesObj = Object.values(allNotes);
    const [noteUpdate, setNoteUpdate] = useState(false)
    const allNotebooks = useSelector((state) => state.notebook);
    const allNoteBooksObj = Object.values(allNotebooks)
    const rawSharedNotes = useSelector((state) => state.sharedNotes)
    const sharedNotes = Object.values(rawSharedNotes)
    const [loading, setLoading] = useState(true);





    const handleNewNote = async() => {
        setModalContent(<PostNoteModal closeModal={closeModal} notebooks={allNoteBooksObj} />)
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
        const fetchCheck = async() => {
            dispatch(thunkGetAllNotes());
            setLoading(false);
        };

        // dispatch(thunkGetAllSharedNotes())

        fetchCheck();
    }, [dispatch, noteUpdate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="homenotescontainer">
            {notesObj?.map((note) => (
                <div className="singlenotecontainer" onClick={() => handleNavigate(note.id)}>

                    <div className="deletenoteandhidetillhover" onClick={(e) => handleDeleteNoteModal(e,note.id)} style={{ cursor: 'pointer' }}>
                        <FaTimes />
                    </div>
                        <div className="singlenote" key={note.id}>
                            <h3>{note.note_title && note.note_title.length > 20 ? `${note.note_title.substring(0, 14)}...` : note.note_title}</h3>      {/* This prevents bleeding through the div  */}
                            <div>{sharedNotes.filter(shareNote => shareNote.note_id === note.id).length > 0 && <FaShareFromSquare />}</div>             {/* This shows a share icon if share notes is found on the join table  */}
                            <div>
                                {note.bodies && note.bodies.slice(0, 4).map((body, index) => (
                                    <p key={index} style={{fontSize:'small'}}>
                                        • {body.body.length > 20 ? `${body.body.substring(0, 18)}...` : body.body}                                      {/* This keeps super long strings from bleeding over the div  */}
                                    </p>
                                ))}
                            </div>
                            <div className="tasksneedsmargin">
                                <h3 className="thistoo">
                                    Tasks:
                                </h3>
                                {note.tasks && note.tasks.slice(0,4).map((task, index) =>(
                                    <div style={{display:'flex'}}>
                                        <IoMdCheckmarkCircleOutline/>
                                        <p style={{fontSize:'small', marginLeft:'5px'}} key={index}>{task.body}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3 className="thistoo">
                                        Attachments:
                                </h3>
                                {note.images && note.images.slice(0,6).map((image, index) => (
                                    <img className="imagespreviewinallnotes" key={index} src={image.image_file}></img>
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
