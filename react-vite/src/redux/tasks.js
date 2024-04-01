const GET_ALL_THE_TASKS = 'tasks/getAllOfTheTasks';
const GET_ALL_TASK = "tasks/getAllTask";
const POST_TASK_TO_NOTE = "tasks/postTaskToNote";
const PUT_TASK = "tasks/putTask";
const DELETE_TASK = "tasks/deleteTask";

const getEveryTask = (tasks) => ({
    type: GET_ALL_THE_TASKS,
    tasks
})


const getAllTask = (noteId, tasks) => ({
  type: GET_ALL_TASK,
  noteId,
  tasks
});

const postTask = (noteId, task) => ({
    type: POST_TASK_TO_NOTE,
    noteId,
    task
})
const editTask = (noteId, task) => ({
    type: PUT_TASK,
    noteId,
    task
})
const deleteTask =  (taskId) => ({
    type: DELETE_TASK,
    taskId
})

export const thunkGettingAllOfTheTasks = () => async(dispatch) => {
    const res = await fetch(`api/tasks`);
    const data = await res.json()
    if (data.errors) {
        return data;
    } else {
        dispatch(getEveryTask(data));
    }

}

export const thunkGetAllTask = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/tasks`);
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(getAllTask(noteId, data));
    }
};


export const thunkPostTask = (noteId, task) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/tasks`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(postTask(noteId, data));
    }
};


export const thunkUpdateTask = (noteId, taskId, updateDescription) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateDescription),
    })


    const data = await response.json();
    if (data.errors) {
       return data
    } else {
        dispatch(editTask(noteId, taskId, data));
    }
}

export const thunkDeleteTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (data.errors) {
        return data
    } else {
        dispatch(deleteTask(taskId, data));
    }
};

const initialState = {};

export default function taskReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_THE_TASKS:
            newState = { ...state };
            action.tasks.forEach((task) => {
                newState[task.id] = task
            })
            return newState;
        case GET_ALL_TASK:
            let taskState = {}
            action.tasks.forEach((task) => {
                taskState[task.id] = task
            })
            return taskState
        case POST_TASK_TO_NOTE:
            return {...state, [action.noteId]: action.task
            };
        case PUT_TASK:
            return {...state, [action.noteId]: action.task};
        case DELETE_TASK:
            newState = { ...state };
            delete newState[action.taskId];
            return newState;
        default:
          return state;
    }
}
