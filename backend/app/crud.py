import uuid
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models import Note
from app.schemas import NoteCreate, NoteUpdate



def get_notes(db: Session) -> list[Note]:
    statement = select(Note).order_by(Note.updated_at.desc())
    return list(db.scalars(statement).all())

def get_note(db: Session, note_id: uuid.UUID) -> Note | None:
    return db.get(Note, note_id)

def create_note(db: Session, note_data: NoteCreate) -> Note:
    note = Note(title=note_data.title, content=note_data.content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

def update_note(db: Session, note_id: uuid.UUID, note_data: NoteUpdate) -> Note | None:
    note = get_note(db, note_id)
    if not note:
        return None

    updates = note_data.dict(exclude_unset=True)
    for field, value in updates.items():
        setattr(note, field, value)
    db.commit()
    db.refresh(note)
    return note

def delete_note(db: Session, note: Note) -> None:
    db.delete(note)
    db.commit()