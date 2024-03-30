import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetAllNotebody } from "../../redux/notebody";

export default function NotesBody({ note_id }) {
    const dispatch = useDispatch();
    const allNoteBody = useSelector((state) => state.notebody)

    // Filter the note bodies that belong to the specific note
    const noteBody = Object.values(allNoteBody).filter(body => body.note_id === note_id);

    useEffect(() => {
        dispatch(thunkGetAllNotebody(note_id))
    }, [dispatch, note_id])

    return (
        <>
            {noteBody && noteBody.map((body, index) => (
                <p key={index}>{body.body}</p>
            ))}
        </>
    );
}
