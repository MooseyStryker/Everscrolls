from app.models import db, NoteBody, NoteAudio, NoteImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo note body, you can add other note bodies here if you want
def seed_note_bodies():
    note_body1 = NoteBody(
        note_id=1,
        body='NoteBody1',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note_body2 = NoteBody(
        note_id=2,
        body='NoteBody2',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note_body3 = NoteBody(
        note_id=3,
        body='NoteBody3',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(note_body1)
    db.session.add(note_body2)
    db.session.add(note_body3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the tables. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_note_bodies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.note_bodys RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note_bodys"))

    db.session.commit()
