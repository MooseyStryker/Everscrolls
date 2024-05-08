import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id, value, handleKeyPress, handleTextChange }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <textarea
                className="noteinput"
                value={value}
                onChange={(e) => handleTextChange(e, id)}
                onKeyDown={(e) => handleKeyPress(e, id)}
                ref={setNodeRef}
            />
        </div>
    );
}
