import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllNotebooks } from "../redux/notebook";
import { thunkGetAllNotes } from "../redux/notes";
import { Outlet, useNavigate } from "react-router-dom";
import { thunkGetCurrentUser } from "../redux/session";
import { useModal } from "../context/Modal";

import logo from "../../../images/website_images/profile_logo.png"
import './Home.css'
import ProfileModal from "../components/Modals/ProfileModal";
import ProfileButton from "../components/Navigation/ProfileButton";

export default function HomeLayout({ children }) { // Add children here
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotebooks = useSelector((state) => state.notebook);
    const allNotes = useSelector((state) => state.notes);
    const sessionUser = useSelector((state) => state.session.user);
    const notebooksObj = Object.values(allNotebooks)
    const notesObj = Object.values(allNotes);

    if (allNotebooks){
        if(!sessionUser) navigate('/');
    }

    const [showProfile, setShowProfile] = useState(false)

    const handleProfileClick = () => {
        setShowProfile(!showProfile)
    }

    const { setModalContent } = useModal()

    const [showNotebooks, setShowNotebooks] = useState(false)

    const handleNotebooksClick = () => {
        setShowNotebooks(!showNotebooks);
      };

    useEffect(() => {
        dispatch(thunkGetCurrentUser())
        dispatch(thunkGetAllNotebooks())
        dispatch(thunkGetAllNotes());
    }, [dispatch]);

    return (
        <div className="homecontainer">
            <div className="main-container-allhands">
                <div className="leftinfo">
                    <div className="info-container">
                        <div onClick={handleProfileClick} className="profile-info">
                                {showProfile && <ProfileButton />}

                            <div>
                                <img src={logo} alt="profile_logo" className="profi_logo" />
                            </div>

                           <div className="user-profile-info">
                                <div>
                                    {sessionUser?.first_name}
                                    {sessionUser?.last_name}
                                </div>
                                <div>
                                    {sessionUser?.email}
                                </div>
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
                            <div onClick={() => navigate('/home')} className="home-buttons">Home</div>
                            <div className="home-buttons">Notes</div>
                            <div className="home-buttons">Tasks</div>
                            <div className="home-buttons">Calendar</div>
                        </div>

                        <div className="notebooks-tags">

                            <div className="home-buttons" onClick={handleNotebooksClick}>Notebooks</div>
                                {showNotebooks && notebooksObj.map(notebook => (
                                    <div className="notebookshowdiv" key={notebook.id}>{notebook.notebook_name}</div>
                                ))}
                            <div className="home-buttons">Tags(Bonus)</div>

                        </div>

                    </div>
                </div>
            </div>
            {children} {/* Add this line */}
            <Outlet />
        </div> // Close the new div here
    );
}
