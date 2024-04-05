import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllNotebooks, thunkPostNotebook, thunkPutNotebook } from "../../redux/notebook";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './GetAllNotebooks.css'
import CreateNotebook from "./CreateNewNotebook";
import DeleteNotebook from "./DeleteNotebook";

export default function AllNotebooks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const { setModalContent } = useModal()
    const [editingNotebookId, setEditingNotebookId] = useState(null);
    const [editedName, setEditedName] = useState('');


    const allNotebooks = useSelector((state) => state.notebook);
    const notebooksObj = Object.values(allNotebooks)


    const postNotebooks = () => {
        setModalContent(<CreateNotebook closeModal={closeModal} />)
    }


    const deleteNotebook = (notebookId) =>{
        setModalContent(<DeleteNotebook notebookId={notebookId} closeModal={closeModal}/>)

    }

    const handleEdit = (notebook) => {
        setEditingNotebookId(notebook.id);
        setEditedName(notebook.notebook_name);
    }

    const handleSave = (notebookId) => {
        setEditingNotebookId(null);
        putNotebook(notebookId);
    }

    const putNotebook = async(notebookId) => {
        const newChanges = {
            notebook_name: editedName
        }
        const res = dispatch(thunkPutNotebook(newChanges, notebookId))
    }




    useEffect(() => {
        dispatch(thunkGetAllNotebooks());
    }, [dispatch]);

    return (
        <div>
            <div className="titlecontainernotebook">
                <h1>Notebooks</h1>
            </div>
                {allNotebooks && notebooksObj.map((notebook) => (
                    <div className="notebookstuffcontainer" key={notebook.user_id}>
                        <div>
                            {editingNotebookId === notebook.id ? (
                                <input
                                    className="notebooknameinput"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onBlur={() => handleSave(notebook.id)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleSave(notebook.id);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="notebookname" onDoubleClick={() => handleEdit(notebook)}>
                                    <h3>{notebook.notebook_name}</h3>
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() =>deleteNotebook(notebook.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            <div>
                <button onClick={postNotebooks}>Create new Notebook</button>
            </div>
        </div>
    );
}
