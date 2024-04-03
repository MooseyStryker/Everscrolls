import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGettingAllOfTheTasks, thunkUpdateTask } from "../../redux/tasks"
import { useModal } from "../../context/Modal"
import PostTask from "./PostTask"
import PutTask from "./PutTask"
import './Task.css'
import DeleteTask from "./DeleteTask"


export default function SingleNoteTask({ noteId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const { setModalContent } = useModal()

    const tasks = useSelector((state) => state.tasks)
    const tasksObj = Object.values(tasks)


    const postTaskModal = () => {
        setModalContent(<PostTask closeModal={closeModal} singleNoteId={noteId}/>)
    }

    const putTaskModal = (task) => {
        setModalContent(<PutTask task={task} closeModal={closeModal} />)
    }

    const deleteTaskModal = (e, taskId) => {
        e.stopPropagation();
        setModalContent(<DeleteTask taskId={taskId} closeModal={closeModal} />)

    }

    const changeComplete = async(e, taskBody, taskDueDate, noteId, taskId, taskComplete) => {
        e.preventDefault();

        const updateComplete = {
            body: taskBody,
            due_date: taskDueDate || '',
            complete: !taskComplete,
            note_id: noteId
        }

        const res = await dispatch(thunkUpdateTask(noteId, taskId, updateComplete))

        if (res && res.errors) {
            return res
        }
    }


    useEffect(() => {
        dispatch(thunkGettingAllOfTheTasks())
    }, [dispatch])

    return(
        <div className="taskcontainer">
            <div>
                <h1>Tasks</h1>
            </div>
            <div>{tasksObj?.filter(task => task.note_id == noteId).length} tasks</div>
            <div>

                {tasksObj?.filter(task => task.note_id == noteId).map((task, index) => (
                    <div className="individualtaskcontainer">

                        <div className="completioncontainer">
                            <div className="aligncircle">
                                <div
                                    className={`circle ${task.complete ? 'completed' : ''}`}
                                    onClick={(e) => changeComplete(e, task.body, task.due_date, task.note_id, task.id, task.complete)}
                                ></div>
                            </div>
                            <div
                                className={`eachtask ${task.complete ? 'completed-task' : ''}`}
                                onClick={() => putTaskModal(task)}
                                key={index}
                            >
                                <h3>
                                    {task && task.body}
                                </h3>
                            </div>
                        </div>

                        <div className="buttoncontainerfortaskdelete">
                            <button onClick={(e) => deleteTaskModal(e, task.id)}>Delete</button>
                        </div>

                    </div>
                ))}


            </div>
            <div>
                <button onClick={postTaskModal}>Add a new Task</button>
            </div>
        </div>
    )
}
