import { useState } from "react";
import type { AddStickyNoteProps } from "../definitions/definitions";

const AddStickyNote = ({ onCreate }: AddStickyNoteProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [noteSize, setNoteSize] = useState<string>("small");
  const [notePosition, setNotePosition] = useState<string>("Top Left");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const sizes: Record<string, { width: number; height: number }> = {
      small: { width: 150, height: 200 },
      medium: { width: 175, height: 225 },
      large: { width: 200, height: 250 },
    };

    const positions: Record<string, { x: number; y: number }> = {
      "Top Left": { x: 10, y: 10 },
      "Top Right": { x: window.innerWidth - 250, y: 10 },
      "Bottom Left": { x: 100, y: window.innerHeight - 350 },
      "Bottom Right": {
        x: window.innerWidth - 350,
        y: window.innerHeight - 350,
      },
    };

    onCreate({
      title: title || "New note",
      description: description || "",
      ...sizes[noteSize],
      position: positions[notePosition],
    });

    setTitle("");
    setDescription("");
    setNoteSize("small");
    setNotePosition("Top Left");
    setOpen(false);
  };

  const handleSizeSelection = (
    e: React.MouseEvent<HTMLButtonElement>,
    size: string
  ) => {
    e.preventDefault();
    setNoteSize(size);
  };

  const handlePositionSelection = (
    e: React.MouseEvent<HTMLButtonElement>,
    position: string
  ) => {
    e.preventDefault();
    setNotePosition(position);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="add-note-button"
        onClick={() => setOpen(true)}
        aria-label="Add sticky note"
      >
        ➕
      </button>

      {/* Dialog */}
      {open && (
        <div
          className="add-note-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="add-note-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="add-note-title">New Sticky Note</h3>

            <form className="add-note-form" onSubmit={handleSubmit}>
              <input
                className="add-note-input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="add-note-textarea"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="add-note-selector">
                {["Top Left", "Top Right", "Bottom Left", "Bottom Right"].map(
                  (position) => (
                    <button
                      key={position}
                      className="add-note-option"
                      onClick={(e) =>
                        handlePositionSelection(e, position)
                      }
                    >
                      {position}
                    </button>
                  )
                )}
              </div>

              <div className="add-note-selector add-note-selector-margin">
                {["small", "medium", "large"].map((size) => (
                  <button
                    key={size}
                    className="add-note-option"
                    onClick={(e) => handleSizeSelection(e, size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="add-note-actions">
                <button
                  type="button"
                  className="add-note-cancel"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-note-submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStickyNote;
