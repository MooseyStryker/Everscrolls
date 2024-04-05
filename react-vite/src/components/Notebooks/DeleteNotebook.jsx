import { useDispatch } from "react-redux"
import { thunkDeleteNotebook } from "../../redux/notebook"

export default function DeleteNotebook({notebookId, closeModal}){
    console.log("🚀 ~ DeleteNotebook ~ notebookId:", notebookId)
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(thunkDeleteNotebook(notebookId))
        closeModal() // Close the modal after deleting the task
    }
    return(
        <>
            <h1>Delete this notebook?</h1>
            <p>This action cannot be undone. Please confirm your decision.</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </>
    )
}
