
"""
classes translated to database tables
"""


from datetime import datetime, timezone
from app.database import Base
import uuid
from sqlalchemy.orm import Mapped, mapped_column




def _getutcnow():
    return datetime.now(timezone.utc)



class Note(Base):
    __tablename__ = "notes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True),primary_key=True, default=uuid.uuid4)

    title: Mapped[str] = mapped_column(nullable=False)
    content: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=_getutcnow, Datetime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(nullable=False, default=_getutcnow, \
                    onupdate=_getutcnow, Datetime(timezone=True))