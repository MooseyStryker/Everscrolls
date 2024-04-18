import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import './AllNotesAndTasks.css'
import shipView from '../../../../images/website_images/bow.png'
import { thunkGetCurrentUser } from "../../redux/session";
import AllNotes from "../Notes/HomeNotesContainer";
import { thunkPostNote } from "../../redux/notes";
import ScratchPad from "../Scratch/ScratchPad";

export default function AllNotesAndTasks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const allNotebooks = useSelector((state) => state.notebook);
    const allNotebooksObj = Object.values(allNotebooks)

    console.log("🚀 ~ AllNotesAndTasks ~ allNotebooks:", allNotebooks)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await dispatch(thunkGetCurrentUser());
            setLoading(false);
        };

        fetchUser();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }
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
                                <div><h5>Let's get this journey started</h5></div>
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
                                        <AllNotes />
                                    </div>
                                </div>
                            </div>
                            <div className="scratchpad-cal">
                                <div className="scratchinhome"><ScratchPad notebooks={allNotebooksObj} /></div>
                                {/* <div className="bonus-calendar">calendar Container</div> */}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}
