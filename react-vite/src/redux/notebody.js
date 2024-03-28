const GET_ALL_NOTEBODY = "notebodies/getAllNotebody";
const POST_NOTEBODY_TO_NOTE = "notebodies/postNotebodyToNote";
const PUT_NOTEBODY = "notebodies/putNotebody";
const DELETE_NOTEBODY = "notebodies/deleteNotebody";


const getAllNotebody = (noteId, notebody) => ({
  type: GET_ALL_NOTEBODY,
  noteId,
  notebody
});

const postNotebody = (noteId, notebody) => ({
    type: POST_NOTEBODY_TO_NOTE,
    noteId,
    notebody
})
const editNotebody = (noteId, notebody) => ({
    type: PUT_NOTEBODY,
    noteId,
    notebody
})
const deleteNotebody = (noteId, notebodyId) => ({
    type: DELETE_NOTEBODY,
    noteId,
    notebodyId
})



export const thunkGetAllNotebody = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/notebody`);
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(getAllNotebody(noteId, data));
    }
};



export const thunkPostNotebody = (noteId, notebody) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/notebody`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notebody),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(postNotebody(noteId, data));
    }
};

export const thunkUpdateNoteBody = (noteId, notebodyId, updatedBody) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/notebody/${notebodyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBody),
    })


    const data = await response.json();
    if (data.errors) {
       return data
    } else {
        dispatch(editNotebody(noteId, data));
    }
}

export const thunkDeleteNoteBody = (noteId, notebodyId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/notebody/${notebodyId}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (data.errors) {
        return data
    } else {
        dispatch(deleteNotebody(noteId, notebodyId, data));
    }
};

const initialState = {};

export default function notebodiesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_NOTEBODY:
            let notebodyState = {}
            action.notebody.forEach((body) => {
                notebodyState[body.id] = body
            })
            return notebodyState
        case POST_NOTEBODY_TO_NOTE:
            return {...state, [action.noteId]: action.notebody
            };
        case PUT_NOTEBODY:
            return {...state, [action.noteId]: action.notebody};
        case DELETE_NOTE:
            newState = { ...state };
            delete newState[action.notebodyId];
            return newState;
        default:
          return state;
    }
}
