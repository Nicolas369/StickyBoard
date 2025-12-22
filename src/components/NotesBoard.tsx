import { useEffect, useRef, useState } from "react";
import StickyNote from "./StickyNote";
import TrashZone from "./TrashZone";
import AddStickyNote from "./AddStickyNote";
import { useStickyNoteAPI } from "../hooks/StickyNoteAPI";
import type { CreateNotePayload, StickyNoteData, UpdateNoteChanges } from "../definitions/definitions";

const NotesBoard = () => {
  const [notes, setNotes] = useState<StickyNoteData[]>([]);

  const trashRef = useRef<HTMLDivElement | null>(null);

  const { getNotes, isLoading, saveNotes } = useStickyNoteAPI();

  useEffect(() => {
    getNotes().then((notesFromAPI: StickyNoteData[]) => {
      setNotes(notesFromAPI);
    });
  }, [getNotes]);

  const handleSaveNotes = (newNotes: StickyNoteData[]): void => {
    saveNotes(newNotes);
  };

  const addNote = (data: CreateNotePayload): void => {
    setNotes((prev) => {
      console.log(data);
      const newNotes: StickyNoteData[] = [
        {
          id: Date.now(),
          ...data
        },
        ...prev,
      ];

      handleSaveNotes(newNotes);
      return newNotes;
    });
  };

  const updateNote = (
    id: number,
    changes: UpdateNoteChanges
  ): void => {
    setNotes((prev) => {
      const updatedNotes = prev.map((note) =>
        note.id === id
          ? {
              ...note,
              ...changes,
              position: {
                ...note.position,
                ...changes.position,
              },
            }
          : note
      );

      const index = updatedNotes.findIndex((n) => n.id === id);
      if (index === -1) return prev;

      const [lastUpdated] = updatedNotes.splice(index, 1);
      const newNotes = [lastUpdated, ...updatedNotes];

      handleSaveNotes(newNotes);
      return newNotes;
    });
  };

  const deleteNote = (id: number): void => {
    setNotes((prev) => {
      const newNotes = prev.filter((note) => note.id !== id);
      handleSaveNotes(newNotes);
      return newNotes;
    });
  };

  return (
    <main 
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "#f5f5f5",
      }}
    >

      {/* All the notes. */}
      {notes.map((note, i) => (
        <StickyNote
          key={note.id}
          note={note}
          onChange={updateNote}
          onDelete={deleteNote}
          trashRef={trashRef}
          zIndex={notes.length - i}
        />
      ))}

      {/* Loading indicator when fetching from API. */}
      {isLoading && <h1 style={{color: '#666'}}>Loading...</h1>}

      {/* Add Note flying Button. */}
      <AddStickyNote onCreate={addNote} />
      
      {/* Flying Trash Icon. */}
      <TrashZone ref={trashRef} />
    </main>
  );
}

export default NotesBoard;
