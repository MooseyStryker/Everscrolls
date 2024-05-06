import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSharedUser } from "../../../redux/finduser"
import { thunkPostSharedNote } from "../../../redux/sharenote"
import { thunkGetAllSharedNotesByNoteId } from "../../../redux/sharenote"
import './ShareNoteModal.css'

export default function ShareNoteModal({noteId, closeModal, note, sessionUser}){
    console.log("🚀 ~ ShareNoteModal ~ note:", note)
    const [errors, setErrors] = useState('')
    const [shareWithUser, setShareWithUser] = useState('')
    const [showUsername, setShowUsername] = useState(false)
    const [email, setEmail] = useState()
    const dispatch = useDispatch()

    const handleFindUser = async() => {
        const info = await dispatch(thunkGetSharedUser(email))
        if (info) setShareWithUser(info.findUser)



        if (email === sessionUser.email){
            setShareWithUser('')
            return setErrors("You cannot share your note using your email")

        } else if (!info.findUser.error){
            setShowUsername(true)
            setErrors('')
        } else {
            setShareWithUser('')
            setErrors(info.findUser.error)
        }
    }

    const sendShareNote = async() => {

        /*
            This checks if the note was shared, if it was it will return as an error.
        */
        const checkSentNote = await dispatch(thunkGetAllSharedNotesByNoteId(noteId))
        const wasThisNoteSent = checkSentNote.filter(note => note.user_id === shareWithUser.id);
        if (wasThisNoteSent.length !== 0) return setErrors(`This note was shared shared with ${shareWithUser.username} already`)


        /*This sends the OG creator of the note to the join table, I commented this out just incase I want to use it */
        // const firstStep = {
        //     user_id: parseInt(currentUser.id),
        //     note_id: parseInt(noteId),
        //     opened: true,
        //     permissions: "View and Edit"
        // }

        // const sentData = await dispatch(thunkPostSharedNote(firstStep))
        // console.log("🚀 ~ sendShareNote ~ sentData:", sentData)


        const sharedNoteToNewUser = {
            user_id: parseInt(shareWithUser.id),
            note_id: parseInt(noteId),
            opened:false,
            permissions: "View and Edit"
        }

        const sentData2 = await dispatch(thunkPostSharedNote(sharedNoteToNewUser))

        closeModal()


    }

    return(
        <div className="ShareNoteModalContainer">

            <div>
                <h2>
                    Who would you like to share "{note?.note_title || note?.title}" with?
                </h2>
            </div>

            <div className="findusercontainer">
                <div>
                <label>
                    Use their email to send this note to:
                    <input style={{marginLeft:'5px'}} value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                </div>
                <div>
                    <button onClick={() => handleFindUser()}>Find User by Email</button>
                </div>
                <div>
                    {shareWithUser && <div>Send this note to "{shareWithUser.username}"?</div>}
                    {errors && <p className="p-errors">{errors}</p>}
                </div>
            </div>
            {shareWithUser && <div className="sharenotesmodalbuttons">
                <button disabled={!shareWithUser} onClick={() => sendShareNote()}>Send</button>
                <button className="cancelbuttoninsharenotesmodal" onClick={() => closeModal()}>Cancel</button>
            </div>}

        </div>
    )
}
