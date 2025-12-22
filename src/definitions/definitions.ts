
/** StickyNote Component definitions --------------------------- */
export interface Position {
  x: number;
  y: number;
}

export interface StickyNoteData {
  id: number;
  width: number;
  height: number;
  title: string;
  description: string;
  position: Position;
}

export type ActionType = "move" | "resize";

export interface ActionState {
  type: ActionType;
  startX: number;
  startY: number;
  startNote: StickyNoteData;
}

export interface StickyNoteProps {
  note: StickyNoteData;
  onChange: (id: number, changes: Partial<StickyNoteData>) => void;
  onDelete: (id: number) => void;
  trashRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
}


/* Notes Board Definitions Component --------------------------- */

export interface Position {
  x: number;
  y: number;
}

export interface StickyNoteData {
  id: number;
  width: number;
  height: number;
  title: string;
  description: string;
  position: Position;
  color?: string;
}

export interface CreateNotePayload {
  title: string;
  description: string;
  width: number;
  height: number;
  position: Position;
}

export interface UpdateNoteChanges {
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  position?: Partial<Position>;
  color?: string;
}


/* AddStickyNote Component definitions ---------------------------------------- */

export interface CreateStickyNotePayload {
  title: string;
  description: string;
  width: number;
  height: number;
  position: Position;
}

export interface AddStickyNoteProps {
  onCreate: (data: CreateStickyNotePayload) => void;
}