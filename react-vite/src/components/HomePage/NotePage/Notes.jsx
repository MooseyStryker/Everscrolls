import { useEffect, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetCurrentUser } from "../../../redux/session";
import { thunkGetNote, thunkPutNote } from "../../../redux/notes";
import './Notes.css'
import { thunkGetAllNotebody } from "../../../redux/notebody";
import TaskBar from "../../Tasks/Task";
import SingleNoteTask from "../../Tasks/SingleNoteTask";
import NoteBodyDivs from "./NoteBodyDivs";
import { useModal } from "../../../context/Modal";
import ShareNoteModal from "../../Notes/SharedNotes/ShareNoteModal";



export default function NoteHomePage() {
    const { noteid } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const currentNote = useSelector((state) => state.notes[noteid]);
    const { closeModal, setModalContent } = useModal()


    const tasks = useSelector((state) => state.tasks)
    const tasksObj = Object.values(tasks)

    const [title, setTitle] = useState()
    const [isEditing, setIsEditing] = useState(false);


    const handleShareNote = () => {
        setModalContent(<ShareNoteModal noteId={noteid} closeModal={closeModal}/>)
    }

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        handleEditNote(noteid)
    };

    const handleEditNote = async (noteid) => {

        const edittedNote = {
            title:title
        }

        const res = await dispatch(thunkPutNote(edittedNote, noteid))
    }

    useEffect(() => {
        dispatch(thunkGetAllNotebody(noteid))
        dispatch(thunkGetNote(noteid));
        dispatch(thunkGetCurrentUser);

    }, [dispatch, noteid]);

    useEffect(() => {
        if (currentNote && !title) { // This will pull data when coming in but wont keep refreshing title when dispatch new edit titl
            setTitle(currentNote.note_title);
        }
    }, [currentNote]);



    return (
        <div className="note-notes-container">
            <div className="home-notes">
                <div className="top-bar-in-notes">
                    <div className="directory"></div>
                </div>
                <div className="main-notes-page">

                    <button onClick={() => handleShareNote()}> Share Note </button>

                    <div className="notesinfocontainer">
                        <div className="notesinfo">
                            <div className="titleinfo-needsmargin">
                                { isEditing ? (
                                    <input
                                        className="titleinputedit"
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                        onBlur={handleBlur}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                handleBlur();
                                            }
                                        }}
                                        autoFocus
                                    />
                                ) : (
                                    <h1 style={{color:'grey'}} onClick={handleTitleClick}>
                                        {!title || title === "Untitled" ? "Enter a title" : title}
                                    </h1>

                                )}

                            </div>
                            <div className="notebody-container">
                                <NoteBodyDivs noteid={noteid} />
                            </div>
                            <div className="taskandattachmentscontainer">
                                <div className="task-store-container">

                                    <div>
                                        <SingleNoteTask noteId={noteid} noteTitle={title} />
                                    </div>
                                </div>

                                {/* <div className="attachment-store-container">
                                    <h2 className="task-store">Attachments</h2>
                                </div> */}

                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
