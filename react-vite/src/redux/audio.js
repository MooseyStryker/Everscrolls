const GET_ALL_AUDIOS = "audios/getAllAudio";
const POST_AUDIO_TO_NOTE = "audios/postAudioToNote";
const DELETE_AUDIO = "audios/deleteAudio";


const getAllAudio = (noteId, audios) => ({
  type: GET_ALL_AUDIOS,
  noteId,
  audios
});

const postAudio = (noteId, audio) => ({
    type: POST_AUDIO_TO_NOTE,
    noteId,
    audio
})
const deleteAudio = (noteId, audioId) => ({
    type: DELETE_AUDIO,
    noteId,
    audioId
})

export const thunkGetAllAudio = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/audio`);
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(getAllAudio(noteId, data));
    }
};


export const thunkPostAllAudio = (noteId, audio) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/audio`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(audio),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(postAudio(noteId, data));
    }
};

export const thunkDeleteAudio = (noteId, audioId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/audios/${audioId}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (data.errors) {
        return data
    } else {
        dispatch(deleteAudio(noteId, audioId, data));
    }
};

export default function audioReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case GET_ALL_AUDIOS:
        newState = { ...state };
        action.audios.forEach(audio => {
          newState[audio.id] = audio;
        });
        return newState;
      case POST_AUDIO_TO_NOTE:
        newState = { ...state, [action.audio.id]: action.audios };
        return newState;
      case DELETE_AUDIO:
        newState = { ...state };
        delete newState[action.audio_id];
        return newState;
      default:
        return state;
    }
  }
