const GET_ALL_SHARED_NOTES = "sharedNotes/getAllSharedNotes"
const POST_SHARED_NOTES = "sharedNotes/postSharedNote";
const PUT_SHARED_NOTES = "sharedNotes/putSharedNote";
const DELETE_SHARED_NOTES = "sharedNotes/deleteSharedNote";

const getAllSharedNotes = (sharedNotes) =>({
    type: GET_ALL_SHARED_NOTES,
    sharedNotes
})

const postSharedNote = (sharedNote) => ({
    type: POST_SHARED_NOTES,
    sharedNote
})

const putSharedNote = (sharedNote) => ({
    type: PUT_SHARED_NOTES,
    sharedNote
})

const deleteSharedNote = (noteId) => ({
    type: DELETE_SHARED_NOTES,
    noteId
})

export const thunkGetAllSharedNotes = () => async(dispatch) => {
    const res = await fetch("api/shared");

    const data = await res.json();

    if (data.errors){
        return data.errors
    } else {
        dispatch(getAllSharedNotes(data))
    }
}

export const thunkPostSharedNote = (noteId, userId, sharedNote) => async(dispatch) => {
    const res = await fetch(`api/shared/${noteId}/user/${userId}`, {
        method:"POST",
        headers: { "Content_type": "application/json" },
        body: JSON.stringify(sharedNote)
    })

    const data = await res.json();
    if (data.errors){
        return data.errors
    } else {
        await dispatch(postSharedNote(data))
        return data
    }
}

export const thunkPutSharedNote = (noteId, userId, sharedNote) => async(dispatch) => {
    const res = await fetch(`api/shared/${noteId}/user/${userId}`, {
        method:"PUT",
        headers: { "Content_type": "application/json" },
        body: JSON.stringify(sharedNote)
    })

    const data = await res.json();
    if (data.errors){
        return data.errors
    } else {
        await dispatch(putSharedNote(data))
        return data
    }
}

export const thunkDeleteSharedNote = (noteId) => async(dispatch) => {
    const res = await fetch(`api/shared/${noteId}`, {
        method:"DELETE"
    })

    const data = await res.json();
    if (data.errors){
        return data.errors
    } else {
        await dispatch(deleteSharedNote(data))
        return data
    }
}

export default function sharedNotesReducer(state = {}, action) {
    let newState;
    switch (action.type){
        case GET_ALL_SHARED_NOTES:
            newState = {...state}
            action.sharedNotes.forEach(note => {
                newState[note.id] = note
            })
            return newState;
        case POST_SHARED_NOTES:
            return newState = { ...state, [action.sharedNote.id]: action.sharedNote }
        case PUT_SHARED_NOTES:
            return newState = { ...state, [action.sharedNote.id]: action.sharedNote }
        case DELETE_SHARED_NOTES:
            newState = { ...state };
            delete newState[action.noteId]
        default:
            return state
    }
}
