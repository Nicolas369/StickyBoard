import { useCallback, useState } from "react";
import type { StickyNoteData } from "../definitions/definitions";

export const useStickyNoteAPI = () => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotesFromAPI = (): Promise<StickyNoteData[]> => { // Mock GET Method.
        setIsLoading(() => true);
        return new Promise(resolve => {
            setTimeout(() => {
                const storedNotes = localStorage.getItem('sticky-notes');
                const notes = storedNotes ? JSON.parse(storedNotes) : initialState;
                setIsLoading(() => false);
                resolve(notes ? notes : []);
            }, 1500);
        });
    }

    const sendNotesToAPI = (notes: StickyNoteData[]) => { // Moke POST Method.
        return new Promise(resolve => {
            setTimeout(() => {
                localStorage.setItem('sticky-notes', JSON.stringify(notes));
                resolve({ notes, message: 'Notes Store Successfully' });
            }, 1500);
        });
    }

    const getNotes = useCallback(fetchNotesFromAPI, []);
    const saveNotes= useCallback(sendNotesToAPI, []);

    return {
        isLoading,
        getNotes,
        saveNotes
    }

}

const initialState = [
    {
        id: 1,
        title: 'Sticky Note',
        description: 'Description...',
        width: 200,
        height: 250,
        position: {
            x: 500,
            y: 24
        }
    },
    {
        id: 2,
        title: 'Sticky Note',
        description: 'Description...',
            width: 200,
        height: 250,
        position: {
            x: 265,
            y: 24
        }
    },
    {
        id: 3,
        title: 'Sticky Note',
        description: 'Description...',
        width: 200,
        height: 250,
        position: {
            x: 24,
            y: 24
        }
    }
]
