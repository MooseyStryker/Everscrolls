const GET_ALL_TASK = "tasks/getAllTask";
const POST_TASK_TO_NOTE = "tasks/postTaskToNote";
const PUT_TASK = "tasks/putTask";
const DELETE_TASK = "tasks/deleteTask";


const getAllTask = (noteId, task) => ({
  type: GET_ALL_TASK,
  noteId,
  task
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
const deleteTask = (noteId, taskId) => ({
    type: DELETE_TASK,
    noteId,
    taskId
})

export const thunkGetAllTask = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/task`);
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(getAllTask(noteId, data));
    }
};


export const thunkPostAllTask = (noteId, task) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/task`,{
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
