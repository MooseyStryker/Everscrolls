const GET_ALL_NOTES = "notes/getAllNotes";
const GET_NOTE = "notes/getNote";
const POST_NOTE = "notes/postNote";
const PUT_NOTE = "notes/putNote";
const DELETE_NOTE = "notes/deleteNote";

const getAllNotes = (notes) => ({
  type: GET_ALL_NOTES,
  notes,
});

const getNote = (note) => ({
  type: GET_NOTE,
  note,
});

const postNote = (note) => ({
  type: POST_NOTE,
  note,
});

const putNote = (note) => ({
  type: PUT_NOTE,
  note,
});

const deleteNote = (note_id) => ({
  type: DELETE_NOTE,
  note_id,
});



export const thunkGetAllNotes = () => async (dispatch) => {
    const response = await fetch("/api/notes");

    if (response.ok) {
      const data = await response.json();


      if (data.errors) {
        return data;
      }
      dispatch(getAllNotes(data));
    }
};

export const thunkGetNote = (note_id) => async (dispatch) => {
    const response = await fetch(`/api/notes/${note_id}`);
    const data = await response.json();

    if (data.errors) {
      return data;
    }

    dispatch(getNote(data));
};

export const thunkPostNote = (note) => async (dispatch) => {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
      await dispatch(postNote(data));
      return data;
    }
};

export const thunkPutNote = (note, note_id) => async (dispatch) => {
    const response = await fetch(`/api/notes/${note_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    console.log("🚀 ~ thunkPutNote ~ response:", response)
    const data = await response.json();
    console.log("🚀 ~ thunkPutNote ~ data:", data)
    if (data.errors) {
      return data;
    } else {
      dispatch(putNote(data));
    }
};

export const thunkDeleteNote = (note_id) => async (dispatch) => {
    const response = await fetch(`/api/notes/${note_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(deleteNote(data));
};


const initialState = {};

export default function notesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_NOTES:
      newState = { ...state };
      action.notes.forEach(note => {
        newState[note.id] = note;
      });
      return newState;
    case GET_NOTE:
      newState = { ...state, [action.note.id]: action.note };
      return newState;
    case POST_NOTE:
      newState = { ...state, [action.note.id]: action.note };
      return newState;
    case PUT_NOTE:
      newState = { ...state, [action.note.id]: action.note };
      return newState;
    case DELETE_NOTE:
      newState = { ...state };
      delete newState[action.note_id];
      return newState;
    default:
      return state;
  }
}
