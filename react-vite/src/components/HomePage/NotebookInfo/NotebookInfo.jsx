import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import './NotebookInfo.css'
import shipView from '../../../../../images/website_images/bow.png'
import { thunkGetCurrentUser } from "../../../redux/session";
import { thunkPostNote } from "../../../redux/notes";
import ScratchPad from "../../Scratch/ScratchPad";
import { useParams } from "react-router-dom";
import AllNotesInNotebook from "../NotesInNoteBook/NotesinNotebook";

export default function IndividualNotebookInfo() {
    const {notebookId} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const singleNotebook = useSelector((state) => state.notebook[notebookId]);
    console.log("🚀 ~ IndividualNotebookInfo ~ singleNotebook:", singleNotebook)



    useEffect(() => {
        dispatch(thunkGetCurrentUser)
        if (!singleNotebook) navigate('/home')
    }, [dispatch])

    return (
        <>
            <div className="main-container-home">
                <div className="rightinfo">
                    <div className="pictureontop">
                        <img src={shipView} alt='shipview' className='shipview'></img>
                    </div>

                    <div className="homenotelayout">

                        <div className="home-page-text">
                            <div>
                                <div><h5>This is the notes in notebook: {singleNotebook?.notebook_name}</h5></div>
                                <div>
                                <h2>{sessionUser?.first_name} Mariner's Jorunal</h2>
                                </div>
                            </div>
                            {/* <div>in the bottle!</div> */}
                        </div>

                        <div className="note-cal-task">
                            <div className="allnotes-alltasks-connectedtouser">

                                <div className="notesinhome">
                                    <div className="note-individual">
                                        {singleNotebook &&
                                        <AllNotesInNotebook notebook={singleNotebook} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="scratchpad-cal">
                                <div className="scratchinhome"><ScratchPad notebook={singleNotebook} /></div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}
