const GET_ALL_NOTEBOOKS = "notebooks/getAllNotebooks";
const GET_NOTEBOOK = "notebooks/getNotebook";
const POST_NOTEBOOK = "notebooks/postNotebook";
const PUT_NOTEBOOK = "notebooks/putNotebook";
const DELETE_NOTEBOOK = "notebooks/deleteNotebook";
const POST_NOTE_TO_NOTEBOOK = "notebooks/postNoteToNotebook";



const getAllNotebooks = (notebooks) => ({
  type: GET_ALL_NOTEBOOKS,
  notebooks,
});

const getNotebook = (notebook) => ({
  type: GET_NOTEBOOK,
  notebook,
});

const postNotebook = (notebook) => ({
  type: POST_NOTEBOOK,
  notebook,
});

const putNotebook = (notebook) => ({
  type: PUT_NOTEBOOK,
  notebook,
});

const deleteNotebook = (notebook_id) => ({
  type: DELETE_NOTEBOOK,
  notebook_id,
});

const postNoteToNotebook = (notebookId, note) => ({
    type: POST_NOTE_TO_NOTEBOOK,
    notebookId,
    note,
  });




export const thunkGetAllNotebooks = () => async (dispatch) => {
    const response = await fetch("/api/notebooks");

    if (response.ok) {
      const data = await response.json();


      if (data.errors) {
        return data;
      }
      dispatch(getAllNotebooks(data));
    }
  };

export const thunkGetNotebook = (notebook_id) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebook_id}`);
    const data = await response.json();

    if (data.errors) {
      return data;
    }

    dispatch(getNotebook(data));
  };

export const thunkPostNotebook = (notebook) => async (dispatch) => {
    const response = await fetch("/api/notebooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notebook),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
      const notebook = await dispatch(postNotebook(data));
      return notebook;
    }
  };

export const thunkPutNotebook = (notebook, notebook_id) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebook_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notebook),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
      dispatch(putNotebook(data));
    }
  };

export const thunkDeleteNotebook = (notebook_id) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebook_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(deleteNotebook(data));
  };

export const thunkPostNoteToNotebook = (notebookId, note) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebookId}/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
      dispatch(postNoteToNotebook(notebookId, data));
    }
  };



const initialState = {};

export default function notebooksReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_NOTEBOOKS:
        newState = { ...state };
        action.notebooks.forEach(notebook => {
            newState[notebook.id] = notebook;
        });
        return newState;
    case GET_NOTEBOOK:
        newState = { ...state, [action.notebook.id]: action.notebook };
        return newState;
    case POST_NOTEBOOK:
        newState = { ...state, [action.notebook.id]: action.notebook };
        return newState;
    case PUT_NOTEBOOK:
        newState = { ...state, [action.notebook.id]: action.notebook };
        return newState;

    case POST_NOTE_TO_NOTEBOOK:
        newState = { ...state };
        newState[action.notebookId].notes = [...newState[action.notebookId].notes, action.note];
    case DELETE_NOTEBOOK:
        newState = { ...state };
        delete newState[action.notebook_id];
        return newState;
    default:
        return state;
  }
}
