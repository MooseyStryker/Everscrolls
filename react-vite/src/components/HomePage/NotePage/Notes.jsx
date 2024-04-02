import { useEffect, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { thunkGetCurrentUser } from "../../../redux/session";
import { thunkGetNote, thunkPutNote } from "../../../redux/notes";
import './Notes.css'
import { thunkDeleteAllNoteBody, thunkGetAllNotebody, thunkPostNotebody } from "../../../redux/notebody";



export default function NoteHomePage() {
    const { noteid } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const currentNote = useSelector((state) => state.notes[noteid]);

    const currentNoteBody = useSelector((state) => state.notebody)

    const [prevNoteBody, setPrevNoteBody] = useState({});
    const [title, setTitle] = useState()
    console.log("🚀 ~ NoteHomePage ~ title:", title)
    const [isEditing, setIsEditing] = useState(false);

    const [divs, setDivs] = useState([{ id: 1, text: 'hello', ref: createRef() }]);

    const handleKeyPress = (e, id) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // prevents us from going to the new line
            const newDiv = { id: divs.length + 1, text: '', ref: createRef() }; // Open a new div, but focused on the .length so it doesnt accidentally reassign an id that will over write my data
            const index = divs.findIndex(div => div.id === id);
            setDivs([...divs.slice(0, index + 1), newDiv, ...divs.slice(index + 1)]);
            setTimeout(() => newDiv.ref.current.focus(), 0); // focus the new input element
        }
        if (e.key === 'Backspace') {
            const index = divs.findIndex(div => div.id === id);
            if (divs[index].text === '') {
                e.preventDefault(); // prevents the default delete action
                const newDivs = [...divs];
                newDivs.splice(index, 1);
                setDivs(newDivs);
                if (newDivs[index]) {
                    setTimeout(() => newDivs[index].ref.current.focus(), 0); // focus the next input element
                }
            }
        }
    };

    // This is chagned to try out text area
    const handleTextChange = (e, id) => {
        e.target.style.height = 'inherit'; // Resets the height when we add text to the textarea
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the height based on scroll height
        setDivs(divs.map(div => div.id === id ? { ...div, text: e.target.value } : div));
    };


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

    const handleSaveNoteBody = async() => {

        dispatch(thunkDeleteAllNoteBody(noteid))

        const divTexts = divs.map(div => div.text);
        for (let i = 0; i < divTexts.length; i++) {
            const newNoteBody = {
                body: divTexts[i]
            }

            await dispatch(thunkPostNotebody(noteid, newNoteBody))
        }
    }

    useEffect(() => {
        dispatch(thunkGetAllNotebody(noteid))
        dispatch(thunkGetNote(noteid));
        dispatch(thunkGetCurrentUser);
    }, [dispatch, noteid]);

    useEffect(() => {
        if (currentNote && !title) { // This will pull data when coming in but wont keep refreshing title when dispatch new edit titl
            setTitle(currentNote.note_title);
            console.log("🚀 ~ useEffect ~ currentNote:", currentNote.note_title)
        }
        console.log("Grabbing title useEffect")
    }, [currentNote]);


    useEffect(() => {
        if (currentNoteBody && JSON.stringify(prevNoteBody) !== JSON.stringify(currentNoteBody)) {
            const noteBodiesArray = Object.values(currentNoteBody);
            const noteBodies = noteBodiesArray.map((body, index) => ({
                id: index + 1,
                text: body.body,
                ref: createRef()
            }));
            setDivs(noteBodies);
            setPrevNoteBody(currentNoteBody); // Update prevNoteBody to the currentNoteBody
        }
    }, [currentNoteBody]);


    return (
        <>
            <div className="home-notes">
                <div className="top-bar-in-notes">
                    <div className="directory"></div>
                    {/* <div className="share">
                        <button>Share</button>
                        <div className="directory">s</div>
                    </div> */}
                </div>
                <div className="main-notes-page">
                    {/* <div className="edit-bar-notes">
                        <div>
                            Editing note bar
                        </div>
                    </div> */}
                    <div className="notesinfocontainer">
                        <div className="notesinfo">
                            <div>
                                { isEditing ? (
                                    <input
                                        className="titleinputedit"
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                        onBlur={handleBlur}
                                        autoFocus
                                    />
                                ) : (
                                    <h1 style={{color:'grey'}} onClick={handleTitleClick}>
                                        {!title || title === "Untitled" ? "Enter a title" : title}
                                    </h1>

                                )}

                            </div>
                            <button onClick={handleSaveNoteBody}>Save note</button>
                            <div className="notebody-container">
                                {divs.map(div => (
                                    <div key={div.id}>
                                        <textarea
                                            className="noteinput"
                                            value={div.text}
                                            onChange={(e) => handleTextChange(e, div.id)}
                                            onKeyDown={(e) => handleKeyPress(e, div.id)}
                                            ref={div.ref}
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}
