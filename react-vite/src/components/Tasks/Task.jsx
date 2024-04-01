import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGettingAllOfTheTasks } from "../../redux/tasks"
import { useModal } from "../../context/Modal"
import PostTask from "./PostTask"


export default function TaskBar() {// I want to pass in my notes variable from homeLayout
    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.tasks)
    console.log("🚀 ~ TaskBar ~ tasks:", tasks)

    const tasksObj = Object.values(tasks)

    const { setModalContent } = useModal()

    const postTaskModal = () => {
        setModalContent(<PostTask />)
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
                {tasksObj.map((task, index) => (
                    <div key={index}>{task.body}</div>
                ))}
            </div>
            <div>
                <button onClick={postTaskModal}>Add a new Task</button>
            </div>
        </div>
    )
}
