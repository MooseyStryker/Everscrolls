from app.models import db, NoteBody, NoteAudio, NoteImage, ShareNote, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo note body, you can add other note bodies here if you want
def seed_share_notes():
    # share_note1 = ShareNote(
    #     user_id = 1,
    #     note_id = 2,
    #     opened = False,
    #     permissions = "View Only"
    # )
    # share_note2 = ShareNote(
    #     user_id = 1,
    #     note_id = 3,
    #     opened = False,
    #     permissions = "View Only"
    # )
    # share_note3 = ShareNote(
    #     user_id = 1,
    #     note_id = 5,
    #     opened = False,
    #     permissions = "View Only"
    # )
    # share_note4 = ShareNote(
    #     user_id = 1,
    #     note_id = 6,
    #     opened = False,
    #     permissions = "View Only"
    # )
    # share_note5 = ShareNote(
    #     user_id = 1,
    #     note_id = 7,
    #     opened = False,
    #     permissions = "View Only"
    # )
    # share_note6 = ShareNote(
    #     user_id = 1,
    #     note_id = 9,
    #     opened = False,
    #     permissions = "View Only"
    # )

    db.session.add(share_note1)
    db.session.add(share_note2)
    db.session.add(share_note3)
    db.session.add(share_note4)
    db.session.add(share_note5)
    db.session.add(share_note6)
    db.session.commit()


def undo_share_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.share_notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM share_notes"))

    db.session.commit()
