import { useEffect, useState, useCallback } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  type Note,
  type NoteCreateInput,
  type NoteUpdateInput,
} from "./services/api";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      setNotes(await getNotes());
    } catch {
      setLoadError("Could not reach the backend. Make sure it's running.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  async function handleCreate(input: NoteCreateInput) {
    const newNote = await createNote(input);
    setNotes((current) => [newNote, ...current]);
  }

  async function handleUpdate(id: string, input: NoteUpdateInput) {
    const updated = await updateNote(id, input);
    setNotes((current) => current.map((note) => (note.id === id ? updated : note)));
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    setNotes((current) => current.filter((note) => note.id !== id));
  }

  return (
    <div className="app">
      <header>
        <h1>Notes</h1>
        <p className="subtitle">A minimal FastAPI + PostgreSQL + React notes app.</p>
      </header>

      <main>
        <NoteForm onCreate={handleCreate} />

        <section className="note-section">
          <h2>Your Notes</h2>

          {isLoading && <p>Loading notes...</p>}

          {loadError && (
            <div className="error-banner">
              <p>{loadError}</p>
              <button type="button" onClick={loadNotes}>Retry</button>
            </div>
          )}

          {!isLoading && !loadError && (
            <NoteList notes={notes} onUpdate={handleUpdate} onDelete={handleDelete} />
          )}
        </section>
      </main>
    </div>
  );
}