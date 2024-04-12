import React, { useEffect, useRef } from 'react';
import './ScratchPadInSingleNotebook.css'
import ScratchToNotesPost from '../../Scratch/ScratchtoNotes';
import { useModal } from '../../../context/Modal';
import ScratchToNotesPostIndivNotebook from './ScratchPadToNotes_IndivNotebook';
import './ScratchPadInSingleNotebook.css'

export default function ScratchPadSingleNotebook({ notebook }) {
    const divRef = useRef();
    const { closeModal } = useModal()
    const { setModalContent } = useModal()

    const addingScratchToNotes = () => {
        setModalContent(<ScratchToNotesPostIndivNotebook closeModal={closeModal} notebook={notebook}/>)
    }

    // Load saved content from local storage when component mounts
    useEffect(() => {
        const savedContent = localStorage.getItem(`Scratch Pad in Notebook ${notebook?.id}`);
        if (savedContent) {
            divRef.current.innerText = savedContent;
        } else {
            divRef.current.innerText = 'Click here to start writing...';
        }
    }, []);

    // Save content to local storage whenever it changes
    const handleInput = () => {
        if (divRef.current.innerText === 'Click here to start writing...') {
            divRef.current.innerText = '';
        }
        localStorage.setItem(`Scratch Pad in Notebook ${notebook?.id}`, divRef.current.innerText);
    };

    const handleFocus = () => {
        if (divRef.current.innerText === 'Click here to start writing...') {
            divRef.current.innerText = '';
        }
    };

    const handleBlur = () => {
        if (divRef.current.innerText === '') {
            divRef.current.innerText = 'Click here to start writing...';
        }
    };

    return (
        <>
            <div
                className='scratchpaper'
                contentEditable="true"
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={divRef}
            />
            <button className='scratchtonotebuttonstyles' onClick={() => addingScratchToNotes()}>Add to notes</button>
        </>
    );
}
