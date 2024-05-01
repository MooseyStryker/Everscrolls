import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllNotebooks } from "../redux/notebook";
import { thunkGetAllNotes } from "../redux/notes";
import { Outlet, useNavigate } from "react-router-dom";
import { thunkGetCurrentUser } from "../redux/session";
import logo from "../../../images/website_images/profile_logo.png"
import './Home.css'
import ProfileButton from "../components/Navigation/ProfileButton";
import TaskBar from "../components/Tasks/Task";
import AllNotebooks from "../components/Notebooks/GetAllNotebooks";
import { thunkPostNote } from "../redux/notes";
import { useModal } from "../context/Modal";
import PostTask from "../components/Tasks/PostTask";
import PostNoteModal from "../components/Notes/PostNoteModal";

export default function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotes = useSelector((state) => state.notes);
    const sessionUser = useSelector((state) => state.session.user);
    const allNotebooks = useSelector((state) => state.notebook);
    const allNoteBooksObj = Object.values(allNotebooks)

    const [showProfile, setShowProfile] = useState(false)

    const [showSecondContainer, setShowSecondContainer] = useState(false)
    const [showTaskContainer, setShowTaskContainer] = useState(false)
    const [showNotebookContainer, setShowNotebookContainer] = useState(false)

    const { closeModal } = useModal()
    const { setModalContent } = useModal()

    const postTaskModal = () => {
        setModalContent(<PostTask closeModal={closeModal}/>)
    }


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

    const handleProfileClick = () => {
        setShowProfile(!showProfile)
    }

    const handleNewNote = async() => {
        setModalContent(<PostNoteModal closeModal={closeModal} notebooks={allNoteBooksObj} />)
    }


    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(thunkGetCurrentUser());
            if (res.errors) navigate('/') // If no user found, navigate. Tried if(!sessionUser) but randomly would navigate if refreshed enough times
        };

        fetchData();
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
                                    <h3 className="fnlncont">{sessionUser?.first_name} {sessionUser?.last_name}</h3>
                                </div>
                                <div>
                                    <h4 className="emailmargin">{sessionUser?.email}</h4>
                                </div>
                            </div>

                        </div>

                        <div className="search-create-note-task">
                            {/* <div className="searchbarinhome">
                                Search
                            </div> */}
                            <div className="quickactionbuttons">
                                <button className="quickactionbuttons-note" onClick={handleNewNote}>New Note</button>
                                <button onClick={postTaskModal}>New Task</button>
                            </div>
                        </div>

                        <div className="notes-task-calendar-info">
                            <div onClick={() => navigate('/home')} className="home-buttons"><h2>Home</h2></div>
                            {/* <div className="home-buttons">Notes</div> */}
                            <div onClick={() => handleTaskClick()}  className="home-buttons"><h2>Tasks</h2></div>
                            {/* <div className="home-buttons">Calendar</div> */}
                        </div>

                        <div className="notebooks-tags">
                            <div className="home-buttons" onClick={handleNotebooksClick}><h2>Notebooks</h2></div>
                        </div>

                    </div>
                </div>

                </div>


                {showSecondContainer && (
                    <div className={`secondcontainer ${showSecondContainer ? 'open' : ''}`}>
                        <div className="backoffsecond" onClick={() => setShowSecondContainer(false)}>
                            &lt;
                        </div>
                        {showTaskContainer && (
                            <div className="taskcontainersidebar">
                                <TaskBar />
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
