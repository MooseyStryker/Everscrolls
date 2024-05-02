import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { thunkGetAllImages } from "../../redux/images"
import PostImageModal from "./PostImageModal"
import './ViewAllImages.css'

export default function ViewAllImages({noteId}){
    const rawImage = useSelector((state) => state.images)
    const allImages = Object.values(rawImage)

    const dispatch = useDispatch()
    const { closeModal, setModalContent } = useModal()

    const postImageModal = () => {
        setModalContent(<PostImageModal noteId={noteId} closeModal={closeModal}/>)
    }

    useEffect(() => {
        dispatch(thunkGetAllImages(noteId))

    },[dispatch, noteId])



    return(
    <>
        <h2 className="task-store">Attachments</h2>

        <div>
            {allImages?.filter(image => image.note_id == noteId).map(image =>( // Filters noteId so when switching notes, the images shows with the appropraite note and note show on every note
                <div key={image.id} className="imageinnotecontainer">
                    <img className="imagenotes" src={image.image_file}></img>
                </div>
            ))}

        </div>
        <button onClick={() => postImageModal()}>Add New Image</button>
    </>
    )
}
