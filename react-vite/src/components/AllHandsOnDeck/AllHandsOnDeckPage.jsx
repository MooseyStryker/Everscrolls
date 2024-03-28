import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllNotebooks } from "../../redux/notebook";
import { thunkGetAllNotes } from "../../redux/notes";
import { useNavigate } from "react-router-dom";

import './Allhands.css'

export default function AllNotebooks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotebooks = useSelector((state) => state.notebook);
    const notebooksObj = Object.values(allNotebooks)
    const allNotes = useSelector((state) => state.notes);
    const notesObj = Object.values(allNotes);
    console.log("🚀 ~ AllNotebooks ~ allNotebooks:", allNotebooks)
    console.log("🚀 ~ AllNotebooks ~ notebooksObj:", notebooksObj)
    console.log("🚀 ~ AllNotebooks ~ allNotes:", allNotes)
    console.log("🚀 ~ AllNotebooks ~ notesObj:", notesObj)



    useEffect(() => {
        dispatch(thunkGetAllNotebooks())
        dispatch(thunkGetAllNotes());
    }, [dispatch]);

    return (
        <>
            <div className="main-container-allhands">

                <div className="leftinfo">
                    <div className="info-container">
                        <div className="profile-info">
                            <div>Seach</div>
                            <div className="morebuttons">
                                <button>New Note</button>
                                <button>New Task</button>
                            </div>
                        </div>

                        <div className="search-create-note-task">
                            <div className="searchbarinhome">
                                Search
                            </div>
                            <div className="quickactionbuttons">
                                <button>New Note</button>
                                <button>New Task</button>
                            </div>
                        </div>
                        <div className="notes-task-calendar-info"></div>
                        <div className="notebooks-tags"></div>
                    </div>
                </div>


                <div className="rightinfo">


                </div>
            </div>
        </>
    );
}
