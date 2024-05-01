from app.models import db, NoteBody, NoteAudio, NoteImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo note audio, you can add other note audios here if you want
def seed_note_audios():
    note_audio1 = NoteAudio(
        note_id=1,
        audio_file='NoteAudio1'
    )
    note_audio2 = NoteAudio(
        note_id=2,
        audio_file='NoteAudio2'
    )
    note_audio3 = NoteAudio(
        note_id=3,
        audio_file='NoteAudio3'
    )

    db.session.add(note_audio1)
    db.session.add(note_audio2)
    db.session.add(note_audio3)
    db.session.commit()
    

# Uses a raw SQL query to TRUNCATE or DELETE the tables. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_note_audios():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.note_audios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note_audios"))

    db.session.commit()
