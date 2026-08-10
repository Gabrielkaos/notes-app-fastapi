import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface NoteCreateInput {
  title: string;
  content?: string;
}

export interface NoteUpdateInput {
  title?: string;
  content?: string;
}

export async function getNotes(): Promise<Note[]>{
    const response = await apiClient.get<Note[]>("/notes");
    return response.data;
}

export async function createNote(input: NoteCreateInput): Promise<Note> {
    const response = await apiClient.post<Note>("/notes", input);
    return response.data;
}

export async function updateNote(id: string, input: NoteUpdateInput): Promise<Note> {
    const response = await apiClient.put<Note>(`/notes/${id}`, input);
    return response.data;
}

export async function deleteNote(id: string): Promise<void> {
    await apiClient.delete(`/notes/${id}`);
}