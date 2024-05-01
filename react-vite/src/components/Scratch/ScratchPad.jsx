import React, { useEffect, useRef } from 'react';
import './ScratchPad.css'
import ScratchToNotesPost from './ScratchtoNotes';
import { useModal } from '../../context/Modal';

function ScratchPad({ notebooks }) {
    const divRef = useRef();
    const { closeModal } = useModal()
    const { setModalContent } = useModal()

    const addingScratchToNotes = () => {
        setModalContent(<ScratchToNotesPost closeModal={closeModal} notebooks={notebooks}/>)
    }

    // Load saved content from local storage when component mounts
    useEffect(() => {
        const savedContent = localStorage.getItem(`Scratch Pad General`);
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
        localStorage.setItem(`Scratch Pad General`, divRef.current.innerText);
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

export default ScratchPad;
