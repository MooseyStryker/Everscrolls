const GET_ALL_IMAGES = "images/getAllImage";
const POST_IMAGE_TO_NOTE = "images/postImageToNote";
const DELETE_IMAGE = "images/deleteImage";


const getAllImage = (noteId, images) => ({
  type: GET_ALL_IMAGES,
  noteId,
  images
});

const postImage = (image) => ({
    type: POST_IMAGE_TO_NOTE,
    image
})
const deleteImage = (noteId, imageId) => ({
    type: DELETE_IMAGE,
    noteId,
    imageId
})

export const thunkGetAllImages = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/images`);
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(getAllImage(noteId, data));
    }
};


export const thunkPostImage = (noteId, image) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/images`,{
        method: "POST",
        body: image,    // AWS uses formData, which cannot be json stringified.
    });
    console.log("🚀 ~ thunkPostImage ~ response:", response)
    const { data } = await response.json();
    if (data.errors) {
        return data.errors;
    } else {
        dispatch(postImage(data));
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
