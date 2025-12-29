import { useRef, useState, useEffect, memo } from "react";
import type { PointerEvent } from "react";
import type {
  ActionState,
  ActionType,
  StickyNoteProps,
} from "../definitions/definitions";

// util function
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

const StickyNote = ({
  note,
  onChange,
  onDelete,
  trashRef,
  zIndex,
}: StickyNoteProps) => {
  const actionRef = useRef<ActionState | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [zAxis, setZAxis] = useState<number>(zIndex);

  useEffect(() => {
    setZAxis(zIndex * 100);
  }, [zIndex]);

  const onPointerDown = (
    e: PointerEvent<HTMLDivElement>,
    action: ActionType
  ) => {
    if (isEditing) return;

    e.preventDefault();
    e.stopPropagation();

    setZAxis(1000);

    actionRef.current = {
      type: action,
      startX: e.clientX,
      startY: e.clientY,
      startNote: note,
    };

    onChange(note.id, {});
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>): void => {
    if (!actionRef.current) return;

    setZAxis(1000);

    const { type, startX, startY, startNote } = actionRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (type === "move") {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const x = clamp(
        startNote.position.x + dx,
        0,
        vw - note.width - 25
      );

      const y = clamp(
        startNote.position.y + dy,
        0,
        vh - note.height - 100
      );

      onChange(note.id, {
        position: { x, y },
      });
    }

    if (type === "resize") {
      onChange(note.id, {
        width: Math.max(80, startNote.width + dx),
        height: Math.max(80, startNote.height + dy),
      });
    }
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>): void => {
    setZAxis(zIndex * 100);
    e.currentTarget.releasePointerCapture(e.pointerId);

    // DELETE check
    if (actionRef.current?.type === "move" && trashRef.current) {
      const noteRect = e.currentTarget.getBoundingClientRect();
      const trashRect = trashRef.current.getBoundingClientRect();

      const isOverTrash =
        noteRect.right > trashRect.left &&
        noteRect.left < trashRect.right &&
        noteRect.bottom > trashRect.top &&
        noteRect.top < trashRect.bottom;

      if (isOverTrash) {
        onDelete(note.id); // DELETE Note
      }
    }

    actionRef.current = null;
  };

  return (
    <div
      className={`sticky-note ${isEditing ? "editing" : ""}`}
      style={{
        left: note.position.x,
        top: note.position.y,
        width: note.width,
        height: note.height,
        zIndex: zAxis,
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Title */}
      <input
        className="sticky-note-title"
        value={note.title}
        onChange={(e) => onChange(note.id, { title: e.target.value })}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
      />

      {/* Description */}
      <textarea
        className="sticky-note-description"
        value={note.description}
        onChange={(e) =>
          onChange(note.id, { description: e.target.value })
        }
      />

      {/* Move Overlay */}
      {!isEditing && (
        <div
          className="sticky-note-move-overlay"
          onPointerDown={(e) => onPointerDown(e, "move")}
        />
      )}

      {/* Footer */}
      <div className="sticky-note-footer">
        <button
          className="sticky-note-edit-btn"
          onClick={() => setIsEditing((v) => !v)}
        >
          {isEditing ? "save" : "edit"}
        </button>

        {/* Resize Pointer Handler */}
        <div
          className="sticky-note-resize-handle"
          onPointerDown={(e) => onPointerDown(e, "resize")}
        />
      </div>
    </div>
  );
};

export default memo(StickyNote);
