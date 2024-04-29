import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteNote, thunkGetAllNotes } from "../../../redux/notes";
import { thunkGetAllNotesSharedWithUser } from "../../../redux/sharenote";
import { useNavigate } from "react-router-dom";
import NotesBody from "../../Notes_body/NoteBody";
import { FaTimes } from 'react-icons/fa';
import { thunkPostNote } from "../../../redux/notes";
import { thunkDeleteAllNoteBody } from "../../../redux/notebody";
import { useModal } from "../../../context/Modal";
import DeleteNoteModal from "../DeleteNoteModal";
import PostNoteModal from "../PostNoteModal";
import { FaShareFromSquare } from "react-icons/fa6";
import { thunkGetAllSharedNotes } from "../../../redux/sharenote";




export default function SharedAllNotes({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const { setModalContent } = useModal()
    const [noteUpdate, setNoteUpdate] = useState(false)
    const allNotebooks = useSelector((state) => state.notebook);
    const allNoteBooksObj = Object.values(allNotebooks)

    const rawSharedNotes = useSelector((state => state.sharedNotes))
    const sharedNotes = Object.values(rawSharedNotes)
    console.log("🚀 ~ SharedAllNotes ~ sharedNotes:", sharedNotes)

    const [loading, setLoading] = useState(true);


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
        dispatch(thunkGetAllNotesSharedWithUser(user?.id))

        fetchCheck();
    }, [dispatch, noteUpdate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="homenotescontainer">
            {sharedNotes?.map((note) => (
                <div className="singlenotecontainer" onClick={() => handleNavigate(note.id)}>
                    {note.note_id}

                    <div className="deletenoteandhidetillhover" onClick={(e) => handleDeleteNoteModal(e,note.id)} style={{ cursor: 'pointer' }}>
                        <FaTimes />
                    </div>
                        <div className="singlenote" key={note.id}>
                            <h2 style={{marginBottom:'15px'}}>{note.note_title && note.note_title.length > 20 ? `${note.note_title.substring(0, 14)}...` : note.note_title}</h2>
                            <FaShareFromSquare />

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
        </div>
    );


}
