import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGettingAllOfTheTasks } from "../../redux/tasks"
import { useModal } from "../../context/Modal"
import PostTask from "./PostTask"
import PutTask from "./PutTask"
import './Task.css'
import DeleteTask from "./DeleteTask"


export default function TaskBar() {// I want to pass in my notes variable from homeLayout
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const tasks = useSelector((state) => state.tasks)
    console.log("🚀 ~ TaskBar ~ tasks:", tasks)

    const tasksObj = Object.values(tasks)

    const { setModalContent } = useModal()

    const postTaskModal = () => {
        setModalContent(<PostTask closeModal={closeModal}/>)
    }

    const putTaskModal = (task) => {
        setModalContent(<PutTask task={task} closeModal={closeModal} />)
    }

    const deleteTaskModal = (e, taskId) => {
        e.stopPropagation();
        setModalContent(<DeleteTask taskId={taskId} closeModal={closeModal} />)

    }

    useEffect(() => {
        dispatch(thunkGettingAllOfTheTasks())
    }, [dispatch])

    return(
        <div className="taskcontainer">
            <div>
                <h1>Tasks</h1>
            </div>
            <div>{Object.keys(tasks).length} tasks</div>
            <div>
                {tasksObj?.map((task, index) => (
                    <div>
                        <div
                            className="eachtask"
                            onClick={() => putTaskModal(task)}
                            key={index}
                        >
                            {task.body}
                        </div>
                        <button onClick={(e) => deleteTaskModal(e, task.id)}>Delete Task</button>

                    </div>


                ))}
            </div>
            <div>
                <button onClick={postTaskModal}>Add a new Task</button>
            </div>
        </div>
    )
}
