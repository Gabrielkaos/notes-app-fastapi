import { useState, type FormEvent } from "react";
import type { NoteCreateInput } from "../services/api";

interface NoteFormProps {
  onCreate: (input: NoteCreateInput) => Promise<void>;
}

export default function NoteForm({ onCreate }: NoteFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (title.trim().length === 0) {
            setError("Title is required.");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        try {
            await onCreate({ title: title.trim(), content: content.trim() });
            setTitle("");
            setContent("");
        } catch {
            setError("Failed to create note. Is the backend running?");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="note-form" onSubmit={handleSubmit}>
        <h2>New Note</h2>

        <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Meeting notes"
                maxLength={255}
            />
        </div>

        <div className="form-field">
            <label htmlFor="content">Content</label>
            <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write your note..."
                rows={5}
            />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Note"}
        </button>
        </form>
    );

}