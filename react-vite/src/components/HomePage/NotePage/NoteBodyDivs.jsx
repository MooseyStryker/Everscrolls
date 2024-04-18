import { useEffect, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate} from "react-router-dom";
import './Notes.css'
import { thunkDeleteAllNoteBody, thunkPostNotebody } from "../../../redux/notebody";




export default function NoteBodyDivs({noteid}) {
    const dispatch = useDispatch();
    const currentNoteBody = useSelector((state) => state.notebody)
    const [prevNoteBody, setPrevNoteBody] = useState({});
    const [dbUpload, setDbUpload] = useState(false)
    const [divs, setDivs] = useState([{ id: 1, text: 'Hi! Start Here!', ref: createRef() }]);




    const handleKeyPress = async(e, id) => {
        if (e.key === 'Enter') {                                                    // Hitting return will make a new div and put a useRef to the next div
            e.preventDefault();                                                     // prevents us from going to the new line
            handleSaveToLocal();                                                    // await allows the save to finish before creating a new line
            const newDiv = { id: divs.length + 1, text: '', ref: createRef() };         // Open a new div, but focused on the .length so it doesnt accidentally reassign an id that will over write my data
            const index = divs.findIndex(div => div.id === id);
            setDivs([...divs.slice(0, index + 1), newDiv, ...divs.slice(index + 1)]);
            setTimeout(() => newDiv.ref.current.focus(), 0);                            // focus the new input element
        }
        if (e.key === 'Backspace') {
            const index = divs.findIndex(div => div.id === id);
            if (divs[index].text === '' && divs.length > 1) {                           // Check if divs length is greater than 1 which prevents user from deleting all the divs
                e.preventDefault();                                                     // prevents the default delete action
                handleSaveToLocal();                                                    // await allows the delete to be saved
                const newDivs = [...divs];
                newDivs.splice(index, 1);
                setDivs(newDivs);
                if (newDivs[index]) {
                    setTimeout(() => newDivs[index].ref.current.focus(), 0);            // focus the next input element
                } else if (newDivs[index - 1]) {
                    setTimeout(() => newDivs[index - 1].ref.current.focus(), 0);         // focus the previous input element
                }
            }
        }
        if(e.key){
            handleSaveToLocal()
        }
    };

    const handleTextChange = (e, id) => {
        e.target.style.height = 'inherit';                     // Resets the height when we add text to the textarea
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the height based on scroll height
        setDivs(divs.map(div => div.id === id ? { ...div, text: e.target.value } : div));
    };


    const handleSaveToLocal = async() => {          // Saves to local storage for intuitive and fast design
        const divTexts = divs.map(div => div.text)
        localStorage.setItem(`Note ${noteid}'s Body `, JSON.stringify(divTexts))
    }


    const uploadToDatabase = async() => {        // Uploads data to DB
        console.log("Uploading data to the database...");
        dispatch(thunkDeleteAllNoteBody(noteid)) // Deletes old data in the db to keep duplicates from occuring

        const divTexts = divs.map(div => div.text);
        for (let i = 0; i < divTexts.length; i++) {
            const newNoteBody = {
                body: divTexts[i]
            }

            await dispatch(thunkPostNotebody(noteid, newNoteBody))
        }
    }



    useEffect(() => {
        // Try to retrieve the divTexts from local storage
        let divTexts = JSON.parse(localStorage.getItem(`Note ${noteid}'s Body `));


        if (!divTexts) {                                        // If there's no data in local storage, use the data from the database
            divTexts = Object.values(currentNoteBody)
            .filter(body => body.note_id == noteid)             // This is needed to make sure only the notebody that is in the noteId s printed when theres no local storage. Otherwise it will add other notes data in it. /Dumb ways to dp this
            .map(body => body.body);                            // Sometimes it pull the wrong note_body info due to currentNoteBody not updating when a note has only the default setDiv with "Hi! Start Here!" this needs to be refactored
            console.log("🚀 ~ useEffect ~ divTexts:", divTexts)

            const noteBodies = divTexts.map((text, index) => ({
                id: index + 1,
                text: text,
                ref: createRef()
            }));

            if (noteBodies.length > 0){
                setDivs(noteBodies);
            }
            setPrevNoteBody(divTexts);

            setDbUpload(true)


        } else if (divTexts && JSON.stringify(prevNoteBody) !== JSON.stringify(divTexts)) { // If local storage exists, then use that instead.
            const noteBodies = divTexts.map((text, index) => ({
                id: index + 1,
                text: text,
                ref: createRef()
            }));

            if (noteBodies.length > 0) setDivs(noteBodies); // this prevents an empty database from deleting data in notes
            setPrevNoteBody(divTexts);                      // Update prevNoteBody to the divTexts
        } else {
            // keepiing this empty allows a new note to have one div to let users to start
        }
    }, [currentNoteBody, noteid]);

    useEffect(() => {
        const localStorageTest = JSON.parse(localStorage.getItem(`Note ${noteid}'s Body `));

        if(localStorageTest){   // every .5 seconds, upload to local and database to keep data relevent
            const timeoutId = setTimeout(() => {
                handleSaveToLocal();
                uploadToDatabase();
            }, 500); // Save every 5 seconds

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


    return(
        <>
            <div>
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
        </>
    )
}
