import React, { useEffect, useRef } from 'react';
import './ScratchPad.css'

function ScratchPad() {
    const divRef = useRef();

    // Load saved content from local storage when component mounts
    useEffect(() => {
        const savedContent = localStorage.getItem('scratchPadContent');
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
        localStorage.setItem('scratchPadContent', divRef.current.innerText);
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
        <div
            className='scratchpaper'
            contentEditable="true"
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={divRef}
        />
    );
}

export default ScratchPad;
