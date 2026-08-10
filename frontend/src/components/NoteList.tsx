import type { Note, NoteUpdateInput } from "../services/api";
import NoteItem from "./NoteItem";

interface NoteListProps {
  notes: Note[];
  onUpdate: (id: string, input: NoteUpdateInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function NoteList({ notes, onUpdate, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return <p className="empty-state">No notes yet. Add one above!</p>;
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}