import { useEffect, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { thunkGetCurrentUser } from "../../../redux/session";
import { thunkGetNote, thunkPutNote } from "../../../redux/notes";
import './Notes.css'
import { thunkDeleteAllNoteBody, thunkGetAllNotebody, thunkPostNotebody } from "../../../redux/notebody";
import TaskBar from "../../Tasks/Task";
import SingleNoteTask from "../../Tasks/SingleNoteTask";



export default function NoteHomePage() {
    const { noteid } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const currentNote = useSelector((state) => state.notes[noteid]);
    const currentNoteBody = useSelector((state) => state.notebody)
    console.log("🚀 ~ NoteHomePage ~ currentNoteBody:", currentNoteBody)
    const tasks = useSelector((state) => state.tasks)
    const tasksObj = Object.values(tasks)

    const [prevNoteBody, setPrevNoteBody] = useState({});
    const [title, setTitle] = useState()
    const [isEditing, setIsEditing] = useState(false);
    const [dbUpload, setDbUpload] = useState(false)

    const [divs, setDivs] = useState([{ id: 1, text: 'Hi! Start Here!', ref: createRef() }]);

    if (!divs){ // This will prevent an issue occuring where the user deletes all the divs and now doesn't have a place to start
        setDivs({ id: 1, text: 'Hi! Start Here!', ref: createRef() })
    }

    const handleKeyPress = async(e, id) => {
        if (e.key === 'Enter') {
            e.preventDefault();                                                         // prevents us from going to the new line

            handleSaveToLocal();                                                 // await allows the save to finish before creating a new line


            const newDiv = { id: divs.length + 1, text: '', ref: createRef() };         // Open a new div, but focused on the .length so it doesnt accidentally reassign an id that will over write my data
            const index = divs.findIndex(div => div.id === id);
            setDivs([...divs.slice(0, index + 1), newDiv, ...divs.slice(index + 1)]);
            setTimeout(() => newDiv.ref.current.focus(), 0);                            // focus the new input element
        }
        if (e.key === 'Backspace') {
            const index = divs.findIndex(div => div.id === id);
            if (divs[index].text === '' && divs.length > 1) { // Check if divs length is greater than 1 which prevents user from deleting all the divs
                e.preventDefault(); // prevents the default delete action

                handleSaveToLocal(); // await allows the delete to be saved

                const newDivs = [...divs];
                newDivs.splice(index, 1);
                setDivs(newDivs);
                if (newDivs[index]) {
                    setTimeout(() => newDivs[index].ref.current.focus(), 0); // focus the next input element
                } else if (newDivs[index - 1]) {
                    setTimeout(() => newDivs[index - 1].ref.current.focus(), 0); // focus the previous input element
                }
            }
        }

        if(e.key){
            handleSaveToLocal()
            console.log('divs', divs)
        }
    };

    const handleTextChange = (e, id) => {
        e.target.style.height = 'inherit';                     // Resets the height when we add text to the textarea
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
        console.log("Uploading data to the database...");
        dispatch(thunkDeleteAllNoteBody(noteid)) // Deletes old data in the db to keep duplicates from occuring

        const divTexts = divs.map(div => div.text);
        for (let i = 0; i < divTexts.length; i++) {
            const newNoteBody = {
                body: divTexts[i]
            }

            await dispatch(thunkPostNotebody(noteid, newNoteBody))
            // setDivs(divs) // this Allows me to hit the save button and it wont cause the page to lose the new data until refresh.
        }
    }

    const handleSaveToLocal = async() => {
        const divTexts = divs.map(div => div.text)
        console.log("🚀 ~ handleSaveToLocal ~ divTexts:", divTexts)
        localStorage.setItem(`Note ${noteid}'s Body `, JSON.stringify(divTexts))
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


    useEffect(() => {
        // Try to retrieve the divTexts from local storage
        let divTexts = JSON.parse(localStorage.getItem(`Note ${noteid}'s Body `));

        console.log("🚀 ~ useEffect ~ divTexts:", divTexts)

        if (!divTexts) {  // If there's no data in local storage, use the data from the database
            console.log("🚀 ~ testing here:")
            console.log("🚀 ~ useEffect ~ currentNoteBody:", currentNoteBody)

            divTexts = Object.values(currentNoteBody).map(body => body.body);
            const noteBodies = divTexts.map((text, index) => ({
                id: index + 1,
                text: text,
                ref: createRef()
            }));
            console.log("🚀 ~ noteBodies ~ noteBodies:", noteBodies)

            if (noteBodies.length > 0){
                console.log('Pushing data to Divs...')
                setDivs(noteBodies);
            }
            setPrevNoteBody(divTexts);

            setDbUpload(true)


        } else if (divTexts && JSON.stringify(prevNoteBody) !== JSON.stringify(divTexts)) {
            const noteBodies = divTexts.map((text, index) => ({
                id: index + 1,
                text: text,
                ref: createRef()
            }));

            if (noteBodies.length > 0) setDivs(noteBodies);                                      // this prevents any empty spaces from being downloaded from the db if there was no notebodies found
            setPrevNoteBody(divTexts);                                                           // Update prevNoteBody to the divTexts
        } else {
                                                                                                 // keepiing this empty allows a new note to have one div to let users to start
        }
    }, [currentNoteBody, noteid]); // Run the effect when either currentNoteBody or noteid changes


    useEffect(() => {
        const localStorageTest = JSON.parse(localStorage.getItem(`Note ${noteid}'s Body `));
        if(localStorageTest){
            const timeoutId = setTimeout(handleSaveNoteBody, 2000); // Save every 5 seconds

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [divs]);


    // We see if localstorage exists and if the backend finished uploading the data, this is incase the user logged in to another device and theres no local storage
    // The check is needed because it will upload the empty divs into local storage, preventing the backend from uploading
    useEffect(() => {
        const localStorageTest = JSON.parse(localStorage.getItem(`Note ${noteid}'s Body `));
        if(localStorageTest && dbUpload == true) setTimeout(handleSaveToLocal, 0);
    }, [divs]);

    useEffect(() => {       // This ensures the size of the div remains even if the webpage refreshes, instead of shrinking
        divs.forEach(div => {
            if (div.ref.current) {
                div.ref.current.style.height = 'inherit';
                div.ref.current.style.height = `${div.ref.current.scrollHeight}px`;
            }
        });
    }, [divs]);



    return (
        <div className="note-notes-container">
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

                    {/* <button onClick={handleSaveNoteBody}>Save Note to DB</button> */}
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
