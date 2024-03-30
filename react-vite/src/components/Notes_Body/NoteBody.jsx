import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AllNotes() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotes = useSelector((state) => state.notes);
    const allNoteBody = useSelector((state) => state.notebody)
    const notesObj = Object.values(allNotes);


    return(
        <>
            
        </>
    )
}
