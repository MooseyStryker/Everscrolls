from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo note, you can add other notes here if you want
def seed_notes():
    note1 = Note(
        creator_id=1,
        notebook_id=1,
        title='Note1',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note2 = Note(
        creator_id=2,
        notebook_id=2,
        title='Note2',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note3 = Note(
        creator_id=3,
        notebook_id=3,
        title='Note3',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the notes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
