import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllNotebooks } from "../redux/notebook";
import { thunkGetAllNotes } from "../redux/notes";
import { Outlet, useNavigate } from "react-router-dom";
import { thunkGetCurrentUser } from "../redux/session";
import { useModal } from "../context/Modal";

import logo from "../../../images/website_images/profile_logo.png"
import './Home.css'
import ProfileButton from "../components/Navigation/ProfileButton";
import TaskBar from "../components/Tasks/Task";
import AllNotebooks from "../components/Notebooks/GetAllNotebooks";

export default function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotebooks = useSelector((state) => state.notebook);
    const allNotes = useSelector((state) => state.notes);
    const sessionUser = useSelector((state) => state.session.user);
    const notebooksObj = Object.values(allNotebooks)
    const notesObj = Object.values(allNotes);
    const [showProfile, setShowProfile] = useState(false)
    const [showNotebooks, setShowNotebooks] = useState(false)

    const [showSecondContainer, setShowSecondContainer] = useState(false)

    const [showTaskContainer, setShowTaskContainer] = useState(false)
    const [showNotebookContainer, setShowNotebookContainer] = useState(false)


    const handleTaskClick = () => {
        setShowSecondContainer(true);
        setShowTaskContainer(true);
        setShowNotebookContainer(false);
    }

    const handleNotebooksClick = () => {
        setShowSecondContainer(true);
        setShowNotebookContainer(true);
        setShowTaskContainer(false);
    }



    // if (allNotebooks){
    //     if(!sessionUser) navigate('/');
    // }
    // if(!sessionUser) navigate('/');


    const handleProfileClick = () => {
        setShowProfile(!showProfile)
    }


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
                            <div onClick={() => handleTaskClick()}  className="home-buttons">Tasks</div>
                            {/* <div className="home-buttons">Calendar</div> */}
                        </div>

                        <div className="notebooks-tags">
                            <div className="home-buttons" onClick={handleNotebooksClick}>Notebooks</div>
                        </div>

                    </div>
                </div>
            </div>
            {showSecondContainer && (
                <div className={`secondcontainer ${showSecondContainer ? 'open' : ''}`}>
                    <div className="backoffsecond" onClick={() => setShowSecondContainer(false)}>
                        &lt; {/* This is a left caret (or arrow) icon */}
                    </div>
                    {showTaskContainer && (
                        <div className="taskcontainersidebar">
                            <TaskBar notes={allNotes} />
                        </div>
                    )}
                    {showNotebookContainer && (
                        <div className="notebookcontainersidebar">
                            <AllNotebooks />
                        </div>
                    )}
                </div>
            )}
            {children}
            <Outlet />
        </div>
    );
}
