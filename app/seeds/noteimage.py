from app.models import db, NoteBody, NoteAudio, NoteImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo note image, you can add other note images here if you want
def seed_note_images():
    note_image1 = NoteImage(
        note_id=1,
        image_file='https://imgur.com/a/5m7d3'
    )
    note_image2 = NoteImage(
        note_id=2,
        image_file='https://imgur.com/a/IffqEVg'
    )
    note_image3 = NoteImage(
        note_id=3,
        image_file='https://imgur.com/a/5m7d3'
    )

    db.session.add(note_image1)
    db.session.add(note_image2)
    db.session.add(note_image3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the tables. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_note_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.note_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note_images"))

    db.session.commit()
