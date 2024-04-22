import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSharedUser } from "../../redux/finduser"

export default function ShareNoteModal({noteId, closeModal}){
    const currentUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState('')
    console.log("🚀 ~ ShareNoteModal ~ errors:", errors)
    const [shareWithUser, setShareWithUser] = useState('')
    const[showUsername, setShowUsername] = useState(false)
    const [email, setEmail] = useState()
    const dispatch = useDispatch()

    const handleFindUser = async() => {
        const info = await dispatch(thunkGetSharedUser(email))
        console.log("🚀 ~ handleFindUser ~ info:", info)
        if (info) setShareWithUser(info.findUser)



        if (!info.findUser.error){
            setShowUsername(true)
            setErrors('')
        } else {
            setShareWithUser('')
            setErrors(info.findUser.error)
        }
    }

    const sendShareNote = () => {
        const firstStep = {
            user_id: currentUser.id,
            note_id: noteId,
            permissions: "View and Edit"
        }
        


        const secondStep = {
            user_id: shareWithUser.id,
            note_id: noteId,
            permissions: "View and Edit"
        }



    }

    return(
        <>
         Sharing this note? {noteId}

         <div>
            <label>
                Email this note to find user:
                <input value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button onClick={() => handleFindUser()}>Find User</button>
            <div>
                {shareWithUser && <div>Send this note to: {shareWithUser.username}?</div>}
                {errors && <p className="p-errors">{errors}</p>}
            </div>
         </div>
         <div>
            <button disabled={!shareWithUsername} onClick={() => sendShareNote()}>Send</button>
            <button onClick={() => closeModal()}>Cancel</button>
         </div>
        </>
    )
}
