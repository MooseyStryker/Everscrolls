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
    note4 = Note(
    creator_id=1,
    notebook_id=4,
    title='Thoughts',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note5 = Note(
        creator_id=2,
        notebook_id=5,
        title='Ideas',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note6 = Note(
        creator_id=3,
        notebook_id=6,
        title='Musings',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note7 = Note(
        creator_id=4,
        notebook_id=7,
        title='Inspirations',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note8 = Note(
        creator_id=1,
        notebook_id=8,
        title='Creativity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note9 = Note(
        creator_id=2,
        notebook_id=9,
        title='Reflections',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note10 = Note(
        creator_id=3,
        notebook_id=10,
        title='Whispers',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note11 = Note(
        creator_id=4,
        notebook_id=11,
        title='Dreams',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note12 = Note(
        creator_id=1,
        notebook_id=12,
        title='Visions',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note13 = Note(
        creator_id=2,
        notebook_id=13,
        title='Explorations',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note14 = Note(
    creator_id=3,
    notebook_id=14,
    title='Sunset',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note15 = Note(
        creator_id=4,
        notebook_id=1,
        title='Whimsy',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note16 = Note(
        creator_id=1,
        notebook_id=2,
        title='Serendipity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note17 = Note(
        creator_id=2,
        notebook_id=3,
        title='Harmony',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note18 = Note(
        creator_id=3,
        notebook_id=4,
        title='Brevity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note19 = Note(
        creator_id=4,
        notebook_id=5,
        title='Labyrinth',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note20 = Note(
        creator_id=1,
        notebook_id=6,
        title='Ephemeral',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note21 = Note(
        creator_id=2,
        notebook_id=7,
        title='Whisperings',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note22 = Note(
        creator_id=3,
        notebook_id=8,
        title='Enigma',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note23 = Note(
        creator_id=4,
        notebook_id=9,
        title='Harbor',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note24 = Note(
        creator_id=1,
        notebook_id=10,
        title='Luminance',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note25 = Note(
        creator_id=2,
        notebook_id=11,
        title='Echo',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note26 = Note(
        creator_id=3,
        notebook_id=12,
        title='Mosaic',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note27 = Note(
        creator_id=4,
        notebook_id=13,
        title='Simplicity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note28 = Note(
        creator_id=1,
        notebook_id=14,
        title='Harvest',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note29 = Note(
    creator_id=2,
    notebook_id=1,
    title='Whimsy',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note30 = Note(
        creator_id=3,
        notebook_id=2,
        title='Serendipity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note31 = Note(
        creator_id=4,
        notebook_id=3,
        title='Harmony',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note32 = Note(
        creator_id=1,
        notebook_id=4,
        title='Brevity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note33 = Note(
        creator_id=2,
        notebook_id=5,
        title='Labyrinth',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note34 = Note(
        creator_id=3,
        notebook_id=6,
        title='Ephemeral',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note35 = Note(
        creator_id=4,
        notebook_id=7,
        title='Whisperings',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note36 = Note(
        creator_id=1,
        notebook_id=8,
        title='Enigma',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note37 = Note(
        creator_id=2,
        notebook_id=9,
        title='Harbor',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note38 = Note(
        creator_id=3,
        notebook_id=10,
        title='Luminance',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note39 = Note(
        creator_id=4,
        notebook_id=11,
        title='Echo',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note40 = Note(
        creator_id=1,
        notebook_id=12,
        title='Mosaic',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note41 = Note(
        creator_id=2,
        notebook_id=13,
        title='Simplicity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note42 = Note(
        creator_id=3,
        notebook_id=14,
        title='Harvest',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note43 = Note(
        creator_id=4,
        notebook_id=1,
        title='Whimsy',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note44 = Note(
        creator_id=1,
        notebook_id=2,
        title='Serendipity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )



    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.add(note6)
    db.session.add(note7)
    db.session.add(note8)
    db.session.add(note9)
    db.session.add(note10)
    db.session.add(note11)
    db.session.add(note12)
    db.session.add(note13)
    db.session.add(note14)
    db.session.add(note15)
    db.session.add(note16)
    db.session.add(note16)
    db.session.add(note17)
    db.session.add(note18)
    db.session.add(note19)
    db.session.add(note20)
    db.session.add(note21)
    db.session.add(note22)
    db.session.add(note23)
    db.session.add(note24)
    db.session.add(note25)
    db.session.add(note26)
    db.session.add(note27)
    db.session.add(note28)
    db.session.add(note29)
    db.session.add(note30)
    db.session.add(note31)
    db.session.add(note32)
    db.session.add(note33)
    db.session.add(note34)
    db.session.add(note35)
    db.session.add(note36)
    db.session.add(note37)
    db.session.add(note38)
    db.session.add(note39)
    db.session.add(note40)
    db.session.add(note41)
    db.session.add(note42)
    db.session.add(note43)
    db.session.add(note44)
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
