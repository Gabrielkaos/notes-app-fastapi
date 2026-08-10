"""
classes translated to how data is formatted and validated for API requests and responses
"""


import uuid
from pydantic import BaseModel, Field,ConfigDict
from datetime import datetime

class NoteBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: str = Field(default="")


class NoteCreate(NoteBase):
    pass


class NoteUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    content: str | None = None


class NoteResponse(NoteBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)