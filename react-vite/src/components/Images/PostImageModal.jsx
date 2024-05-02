import React, {useState} from "react";
import { thunkPostImage } from "../../redux/images";
import { useDispatch } from "react-redux";


export default function PostImageModal({noteId, closeModal}) {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image_file", image);
        formData.append("note_id", noteId)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        const res = await dispatch(thunkPostImage(noteId, formData));
        closeModal()
    }

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}
