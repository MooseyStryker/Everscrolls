const GET_ALL_SHARED_NOTES = "sharedNotes/getAllSharedNotes"
const GET_ALL_NOTES_SHARED_WITH_USER = "sharedNotes/getAllNotesSharedWithUser";
const GET_SHARED_NOTES_VIA_NOTEID= "sharedNotes/setSharedNotesByNoteId"
const POST_SHARED_NOTES = "sharedNotes/postSharedNote";
const PUT_SHARED_NOTES = "sharedNotes/putSharedNote";
const DELETE_SHARED_NOTES = "sharedNotes/deleteSharedNote";

const getAllSharedNotes = (sharedNotes) =>({
    type: GET_ALL_SHARED_NOTES,
    sharedNotes
})

const getAllNotesSharedWithUser = (sharedNotes) => ({
    type: GET_ALL_NOTES_SHARED_WITH_USER,
    sharedNotes,
  });

const getSharedNotesByNoteId = (sharedNotes) => ({
    type: GET_SHARED_NOTES_VIA_NOTEID,
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
    const res = await fetch(`/api/notes/shared`);

    const data = await res.json();
    if (data.errors){
        return data.errors
    } else {
        dispatch(getAllSharedNotes(data))
        return data
    }
}

export const thunkGetAllNotesSharedWithUser = (sharedUserId) => async (dispatch) => {
    const response = await fetch(`/api/notes/shared/all/${sharedUserId}`);

    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
      const here = await dispatch(getAllNotesSharedWithUser(data));
    }
};

export const thunkGetAllSharedNotesByNoteId = (noteId) => async(dispatch) =>{
    const res = await fetch(`/api/notes/shared/${noteId}`);

    const data = await res.json();

    if (data.errors){
        return data.errors
    } else {
        dispatch(getSharedNotesByNoteId(data))
        return data
    }
}

export const thunkPostSharedNote = (sharedNote) => async(dispatch) => {
    const res = await fetch(`/api/notes/shared`, {
        method:"POST",
        headers: { "Content-type": "application/json" },
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
    const res = await fetch(`/api/notes/shared/${noteId}/user/${userId}`, {
        method:"PUT",
        headers: { "Content-type": "application/json" },
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
    const res = await fetch(`/api/notes/shared/${noteId}`, {
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


        case GET_ALL_NOTES_SHARED_WITH_USER:
            newState = {...state};
            action.sharedNotes.forEach(note => {
                newState[note.id] = note;
            });
            return newState;




        case GET_SHARED_NOTES_VIA_NOTEID:
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
