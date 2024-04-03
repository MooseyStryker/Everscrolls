const GET_ALL_IMAGES = "images/getAllImage";
const POST_IMAGE_TO_NOTE = "images/postImageToNote";
const DELETE_IMAGE = "images/deleteImage";


const getAllImage = (noteId, images) => ({
  type: GET_ALL_IMAGES,
  noteId,
  images
});

const postImage = (noteId, image) => ({
    type: POST_IMAGE_TO_NOTE,
    noteId,
    image
})
const deleteImage = (noteId, imageId) => ({
    type: DELETE_IMAGE,
    noteId,
    imageId
})

export const thunkGetAllImage = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/image`);
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(getAllImage(noteId, data));
    }
};


export const thunkPostAllImage = (noteId, image) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/image`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(postImage(noteId, data));
    }
};

export const thunkDeleteImage = (noteId, imageId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/images/${imageId}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (data.errors) {
        return data
    } else {
        dispatch(deleteImage(noteId, imageId, data));
    }
};

const initialState = {};

export default function imageReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case GET_ALL_IMAGES:
        newState = { ...state };
        action.images.forEach(image => {
          newState[image.id] = image;
        });
        return newState;
      case POST_IMAGE_TO_NOTE:
        newState = { ...state, [action.image.id]: action.images };
        return newState;
      case DELETE_IMAGE:
        newState = { ...state };
        delete newState[action.image_id];
        return newState;
      default:
        return state;
    }
  }
