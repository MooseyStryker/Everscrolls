import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { thunkPostNotebook } from "../../redux/notebook"
import './CreateNewNotebookModal.css'



export default function CreateNotebook({ closeModal, nameCheck }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [notebookName, setNootbookName] = useState("")
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (notebookName.length === 0) {
            setErrors({ notebookName: "Notebook's name is required" });
            return;
        } else if (notebookName.length > 50) {
            setErrors({ notebookName: "Notebook's name must be shorter than 100 characters long." });
            return;
        } else if (nameCheck.includes(notebookName)) {
            setErrors({ notebookName: "This notebook name is already taken." });
            return;
        }

        const createNotebook = {
            notebook_name: notebookName
        }

        const res = await dispatch(thunkPostNotebook(createNotebook))

        if (res && res.errors){
            return setErrors(res.errors)
        }

        closeModal()
    }



    return (
        <>
            <form onSubmit={handleSubmit} className="cnnm-form-container">
                <h2 className="cnnm-form-title">New Notebook</h2>
                <label className="cnnm-form-label">
                    <input
                        type="text"
                        value={notebookName}
                        onChange={(e) => setNootbookName(e.target.value)}
                        className="cnnm-form-input"
                    />
                </label>

                {/* Display errors */}
                {Object.keys(errors).map((key, i) => (
                    <p key={i} className="cnnm-form-error">
                        {errors[key]}
                    </p>
                ))}

                <div className="cnnm-form-buttoncont">
                    <button className="cnnm-form-button">Create New Notebook</button>
                    <button onClick={() => closeModal()} className="cnnm-form-button">Cancel</button>

                </div>

            </form>
        </>
    )

}
