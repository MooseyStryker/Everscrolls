import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllNotebooks, thunkPostNotebook } from "../../redux/notebook";
import { useNavigate } from "react-router-dom";

export default function AllNotebooks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allNotebooks = useSelector((state) => state.notebook);
    const notebooksObj = Object.values(allNotebooks)

    useEffect(() => {
        dispatch(thunkGetAllNotebooks());
    }, [dispatch]);

    return (
        <div>
            <div>
                <h1>Notebooks</h1>
            </div>
            {allNotebooks && notebooksObj.map((notebook) => (
                <div key={notebook.user_id}>
                    <p>Notebook Name: {notebook.notebook_name}</p>
                </div>
            ))}

            <div>
                <button onClick={() => navigate('/notebooks/new')}>Create new Notebook</button>
            </div>
        </div>
    );
}
