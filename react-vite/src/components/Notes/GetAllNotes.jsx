import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllNotes } from "../../redux/notes";
import { useNavigate } from "react-router-dom";

export default function AllNotes() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotes = useSelector((state) => state.notes);
    const notesObj = Object.values(allNotes);

    useEffect(() => {
        dispatch(thunkGetAllNotes());
    }, [dispatch]);

    return (
        <div>
            {/* Map feature to show just the note_title */}
            {notesObj.map((note) => (
                <div key={note.id}>
                    <h2>Note Title: {note.note_title}</h2>
                    {notesObj.map((note) => (
                        <div key={note.id}>
                        <h4>Bodies for {note.note_title}:</h4>
                        {note.bodies.map((body, index) => (
                            <p key={index}>{body.content}</p>
                        ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
