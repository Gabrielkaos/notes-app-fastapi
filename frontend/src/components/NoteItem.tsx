import { useState, type FormEvent } from "react";
import type { Note, NoteUpdateInput } from "../services/api";

interface NoteItemProps {
  note: Note;
  onUpdate: (id: string, input: NoteUpdateInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function NoteItem({ note, onUpdate, onDelete }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isBusy, setIsBusy] = useState(false);

  function startEditing() {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
  }

  async function handleSaveEdit(event: FormEvent) {
    event.preventDefault();
    if (title.trim().length === 0) return;

    setIsBusy(true);
    try {
      await onUpdate(note.id, { title: title.trim(), content: content.trim() });
      setIsEditing(false);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleDelete() {
    setIsBusy(true);
    try {
      await onDelete(note.id);
    } finally {
      setIsBusy(false);
    }
  }

  if (isEditing) {
    return (
      <li className="note-item note-item--editing">
        <form onSubmit={handleSaveEdit} className="note-edit-form">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={255}
            autoFocus
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={4}
          />
          <div className="note-item-actions">
            <button type="submit" disabled={isBusy}>Save</button>
            <button type="button" onClick={() => setIsEditing(false)} disabled={isBusy}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="note-item">
      <div className="note-item-text">
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <p className="note-meta">
          Updated {new Date(note.updated_at).toLocaleString()}
        </p>
      </div>
      <div className="note-item-actions">
        <button type="button" onClick={startEditing} disabled={isBusy}>Edit</button>
        <button type="button" className="danger" onClick={handleDelete} disabled={isBusy}>
          Delete
        </button>
      </div>
    </li>
  );
}