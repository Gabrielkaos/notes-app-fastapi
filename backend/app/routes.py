
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid


from app import crud
from app.schemas import NoteCreate, NoteUpdate, NoteResponse
from app.database import get_db
from app.models import Note


router = APIRouter(
    prefix="/notes",
    tags=["notes"],
)


def _get_note_or_404(db: Session, note_id: uuid.UUID) -> Note:
    note = crud.get_note(db, note_id)
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    return note

@router.get("",response_model=list[NoteResponse])
def list_notes(db: Session = Depends(get_db)) -> list[Note]:
    notes = crud.get_notes(db)
    return notes


@router.get("/{note_id}", response_model=NoteResponse)
def get_note(note_id: uuid.UUID, db: Session = Depends(get_db)) -> Note:
    note = _get_note_or_404(db, note_id)
    return note

@router.post("", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def create_note(note_data: NoteCreate, db: Session = Depends(get_db)) -> Note:
    note = crud.create_note(db, note_data)
    return note

@router.put("/{note_id}", response_model=NoteResponse)
def update_note(note_id: uuid.UUID, note_data: NoteUpdate, db: Session = Depends(get_db)) -> Note:
    note = _get_note_or_404(db, note_id)
    updated_note = crud.update_note(db, note_id, note_data)
    return updated_note

@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(note_id: uuid.UUID, db: Session = Depends(get_db)) -> None:
    note = _get_note_or_404(db, note_id)
    crud.delete_note(db, note)