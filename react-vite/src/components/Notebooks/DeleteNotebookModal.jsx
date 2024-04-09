import { useDispatch } from "react-redux"
import { thunkDeleteNotebook } from "../../redux/notebook"
import { useNavigate } from "react-router-dom";

import './DeleteNotebookModal.css'

export default function DeleteNotebook({notebookId, closeModal}){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        dispatch(thunkDeleteNotebook(notebookId))
        navigate('/home')
        closeModal() // Close the modal after deleting the task
    }
    return (
        <div className="cnnm-modal-container">
            <h1 style={{margin:'20px'}}>Delete this notebook?</h1>
            <p style={{marginBottom:'20px'}}>This action cannot be undone. Please confirm your decision.</p>
            <div className="cnnm-button-container">
                <button onClick={handleDelete} className="cnnm-button-delete">Delete</button>
                <button onClick={closeModal} className="cnnm-button-cancel">Cancel</button>
            </div>
        </div>
    )

}
