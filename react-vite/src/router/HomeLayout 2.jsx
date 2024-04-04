import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllNotebooks } from "../redux/notebook";
import { thunkGetAllNotes } from "../redux/notes";
import { Outlet, useNavigate } from "react-router-dom";

import './Home.css'
import { thunkGetCurrentUser } from "../redux/session";

export default function HomeLayout({ children }) { // Add children here
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotebooks = useSelector((state) => state.notebook);
    const notebooksObj = Object.values(allNotebooks)
    const allNotes = useSelector((state) => state.notes);
    const notesObj = Object.values(allNotes);
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("🚀 ~ HomeLayout ~ sessionUser:", sessionUser)
    // console.log("🚀 ~ AllNotebooks ~ allNotebooks:", allNotebooks)
    // console.log("🚀 ~ AllNotebooks ~ notebooksObj:", notebooksObj)
    // console.log("🚀 ~ AllNotebooks ~ allNotes:", allNotes)
    // console.log("🚀 ~ AllNotebooks ~ notesObj:", notesObj)

    useEffect(() => {
        dispatch(thunkGetAllNotebooks())
        dispatch(thunkGetAllNotes());
        dispatch(thunkGetCurrentUser())
    }, [dispatch]);

    return (
        <div className="homecontainer"> {/* Add this line */}
            <div className="main-container-allhands">
                <div className="leftinfo">
                    <div className="info-container">
                        <div className="profile-info">
                            <div>Logo for profile</div>
                            <div className="Profile-info">
                                <div>First and last n</div>
                                <div>email</div>
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
                        <div className="notes-task-calendar-info">
                            <button>Home</button>
                            <button>Notes</button>
                            <button>Tasks</button>
                            <button>Calendar</button>
                        </div>
                        <div className="notebooks-tags">
                            <button>Noteooks</button>
                            <button>Tags(Bonus)</button>
                        </div>
                    </div>
                </div>
            </div>
            {children} {/* Add this line */}
            <Outlet />
        </div> // Close the new div here
    );
}
